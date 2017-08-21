'use strict';

import I18N from './i18n/ubdex.js';

var genders = {
    'GENDER_MASCULINE': 0,
    'GENDER_FEMININE': 1,
    'GENDER_NEUTER': 2,
};
var kases = {
    'CASE_NOMINATIVE': 0,
    'CASE_GENITIVE': 1,
    'CASE_DATIVE': 2,
    'CASE_ACCUSATIVE': 3,
    'CASE_INSTRUMENTAL': 4,
    'CASE_PREPOSITIONAL': 5,
};

/**
 * Numeralize number
 * @param {number} number Integer
 * @param {string} lang 'ru'/'uk'
 * @param {number} [gender=numeralize.GENDER_MASCULINE]
 * @param {number} [kase=numeralize.CASE_NOMINATIVE]
 * @param {boolean} [animate=false]
 * @returns {string}
 */
function numeralize(number, lang = 'ru', gender = genders.GENDER_MASCULINE, kase = kase.CASE_NOMINATIVE, animate = false) {
    // Normalize params
    number = Math.abs(parseInt(number, 10));
    gender = gender || numeralize.GENDER_MASCULINE;
    kase = kase || numeralize.CASE_NOMINATIVE;
    animate = !!animate;
    if (!I18N[lang])
        lang = 'ru';
    var CONFIG = I18N[lang];

    // Collect chunks
    var result = [];

    // Descend known powers of thousand
    for (var l = CONFIG.LARGES.length, i = l; i >= 0; i--) {
        var base = Math.pow(10, i * 3);
        var current = Math.floor(number / base);
        number = number % base;

        if (current) {
            var words = i ? CONFIG.LARGES[i] : null;
            var numeral = small(current, lang, words ? words[0] : gender, kase, words ? false : animate);
            if (numeral) {
                result.push(numeral);
                if (words) {
                    var plural = pluralize.apply(null, [current].concat(words[kase + 1]));
                    result.push(plural);
                }
            }
        }
    }

    // Zero
    if (!result.length) {
        return CONFIG.MINORS[0][kase];
    }

    // Return
    return result.join(" ");
}

/**
 * Numeralize small number (< 1000)
 * @private
 * @param {number} number Non-negative integer < 1000
 * @param {string} lang 'ru'/'uk'
 * @param {number} gender
 * @param {number} kase
 * @param {boolean} animate
 * @returns {string}
 */
function small(number, lang, gender, kase, animate) {
    if (!I18N[lang])
        lang = 'ru';
    var CONFIG = I18N[lang];

    // Zero
    if (0 === number) { return ""; }

    // Collect chunks
    var result = [];

    // Hundreds
    var hundreds = Math.floor(number / 100);
    if (CONFIG.HUNDREDS[hundreds]) {
        hundreds = CONFIG.HUNDREDS[hundreds][kase];
        if ("string" !== typeof hundreds) {
            hundreds = hundreds[animate ? 0 : 1];
        }
        result.push(hundreds);
    }

    // Tens
    var tens = Math.floor(number % 100 / 10);
    if (CONFIG.TENS[tens]) {
        tens = CONFIG.TENS[tens][kase];
        if ("string" !== typeof tens) {
            tens = tens[animate ? 0 : 1];
        }
        result.push(tens);
    }

    // Minors
    var minors = number % 100;
    if (minors >= CONFIG.MINORS.length) {
        minors = number % 10;
    }
    if (minors) {
        minors = CONFIG.MINORS[minors][kase];
        if ("string" !== typeof minors) {
            minors = minors[gender];
            if ("string" !== typeof minors) {
                minors = minors[animate ? 0 : 1];
            }
        }
        result.push(minors);
    }

    // Return
    return result.join(" ");
}

/**
 * Pluralize noun (unit) according to count
 * @param {number} count Number of items
 * @param {array} 3 forms, e.g. ['рубль', 'рубля', 'рублей']
 * @returns {string}
 */
function pluralizeUnit(count, forms) {
    return forms[getFormForNumber(count)];
}

/**
 * Get 1 of 3 forms depending on count
 * @param {number} count Number of items
 * @returns {number} 0/1/2
 */
function getFormForNumber(count) {
    count = Math.floor(Math.abs(count)) % 100;
    if (count > 10 && count < 20) {
        return 2;
    }
    count = count % 10;
    if (1 === count) { return 0; }
    if (count >= 2 && count <= 4) { return 1; }
    return 2;
}

/**
 * Incline noun according to count
 * @param {number} count Number of items
 * @param {array} forms [[6 words for every case in singular], [6 words for every case in plural]]
 * @param {string} lang 'ru'/'uk'
 * @param {number} kase
 * @returns {string}
 */
function inclineUnit(count, forms, lang = 'ru', kase = kase.CASE_NOMINATIVE) {
    count = parseInt(count);
    if (isNaN(count))
        throw new Exception("Count is not integer");

    if (!I18N[lang])
        lang = 'ru';
    var CONFIG = I18N[lang];

    if (!(forms instanceof Array)) {
        var word = forms;
        forms = CONFIG['UNITS'][word];
        if (!forms)
            throw new Exception("Unknown unit " + word);
    }
    if (forms.length != 2)
        throw new Exception("Unit forms should have 2 arrays: for singular and plural");
    if (forms[0].length != 6 || forms[1].length != 6)
        throw new Exception("Unit forms should have 2 arrays each with 6 words for each case");
    if (!(kase >= 0 && kase < 6))
        throw new Exception("Case should be 0..5");

    let form = getFormForNumber(count);
    if (form == 0) {
        return forms[0][kase];
    } else if (form == 1) {
        if (lang == 'ru') {
            //...todo
        } else if (lang == 'uk') {
            //...todo
        }
    } else if (form == 2) {
        //...todo
    }

}

numeralize.pluralizeUnit = pluralizeUnit;
numeralize.inclineUnit = inclineUnit;
numeralize.getFormForNumber = getFormForNumber;

numeralize.genders = genders;
for(let k in genders) {
    numeralize[k] = genders[k];
}

numeralize.kases = kases;
for(let k in kases) {
    numeralize[k] = kases[k];
}

export default numeralize;

