// en.js
module.exports = {
    translation : {
        'SKILL_NAME' : 'Super Welcome', // <- can either be a string...
        'GREETING' :    [               // <- or an array of strings.
                            "hi doctor! what's up",
                            "yes doc! tell me"
                        ],
        'WELCOME_REPROMTP' :    "Sorry doc, I did not get your intent. can you repeat?",
        'HELP':                 "I am your digital assistant. I can help you with creating your patient's exam records. for example you can say things like: write down BPD length of 5 millimeters. or you can say: biparietal diameter is 15 millimeters. you can try right now",
        'HELP_REPROMPT':        [
                                    "Try saying: write down BPD length of 5 millimeters.",
                                    "Try saying: biparietal diameter is 15 millimeters.",
                                    "Try saying: occiptofrontal diameter is 15 millimeters.",
                                    "Try saying: abdominal circumference is 15 millimeters."
                                ],
        'STOP_MESSAGE':         [   
                                    "ok, goodbye!",
                                    "ok, see you next time then!",
                                    "you are welcome!"
                                ],
        'YES_REPLY':            "tell me again when ready",
        'GENERIC_NOT_SUPPORTED_RESPONSE':       "This function is not supported yet.",
        'REPROMPT_FOR_ANOTHER_PARAMETER':       "shall i record another parameter?",
        'FEEDBACK_FOR_LENGTH_NO_DECIMAL':       "I got that! It is %s of %s millimeters. anything else?",
        'FEEDBACK_FOR_LENGTH_WITH_DECIMAL':     "I got that! It is %s of %s.%s millimeters. anything else?",
        'FEEDBACK_FOR_AGE':                     "I got that! It is %s of %s weeks plus %s days anything else?",
        'FIRST_VALUE_SLOT_ELICIT_PROMPT':       "what value did you say?",
        'FIRST_VALUE_SLOT_ELICIT_REPROMPT':     "please, repeat the value you said.",
        'SECOND_VALUE_TOO_BIG_PROMPT':          "Hmm, something bothers me. waht value did you say?",
        'SECOND_VALUE_TOO_BIG_REPROMPT':        "please, repeat the value you said",
        'FEEDBACK_NO_ACTIVE_EXAM_FORM':         "Hmm, I do not see active exam form. Please, open an exam form and say again.",
        'FEEDBACK_MORE_THAN_1_ACTIVE_EXAM_FORM':"Doctor, there are too many active exam forms. I do not know which one is valid. Please close those that are not valid and say it again.", 
        'INTENT_NOT_CLEAR':                     "I am not sure I got you right. please, say again.",
        'INTENT_NOT_CLEAR_REPROMTP':            "Please, say again.",
        'LENGTH_SLOT_MISSING_PROMPT':           "OK, what value?",
        'LENGTH_SLOT_MISSING_REPROMPT':         "what the value doc?",        
        'LENGTH_SLOT_ELICIT_PROMPT':            "Doc, please repeat the length.",
        'LENGTH_SLOT_ELICIT_REPROMPT':          "please, repeat the length.",
        'PROMPT_FOR_GESTATIONAL_AGE':           "gestational age?",
        'REPROMPT_FOR_GESTATIONAL AGE':         "would you like to add gestational age?",
        'GESTATIONAL_AGE_MISSING_PROMPT':       "ok, what value?",
        'GESTATIONAL_AGE_MISSING_REPROMPT':     "what value doc?",
        'GESTATIONAL_AGE_AMBIGUOUS_PROMPT':     "i didn't get that. can you repeat the age?",
        'GESTATIONAL_AGE_AMBIGUOUS_REPROMPT':   "please repeat the age doc?",
        'GESTATIONAL_AGE_FEEDBACK':             " gestational age of %s weeks plus %s days noted.",
        'BIPARIETAL_DIAMETER_INTENT_RESPONSE':  "OK. BPD length of %s millimeters noted.",
        'OCCIPTOFRONTAL_DIAMETER_INTENT_RESPONSE':"OK. OFD length of %s millimeters noted.",
        'ABDOMINAL_CIRCUMFERENCE_INTENT_RESPONSE':"OK. AC length of %s millimeters noted.", 
        'ANYTHING_ELSE_PROMPT':                 " anything else?",
        'INTENT_REPROMPT':                      " anything else?",
        'ERROR':                                "Sorry, an error occurred."
        // ...more...
    }
}