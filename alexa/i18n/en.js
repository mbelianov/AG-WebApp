// en.js
module.exports = {
    translation : {
        'SKILL_NAME' : 'Super Welcome', // <- can either be a string...
        'GREETING' :    [               // <- or an array of strings.
                            "hi doctor! what's up",
                            "yes doc! tell me"
                        ],
        'WELCOME_REPROMTP' :    "Sorry doc, I did not get your intent. can you repeat?",
        'HELP':                 "I am your digital assistant. I can help you with creating your patient's exam records. for example you can say things like: biparietal diameter is 15 millimeters. you can try right now",
        'HELP_REPROMPT':        [
                                    "Try saying: write down BPD of 5 millimeters.",
                                    "Try saying: BPD is 5 millimeters.",
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
        'ASK_FOR_BIOMETRIC_PARAMETER_PROMPT':   "which biometric parameter was that?",
        'ASK_FOR_BIOMETRIC_PARAMETER_REPROMPT': "which paramater doc?",
        'LENGTH_SLOT_MISSING_PROMPT':           "OK, what value shall I note?",
        'LENGTH_SLOT_MISSING_REPROMPT':         "what value doc?",        
        'LENGTH_SLOT_ELICIT_PROMPT':            "Doc, please repeat the length.",
        'LENGTH_SLOT_ELICIT_REPROMPT':          "please, repeat the length.",
        'PROMPT_FOR_GESTATIONAL_AGE':           "would you like to add gestational age?",
        'REPROMPT_FOR_GESTATIONAL_AGE':         "would you like to add gestational age?",
        'GESTATIONAL_AGE_MISSING_PROMPT':       "ok, what age should I add?",
        'GESTATIONAL_AGE_MISSING_REPROMPT':     "what age doc?",
        'GESTATIONAL_AGE_AMBIGUOUS_PROMPT':     "i didn't get that. can you repeat the age?",
        'GESTATIONAL_AGE_AMBIGUOUS_REPROMPT':   "please repeat the age doc?",
        'GESTATIONAL_AGE_FEEDBACK':             " gestational age of %s weeks plus %s days noted.",
        'BIPARIETAL_DIAMETER_INTENT_RESPONSE':  "OK. BPD length of %s millimeters noted.",
        'OCCIPTOFRONTAL_DIAMETER_INTENT_RESPONSE':"OK. OFD length of %s millimeters noted.",
        'ABDOMINAL_CIRCUMFERENCE_INTENT_RESPONSE':"OK. AC length of %s millimeters noted.", 
        'NASAL_BOND_INTENT_RESPONSE':           "OK. Nasal bond length of %s millimeters noted.",
        'NOCHAL_FOLD_INTENT_RESPONSE':          "OK. nochal fold length of %s millimeters noted.",
        'TRANSVERSAL_ABDOMINAL_INTENT_RESPONSE':"OK. TAD length of %s millimeters noted.",
        'ANTEROPOSTERIOR_ABDOMINAL_INTENT_RESPONSE':"OK. APAD length of %s millimeters noted.",
        'ESTIMATED_FETAL_WEIGHT_INTENT_RESPONSE':   "OK. estimated weight of %s grams noted.",
        'FEMUR_LENGTH_INTENT_RESPONSE':         "OK. femur length of %s millimeters noted.",
        'CISTERNA_MAGNA_INTENT_RESPONSE':       "OK. CM of %s millimeters noted.",
        'TRANS_CEREBRAL_INTENT_RESPONSE':       "OK. TCD of %s millimeters noted.",
        'POSTERIOR_CEREBRAL_VENTRICULAR_INTENT_RESPONSE':       "OK. VP of %s millimeters noted.",
        'HEAD_CIRCUMFERENCE_INTENT_RESPONSE':   "OK. head circumference of %s millimeters noted.",
        'ANYTHING_ELSE_PROMPT':                 " anything else?",
        'INTENT_REPROMPT':                      " anything else?",
        'ERROR':                                "Sorry, an error occurred."
        // ...more...
    }
}