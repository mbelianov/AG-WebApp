// en.js
module.exports = {
    translation : {
        'SKILL_NAME' : 'Super Welcome', // <- can either be a string...
        'GREETING' : [                  // <- or an array of strings.
            'Hello there',
            'Hey',
            'Hi!',
            'Hi, Doctor'
        ],
        'GREETING_WITH_NAME' : [
            'Hey %s',         // --> That %s is a wildcard. It will
            'Hi there, %s',   //     get turned into a name in our code.
            'Hello, %s'       //     e.g. requestAttributes.t('GREETING_WITH_NAME', 'Andrea')
        ],
        // ...more...
    }
}