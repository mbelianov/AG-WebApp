/* eslint-disable  func-names */
/* eslint-disable  no-console */

//const Alexa = require('ask-sdk');
const Alexa = require('ask-sdk-core');
const AWS = require('aws-sdk');

// Add ApiGatewayManagementApi to the AWS namespace
require('aws-sdk/clients/apigatewaymanagementapi');

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const { TABLE_NAME } = process.env;

const welcomeOutput = "Hi doctor! How can I help?";
const welcomeReprompt = "Sorry, can you repeat?";
const helpOutput = "I can help you with creating your patient's exam records. Try saying 'write down BPD length of 5'.";
const helpReprompt = 'Try saying "write down BPD length of 5".';


// 0. Name-Free Invocation ========================================
const CFIRRecordParameterIntentHandler ={
  canHandle(handlerInput){
    return handlerInput.requestEnvelope.request.type === 'CanFulfillIntentRequest' &&
     handlerInput.requestEnvelope.request.intent.name === 'RecordParameterIntent';
  },
  handle(handlerInput){
    console.log ("in CFIR RecordParameterIntentHandler " + JSON.stringify(handlerInput));
    //const intentName = handlerInput.requestEnvelope.request.intent.name;
    const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
    const slotValues = getSlotValues(filledSlots);
    //console.log(`The filled slots: ${JSON.stringify(filledSlots)}`);


    if (slotValues.parameter.isValidated && slotValues.first_value.synonym) {
      console.log ("in CFIR RecordParameterIntentHandler YES");
      return handlerInput.responseBuilder
      .withCanFulfillIntent(
        {
          "canFulfill": "YES",
          "slots":{
              "parameter": {
                  "canUnderstand": "YES",
                  "canFulfill": "YES"
                },
              "first_value": {
                  "canUnderstand": "YES",
                  "canFulfill": "YES"
                },
              "second_value": {
                  "canUnderstand": "YES",
                  "canFulfill": "YES"
                },
              "fraction": {
                  "canUnderstand": "YES",
                  "canFulfill": "YES"
                }                
            }
        })
        .getResponse();
    } else {
      console.log ("in CFIR RecordParameterIntentHandler canFulfill == NO");
      return handlerInput.responseBuilder
      .withCanFulfillIntent(
        {
          "canFulfill": "NO"
        })
        .getResponse();
    }
  }
};


const CFIRErrorHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `CanFulfillIntentRequest`;
  },
  handle(handlerInput, error) {
    console.log(`CFIR Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .withCanFulfillIntent(
        {
          "canFulfill": "NO"
        })
      .getResponse();
  },
};


// 1. Intent Handlers =============================================

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    return responseBuilder
      .speak(welcomeOutput)
      .reprompt(welcomeReprompt)
      .getResponse();
  },
};

const InProgressRecordParameterHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      request.intent.name === 'RecordParameterIntent' &&
      request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    return handlerInput.responseBuilder
      .addDelegateDirective(currentIntent)
      .getResponse();
  },
};


const CompletedRecordParameterHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'RecordParameterIntent';
  },
  async handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
    const slotValues = getSlotValues(filledSlots);
    
    
    var speechOutput = "I got ";
    var repromptMsg = "Anything else?";
    var msg = '{';
    var warning = "Doctor, I don't see active exam. Did you open it?";
    
    let activeUI = await checkActiveUI(); //let see if there is active exam form and warn if this is not the case.
    if (activeUI.count == 0){
      await callDirectiveService(handlerInput, warning);
      speechOutput = "Anyway, I got ";
      //await sleep (2000);
    };
    
    // Now let's recap
    if (slotValues.parameter.isValidated){
      speechOutput += `${slotValues.parameter.synonym} of`;
  
      if (slotValues.second_value.synonym) {
        speechOutput += ` ${slotValues.first_value.synonym} weeks and ${slotValues.second_value.synonym} days.`;
      }
      else if (slotValues.fraction && slotValues.fraction.synonym) {
        speechOutput += ` ${slotValues.first_value.synonym}.${slotValues.fraction.synonym} millimeters.`;
      }
      else {
        speechOutput += ` ${slotValues.first_value.synonym} millimeters.`;
      }

      Object.keys(slotValues).forEach((item) => {
        const id_or_synonym = slotValues[item].id?slotValues[item].id:slotValues[item].synonym;
        msg += `"${item}":"${id_or_synonym}",`;
      });
      msg = msg.slice(0, -1) + '}'; // properly close the json structure
      notifyUI(msg) //We notify the UI page to properly visualise the spoken parameter
        .then((result) => {console.log(result)});
      
    }
    else{// we are not sure
      speechOutput = "I am not sure! Please repeat!";
      repromptMsg = "Please repeat!";
      msg += "}";
      
    }

    return responseBuilder
      .speak(speechOutput)
      .withSimpleCard("Output", speechOutput + "\n" + msg)
      .reprompt(repromptMsg)
      .getResponse();
  }
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    return responseBuilder
      .speak(helpOutput)
      .reprompt(helpReprompt)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};


const STOP_MESSAGE = 'Goodbye!';

// 2. Helper Functions ============================================================================

function getSlotValues(filledSlots) {
  const slotValues = {};

  console.log(`The filled slots: ${JSON.stringify(filledSlots)}`);
  Object.keys(filledSlots).forEach((item) => {
    const name = filledSlots[item].name;

    if (filledSlots[item] &&
      filledSlots[item].resolutions &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
      switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
        case 'ER_SUCCESS_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
            id: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.id,
            isValidated: true,
          };
          break;
        case 'ER_SUCCESS_NO_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].value,
            isValidated: false,
          };
          break;
        default:
          break;
      }
    } else {
      slotValues[name] = {
        synonym: filledSlots[item].value,
        resolved: filledSlots[item].value,
        isValidated: false,
      };
    }
  }, this);
  
  console.log(`The slot values: ${JSON.stringify(slotValues)}`);

  return slotValues;
}

async function checkActiveUI(){
  let connectionData;
  
  try {
    connectionData = await ddb.scan({ TableName: TABLE_NAME, ProjectionExpression: 'connectionId, domainName, stage' }).promise();
  } catch (e) {
    console.log(e.stack);
    return { statusCode: 500, body: e.stack };
  }  
  
  return { statusCode: 200, count: connectionData.Count, body: `There are ${connectionData.Count} clients!` };  
}

async function notifyUI (msg) {
  //console.log(msg);
  let connectionData;
  
  try {
    connectionData = await ddb.scan({ TableName: TABLE_NAME, ProjectionExpression: 'connectionId, domainName, stage' }).promise();
  } catch (e) {
    console.log(e.stack);
    return { statusCode: 500, body: e.stack };
  }
  
  
//  console.log(connectionData);
  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
  });
  
  const postData = msg;
  
  const postCalls = connectionData.Items.map(async ({ connectionId, domainName, stage }) => {
    //console.log({ connectionId, domainName, stage });
    apigwManagementApi.endpoint =  domainName + '/' + stage;
    try {
      await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: postData }).promise();
    } catch (e) {
      if (e.statusCode === 410) {
        console.log(`Found stale connection, deleting ${connectionId}`);
        await ddb.delete({ TableName: TABLE_NAME, Key: { connectionId } }).promise();
      } else {
        console.log(e.stack);
        //throw e;
        return { statusCode: 500, body: e.stack };
      }
    }
  });
  
  try {
    await Promise.all(postCalls);
  } catch (e) {
    console.log(e.stack);
    return { statusCode: 500, body: e.stack };
  }
  
  //console.log(`From NotifyUI: notified ${connectionData.Count} clients!`);
  return { statusCode: 200, count: connectionData.Count, body: `Notified ${connectionData.Count} clients!` };
}

async function callDirectiveService(handlerInput, msg) {
  // Call Alexa Directive Service.
  const requestEnvelope = handlerInput.requestEnvelope;
  const directiveServiceClient = handlerInput.serviceClientFactory.getDirectiveServiceClient();

  const requestId = requestEnvelope.request.requestId;
  const endpoint = requestEnvelope.context.System.apiEndpoint;
  const token = requestEnvelope.context.System.apiAccessToken;

  // build the progressive response directive
  const directive = {
    header: {
      requestId,
    },
    directive:{ 
        type: "VoicePlayer.Speak",
        speech: msg
    },
  };
  // send directive
  return directiveServiceClient.enqueue(directive, endpoint, token);
}

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve(), milliseconds));
 }

// 3. Register all handlers

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    CFIRRecordParameterIntentHandler,
    LaunchRequestHandler,
    InProgressRecordParameterHandler,
    CompletedRecordParameterHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(
    CFIRErrorHandler,
    ErrorHandler
  )
  .withApiClient(new Alexa.DefaultApiClient())
  .lambda();
