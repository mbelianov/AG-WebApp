/* eslint-disable  func-names */
/* eslint-disable  no-console */

//const Alexa = require('ask-sdk');
const Alexa = require('ask-sdk-core');
const AWS = require('aws-sdk');

// Add ApiGatewayManagementApi to the AWS namespace
require('aws-sdk-api/clients/apigatewaymanagementapi');

const i18n = require('i18next'); 
const sprintf = require('i18next-sprintf-postprocessor');
const languageStrings = {
    'en' : require('./i18n/en')
  };

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const { TABLE_NAME } = process.env;



// 0. Name-Free Invocation ========================================
const CFIRRecordParameterIntentHandler = {
  canHandle(handlerInput){
    //console.log ("in CFIRRecordParameterIntentHandler " + JSON.stringify(handlerInput));
    return  handlerInput.requestEnvelope.request.type === 'CanFulfillIntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'RecordParameterIntent';
    },
  handle(handlerInput){
    console.log ("in CFIRRecordParameterIntentHandler " + JSON.stringify(handlerInput));
    //const intentName = handlerInput.requestEnvelope.request.intent.name;
    const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
    const slotValues = getSlotValues(filledSlots);

    if (slotValues.parameter.isValidated && slotValues.first_value.synonym) {
      console.log ("in CFIR RecordParameterIntentHandler YES");
      return handlerInput.responseBuilder
      .withCanFulfillIntent({
          "canFulfill": "YES",
          "slots":{ "parameter": {"canUnderstand": "YES","canFulfill": "YES"},
                    "first_value": {"canUnderstand": "YES","canFulfill": "YES"},
                    "second_value": {"canUnderstand": "YES","canFulfill": "YES"},
                    "fraction": {"canUnderstand": "YES","canFulfill": "YES"}                
                  }
        })
      .getResponse();
    } 
    else {
      console.log ("in CFIR RecordParameterIntentHandler canFulfill == NO");
      return handlerInput.responseBuilder
      .withCanFulfillIntent({"canFulfill": "NO"})
      .getResponse();
    }
  }
};

const CFIRSpecificIntentHandler = {
  canHandle(handlerInput){
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'CanFulfillIntentRequest' && requestAttributes.isSpecific);
  },
  handle(handlerInput){
    console.log("in CFIRSpecificIntentHandler YES");
    return handlerInput.responseBuilder
      .withCanFulfillIntent({"canFulfill": "YES"})
      .getResponse();
  }
};

const CFIRErrorHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `CanFulfillIntentRequest`;
  },
  handle(handlerInput, error) {
    console.log(`CFIR Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .withCanFulfillIntent({"canFulfill": "NO"})
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
    console.log("Hello form LaunchRequestHandler");
    const responseBuilder = handlerInput.responseBuilder;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speechOutput = requestAttributes.t('GREETING');
    const reprompt = requestAttributes.t("WELCOME_REPROMTP");
    return responseBuilder
      .speak(speechOutput)
      .reprompt(reprompt)
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
    //console.log("Hello from InProgressRecordParameterHandler...");
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

    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const responseBuilder = handlerInput.responseBuilder;
    const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
    const slotValues = getSlotValues(filledSlots);

    var speechOutput;
    var repromptMsg = requestAttributes.t('INTENT_REPROMPT');

    var msg = {};   //there two possible type - "generic" and "specific"
                    //"generic": the information in the JSON structure shall be interped as a generic one. No semantical anaysis is possible
                    //"specific": the infomration is implicitly specific. the semantics are carried out by the names of the parameters

    // Now let's recap
    if (slotValues.parameter.isValidated){
      if (isNaN(slotValues.first_value.synonym)){// sometime Alexa sends us non numbers...
        console.log("first_value is not a number: ", slotValues.first_value.synonym);
        return responseBuilder
          .speak(requestAttributes.t("FIRST_VALUE_SLOT_ELICIT_PROMPT"))
          .reprompt(requestAttributes.t("FIRST_VALUE_SLOT_ELICIT_REPROMPT"))
          .addElicitSlotDirective('first_value').getResponse();   
      }
      if (slotValues.second_value && slotValues.second_value.synonym) {
        if (isNaN(slotValues.second_value.synonym)){// sometime Alexa sends us non numbers...
          console.log("second_value is not a number: ", slotValues.second_value.synonym);
          return responseBuilder
            .speak(requestAttributes.t("FIRST_VALUE_SLOT_ELICIT_PROMPT"))
            .reprompt(requestAttributes.t("FIRST_VALUE_SLOT_ELICIT_REPROMPT"))
            .addElicitSlotDirective('first_value').getResponse();   
        }
       if (slotValues.second_value.synonym > 6){// second value can not be higher than 6
          console.log("second_value is too big: ", slotValues.second_value.synonym);
          return responseBuilder
            .speak(requestAttributes.t("SECOND_VALUE_TOO_BIG_PROMPT"))
            .reprompt(requestAttributes.t("SECOND_VALUE_TOO_BIG_REPROMPT"))
            .addElicitSlotDirective('first_value').getResponse();   
        }           
        speechOutput = requestAttributes.t('FEEDBACK_FOR_AGE', slotValues.parameter.synonym, slotValues.first_value.synonym, slotValues.second_value.synonym );
      }
      else if (slotValues.fraction && slotValues.fraction.synonym) {
        if (isNaN(slotValues.fraction.synonym)){// sometime Alexa sends us non numbers...
          console.log("fraction is not a number: ", slotValues.fraction.synonym);
          return responseBuilder
            .speak(requestAttributes.t("FIRST_VALUE_SLOT_ELICIT_PROMPT"))
            .reprompt(requestAttributes.t("FIRST_VALUE_SLOT_ELICIT_REPROMPT"))
            .addElicitSlotDirective('first_value').getResponse();   
        }        
        speechOutput = requestAttributes.t('FEEDBACK_FOR_LENGTH_WITH_DECIMAL', slotValues.parameter.synonym, slotValues.first_value.synonym, slotValues.fraction.synonym );
      }
      else {
        speechOutput = requestAttributes.t('FEEDBACK_FOR_LENGTH_NO_DECIMAL', slotValues.parameter.synonym, slotValues.first_value.synonym );
      }
      
      msg.type = "generic";
      Object.keys(slotValues).forEach((item) => {
        msg[item] = slotValues[item].id?slotValues[item].id:slotValues[item].synonym;
      });
    }
    else{// we are not sure
      speechOutput = requestAttributes.t('INTENT_NOT_CLEAR');
      repromptMsg = requestAttributes.t('INTENT_NOT_CLEAR_REPROMTP');
    }
    
    let activeUI = await notifyUI(JSON.stringify(msg));
    if (activeUI.count == 0) 
        speechOutput = requestAttributes.t('FEEDBACK_NO_ACTIVE_EXAM_FORM');
    if (activeUI.count > 1) 
        speechOutput = requestAttributes.t('FEEDBACK_MORE_THAN_1_ACTIVE_EXAM_FORM');    
    
    console.log(msg);
    return responseBuilder
      .speak(speechOutput)
      .withSimpleCard("Output", JSON.stringify(msg))
      .reprompt(repromptMsg)
      .getResponse();
  }
};


const SpecificIntentHandler = {
  canHandle(handlerInput){
    const request = handlerInput.requestEnvelope.request;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return (request.type === 'IntentRequest' && requestAttributes.isSpecific);
  },
  async handle(handlerInput){
    //if intent is not complete, delegate back to Alexa
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    const request = handlerInput.requestEnvelope.request;
    //if ( request.dialogState !== 'COMPLETED')
    //  return handlerInput.responseBuilder
    //    .addDelegateDirective(currentIntent).getResponse();    
    
    const responseBuilder = handlerInput.responseBuilder;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
          sessionAttributes.relatedIntent = currentIntent.name;
    const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
    const slotValues = getSlotValues(filledSlots);
    console.log(slotValues);
    
        
    var speechOutput = requestAttributes.t('GENERIC_NOT_SUPPORTED_RESPONSE');
    var repromptMsg = requestAttributes.t('INTENT_REPROMPT');

    if (!slotValues.bm_param.isValidated){
      return responseBuilder
        .speak(requestAttributes.t("ASK_FOR_BIOMETRIC_PARAMETER_PROMPT"))
        .reprompt(requestAttributes.t("ASK_FOR_BIOMETRIC_PARAMETER_REPROMPT"))
        .addElicitSlotDirective("bm_param").getResponse();
    }

    if (!slotValues.length || !slotValues.length.synonym || slotValues.length.synonym == 'undefined') //length is mising. Ask for it
      return responseBuilder
        .speak(requestAttributes.t("LENGTH_SLOT_MISSING_PROMPT"))
        .reprompt(requestAttributes.t("LENGTH_SLOT_MISSING_REPROMPT"))
        .addElicitSlotDirective('length').getResponse();    
                
    if (isNaN(slotValues.length.synonym) || (slotValues.fraction && isNaN(slotValues.fraction.synonym))) //sometimes Alexa sends us non-numeric length
      return responseBuilder
        .speak(requestAttributes.t("LENGTH_SLOT_ELICIT_PROMPT"))
        .reprompt(requestAttributes.t("LENGTH_SLOT_ELICIT_REPROMPT"))
        .addElicitSlotDirective('length').getResponse();    
    
    if (isNaN(slotValues.ga_weeks.synonym) && slotValues.willAddGA.isValidated && slotValues.willAddGA.id == 'TRUE'){ 
      //we ask for gestatiotnal age only if ga_weeks is not aleady populated with a number
      return responseBuilder
        .speak(requestAttributes.t('GESTATIONAL_AGE_MISSING_PROMPT'))
        .reprompt(requestAttributes.t('GESTATIONAL_AGE_MISSING_REPROMPT'))
        .addElicitSlotDirective('ga_weeks', currentIntent)
        .getResponse();
    }    
    
    if (isNaN(slotValues.ga_weeks.synonym) && !slotValues.willAddGA.isValidated){
      //ask the use if he want to add gestational age    
      return responseBuilder
        .speak(requestAttributes.t('PROMPT_FOR_GESTATIONAL_AGE'))
        .reprompt(requestAttributes.t('REPROMPT_FOR_GESTATIONAL_AGE'))
        .addElicitSlotDirective('willAddGA', currentIntent)
        .getResponse();
    }    
    

    if (!isNaN(slotValues.ga_weeks.synonym) && slotValues.ga_days.synonym && isNaN(slotValues.ga_days.synonym)){
      //if ga_weeks is already populated with a number, then we assume user wants to add gestational age and we do not care for willAddGA indicator
      return responseBuilder
        .speak(requestAttributes.t('GESTATIONAL_AGE_AMBIGUOUS_PROMPT'))
        .reprompt(requestAttributes.t('GESTATIONAL_AGE_AMBIGUOUS_REPROMPT'))
        .addElicitSlotDirective('ga_weeks', currentIntent)
        .getResponse();
    }
    
    
    var msg = {};
    function buildUpMsg(parameter){
        msg.type = "specific";
        msg.items = [];
        msg.items[0] = {};
        msg.items[0].key = parameter + "_mm";
        msg.items[0].value = slotValues.length.synonym + (isNaN(slotValues.length_fraction.synonym)?'':`.${slotValues.length_fraction.synonym}`); 
        
        if (!isNaN(slotValues.ga_weeks.synonym)){
          msg.items[1] = {};
          msg.items[1].key = parameter + "_gs";
          msg.items[1].value = slotValues.ga_weeks.synonym + (isNaN(slotValues.ga_days.synonym)?' + 0':` + ${slotValues.ga_days.synonym}`);
        }
    }
    
    switch (request.intent.name){
      case "BiometricParameterIntent":
        switch (slotValues.bm_param.id) {
          case 'bpd':
            buildUpMsg("bpd");
            speechOutput = requestAttributes.t('BIPARIETAL_DIAMETER_INTENT_RESPONSE', msg.items[0].value);
            break;          
          case 'ofd':
            buildUpMsg("ofd");
            speechOutput = requestAttributes.t('OCCIPTOFRONTAL_DIAMETER_INTENT_RESPONSE', msg.items[0].value);
            break;
          case 'ac':
            buildUpMsg("ac");
            speechOutput = requestAttributes.t('ABDOMINAL_CIRCUMFERENCE_INTENT_RESPONSE', msg.items[0].value);
            break;
          case 'nb':
            buildUpMsg("nb");
            speechOutput = requestAttributes.t('NASAL_BOND_INTENT_RESPONSE', msg.items[0].value);
            break;
          case 'nf':
            buildUpMsg("nf");
            speechOutput = requestAttributes.t('ABDOMINAL_CIRCUMFERENCE_INTENT_RESPONSE', msg.items[0].value);
            break;     
          case 'tad':
            buildUpMsg("tad");
            speechOutput = requestAttributes.t('TRANSVERSAL_ABDOMINAL_INTENT_RESPONSE', msg.items[0].value);
            break;   
          case 'apad':
            buildUpMsg("apad");
            speechOutput = requestAttributes.t('ANTEROPOSTERIOR_ABDOMINAL_INTENT_RESPONSE', msg.items[0].value);
            break;    
          case 'efw':
            buildUpMsg("efw");
            speechOutput = requestAttributes.t('ESTIMATED_FETAL_WEIGHT_INTENT_RESPONSE', msg.items[0].value);
            break;   
          case 'fl':
            buildUpMsg("fl");
            speechOutput = requestAttributes.t('FEMUR_LENGTH_INTENT_RESPONSE', msg.items[0].value);
            break;    
          case 'cm':
            buildUpMsg("cm");
            speechOutput = requestAttributes.t('CISTERNA_MAGNA_INTENT_RESPONSE', msg.items[0].value);
            break;  
          case 'tcd':
            buildUpMsg("tcd");
            speechOutput = requestAttributes.t('TRANS_CEREBRAL_INTENT_RESPONSE', msg.items[0].value);
            break;
          case 'vp':
            buildUpMsg("vp");
            speechOutput = requestAttributes.t('POSTERIOR_CEREBRAL_VENTRICULAR_INTENT_RESPONSE', msg.items[0].value);
            break; 
          case 'hc':
            buildUpMsg("hc");
            speechOutput = requestAttributes.t('HEAD_CIRCUMFERENCE_INTENT_RESPONSE', msg.items[0].value);
            break;             
          default:
            // code
        }
        break;
      case "BiparietalDiameterIntent":
        buildUpMsg("bpd");
        speechOutput = requestAttributes.t('BIPARIETAL_DIAMETER_INTENT_RESPONSE', msg.items[0].value);
        break;
      case "AbdominalCircumferenceIntent":
        buildUpMsg("ac");
        speechOutput = requestAttributes.t('ABDOMINAL_CIRCUMFERENCE_INTENT_RESPONSE', msg.items[0].value);
        break;
      case "OccipitofrontalDiameterIntent":
        buildUpMsg("ofd");
        speechOutput = requestAttributes.t('OCCIPTOFRONTAL_DIAMETER_INTENT_RESPONSE', msg.items[0].value);
        break;        
      default:
      // code
    }
    
    if (!isNaN(slotValues.ga_weeks.synonym)){
      if (!isNaN(slotValues.ga_days.synonym))
        speechOutput += requestAttributes.t('GESTATIONAL_AGE_FEEDBACK', slotValues.ga_weeks.synonym, slotValues.ga_days.synonym);
      else
        speechOutput += requestAttributes.t("GESTATIONAL_AGE_FEEDBACK", slotValues.ga_weeks.synonym, '0');
    }
    
    speechOutput += requestAttributes.t("ANYTHING_ELSE_PROMPT");
      
    let activeUI = await notifyUI(JSON.stringify(msg));
    if (activeUI.count == 0) 
        speechOutput = requestAttributes.t('FEEDBACK_NO_ACTIVE_EXAM_FORM');
    if (activeUI.count > 1) 
        speechOutput = requestAttributes.t('FEEDBACK_MORE_THAN_1_ACTIVE_EXAM_FORM');

    console.log(msg);
    return responseBuilder
      .speak(speechOutput)
      .withSimpleCard("Output", JSON.stringify(msg))
      .reprompt(repromptMsg)
      .getResponse();
  }
};


const EstimatedFetalWeitghtIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'EstimatedFetalWeightIntent';
  },
  async handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
    const slotValues = getSlotValues(filledSlots);
    console.log(slotValues);
        
    var speechOutput = requestAttributes.t('ESTIMATED_FETAL_WEIGHT_INTENT_RESPONSE', slotValues.weight.synonym);
    var repromptMsg = requestAttributes.t('INTENT_REPROMPT');
    
    var msg = {};
        msg.type = "specific";
        msg.items = [];
        msg.items[0] = {};
        msg.items[0].key = "efw";
        msg.items[0].value = slotValues.weight.synonym; 
        
    speechOutput += requestAttributes.t("ANYTHING_ELSE_PROMPT");
    
    let activeUI = await notifyUI(JSON.stringify(msg));
    if (activeUI.count == 0) 
        speechOutput = requestAttributes.t('FEEDBACK_NO_ACTIVE_EXAM_FORM');
    if (activeUI.count > 1) 
        speechOutput = requestAttributes.t('FEEDBACK_MORE_THAN_1_ACTIVE_EXAM_FORM');
        
    console.log(msg);
    return responseBuilder
      .speak(speechOutput)
      .withSimpleCard("Output", JSON.stringify(msg))
      .reprompt(repromptMsg)
      .getResponse();
  },
};



const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speechOutput = requestAttributes.t('HELP');    
    const helpReprompt = requestAttributes.t('HELP_REPROMPT');
    return responseBuilder
      .speak(speechOutput)
      .reprompt(helpReprompt)
      .getResponse();
  },
};

const YesIntentHanlder = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.YesIntent'));    
  },
  handle(handlerInput){
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speechOutput = requestAttributes.t('YES_REPLY');        
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .getResponse();
  }
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    console.log("Hello from ExitHandler");
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speechOutput = requestAttributes.t('STOP_MESSAGE');       
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const IntentReflector = {
  canHandle(handlerInput){
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speechOutput = requestAttributes.t('GENERIC_NOT_SUPPORTED_RESPONSE');       
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .getResponse();
  }
}

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
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speechOutput = requestAttributes.t('ERROR');           

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .getResponse();
  },
};

// 2. Helper Functions ============================================================================

function getSlotValues(filledSlots) {
  const slotValues = {};

  //console.log(`The filled slots: ${JSON.stringify(filledSlots)}`);
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
  
  //console.log("The slot values: ", JSON.stringify(slotValues));
  return slotValues;
}

async function notifyUI (msg) {
  //console.log(msg);
  let connectionData;
  
  try {
    connectionData = await ddb.scan({ TableName: TABLE_NAME, ProjectionExpression: 'connectionId, domainName, stage' }).promise();
  } 
  catch (e) {
    console.log(e.stack);
    return { statusCode: 500, body: e.stack };
  }

  if (connectionData.Count != 1)
    return {statusCode: 301, count: connectionData.Count, body: `${connectionData.Count} active clients!`};  
  
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
    } 
    catch (e) {
      if (e.statusCode === 410) {
        console.log(`Found stale connection, deleting ${connectionId}`);
        await ddb.delete({ TableName: TABLE_NAME, Key: { connectionId } }).promise();
      } 
      else {
        console.log(e.stack);
        return { statusCode: 500, body: e.stack };
      }
    }
  });
  
  try {
    await Promise.all(postCalls);
  } 
  catch (e) {
    console.log(e.stack);
    return { statusCode: 500, body: e.stack };
  }
  
  //console.log(`From NotifyUI: notified ${connectionData.Count} clients!`);
  return { statusCode: 200, count: connectionData.Count, body: "OK" };
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

function getFuncName() {
   return getFuncName.caller.name;
}

const MarkSpecificIntentInterceptor ={
  process (handlerInput){
    const request = handlerInput.requestEnvelope.request;
    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.isSpecific = (request.intent  && 
                            (request.intent.name === 'BiometricParameterIntent' ||
                             request.intent.name === 'BiparietalDiameterIntent' ||
                             request.intent.name === 'OccipitofrontalDiameterIntent' ||
                             request.intent.name === 'AbdominalCircumferenceIntent' ||
                             false));
  }
};

const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            fallbackLng: 'en', // fallback to EN if locale doesn't exist
            resources: languageStrings
        });

        localizationClient.localize = function () {
            const args = arguments;
            let values = [];

            for (var i = 1; i < args.length; i++) {
                values.push(args[i]);
            }
            const value = i18n.t(args[0], {
                returnObjects: true,
                postProcess: 'sprintf',
                sprintf: values
            });

            if (Array.isArray(value)) {
                return value[Math.floor(Math.random() * value.length)];
            } else {
                return value;
            }
        };

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) { // pass on arguments to the localizationClient
            return localizationClient.localize(...args);
        };
    },
};

// 3. Register all handlers

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    CFIRRecordParameterIntentHandler,
    CFIRSpecificIntentHandler,
    LaunchRequestHandler,
    InProgressRecordParameterHandler,
    CompletedRecordParameterHandler,
    SpecificIntentHandler,
    EstimatedFetalWeitghtIntent,
    YesIntentHanlder,
    HelpHandler,
    ExitHandler,
    IntentReflector,
    SessionEndedRequestHandler
  )
  .addRequestInterceptors(
    LocalizationInterceptor,
    MarkSpecificIntentInterceptor
  )
  .addErrorHandlers(
    CFIRErrorHandler,
    ErrorHandler
  )
  //.withApiClient(new Alexa.DefaultApiClient())
  .lambda();
