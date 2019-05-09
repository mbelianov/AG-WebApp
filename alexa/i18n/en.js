// en.js
module.exports = {
    translation : {
        'SKILL_NAME' : 'Super Welcome', // <- can either be a string...
        'GREETING' :    [                  // <- or an array of strings.
                            "hi doctor! what's up",
                            "yes doc! tell me"
                        ],
        'WELCOME_REPROMTP' :    "Sorry doc, I did not get your intent. can you repeat?",
        'HELP':                 "Hi doctor. I am your digital assistant. I can help you with creating your patient's exam records. for example you can say things like: write down BPD length of 5 millimeters. or you can say: biparietal diameter is 15 millimeters",
        'HELP_REPROMPT':        [
                                    "Try saying: write down BPD length of 5 millimeters.",
                                    "Try saying: biparietal diameter is 15 millimeters."
                                ],
        'STOP_MESSAGE':         [   
                                    "Goodbye!",
                                    "See you!",
                                    "you are welcome!"
                                ],
        'GENERIC_NOT_SUPPORTED_RESPONSE':       "This function is not supported yet.",
        'REPROMPT_IN_RECORD_PARAMETER_INTENT':  "shall i record another parameter?",
        'FEEDBACK_FOR_LENGTH_NO_DECIMAL':       "I got that! It is %s of %s millimeters. anything else?",
        'FEEDBACK_FOR_LENGTH_WITH_DECIMAL':     "I got that! It is %s of %s.%s millimeters. anything else?",
        'FEEDBACK_FOR_AGE':                     "I got that! It is %s of %s weeks plus %s days anything else?",
        'FEEDBACK_NO_ACTIVE_EXAM_FORM':         "Hmm, I do not see active exam form. Please, open an exam form and say again.",
        'FEEDBACK_MORE_THAN_1_ACTIVE_EXAM_FORM':"Doctor, there are too many active exam forms. I do not know which one is valid. Please close those that are not valid and say it again.", 
        'INTENT_NOT_CLEAR':                     "I am not sure. Can you repeat?",
        'INTENT_NOT_CLEAR_REPROMTP':            "Please, say again.",
        'LENGTH_SLOT_ELICIT_PROMPT':            "Doc, i am sorry, please repeat the length.",
        'LENGTH_SLOT_ELICIT_REPROMPT':          "please, repeat the length.",
        'BIPARIETAL_DIAMETER_INTENT_RESPONSE':  "OK. BPD length of %s millimeters noted. anything else?",
        'INTENT_REPROMPT':                      "anything else?",
        'ERROR':                                "Sorry, an error occurred."
        // ...more...
    }
}