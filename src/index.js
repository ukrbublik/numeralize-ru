'use strict';

import I18N from './i18n/index.js';
import {genders, kases} from './constants.js';

/**
 * Numeralize number
 * @param {number} number Integer
 * @param {string} lang 'ru'/'uk'
 * @param {number} [gender=numeralize.GENDER_MASCULINE]
 * @param {number} [kase=numeralize.CASE_NOMINATIVE]
 * @param {boolean} [animate=false]
 * @returns {string}
 */
function numeralize(number, lang = 'ru', gender = genders.GENDER_MASCULINE, kase = kases.CASE_NOMINATIVE, animate = false) {
    // Normalize params
    number = Math.abs(parseInt(number, 10));
    if (isNaN(number))
        throw new Error("number is not integer");
    gender = gender || numeralize.GENDER_MASCULINE;
    if (!(gender >= 0 && gender < 3))
        throw new Error("gender should be 0..2");
    kase = kase || numeralize.CASE_NOMINATIVE;
    if (!(kase >= 0 && kase < 6))
        throw new Error("kase should be 0..5");
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
                    var plural = pluralize(current, words[kase + 1]);
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
 * @param {array} forms 3 forms of noun, e.g. ['рубль', 'рубля', 'рублей']
 * @returns {string}
 */
function pluralize(count, forms) {
    count = parseInt(count);
    if (isNaN(count))
        throw new Error("count is not integer");
    if (!(forms instanceof Array) || forms.length != 3)
        throw new Error("forms should be array of 3 words");

    return forms[getFormForNumber(count)];
}

/**
 * Get 1 of 3 forms for noun depending on count
 * @param {number} count Number of items
 * @returns {number} 0/1/2
 */
function getFormForNumber(count) {
    count = parseInt(count);
    if (isNaN(count))
        throw new Error("count is not integer");

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
 * Incline noun (unit) according to count
 * @param {number} count Number of items
 * @param {string/array} forms known unit (see UNITS at i18n) -or- forms of noun: [[6 words for every case in singular], [6 words for every case in plural]]
 * @param {string} lang 'ru'/'uk'
 * @param {number} kase
 * @returns {string}
 */
function inclineUnit(count, forms, lang = 'ru', kase = kases.CASE_NOMINATIVE) {
    // Normalize params
    count = parseInt(count);
    if (isNaN(count))
        throw new Error("count is not integer");
    if (!I18N[lang])
        lang = 'ru';
    if (!(kase >= 0 && kase < 6))
        throw new Error("kase should be 0..5");
    var CONFIG = I18N[lang];

    if (!(forms instanceof Array)) {
        var word = forms;
        forms = CONFIG['UNITS'][word];
        if (!forms)
            throw new Error("Unknown unit " + word);
    }
    if (forms.length != 2)
        throw new Error("Unit forms should have 2 arrays: for singular and plural");
    if (forms[0].length != 6 || forms[1].length != 6)
        throw new Error("Unit forms should have 2 arrays each with 6 words for each case");

    let form = getFormForNumber(count);
    if (form == 0) {
        return forms[0][kase];
    } else if (form == 1 || form == 2) {
        if (lang == 'ru') {
            if (kase == kases.CASE_NOMINATIVE || kase == kases.CASE_ACCUSATIVE)
                return forms[form == 1 ? 0 : 1][kases.CASE_GENITIVE];
            else
                return forms[1][kase];
        } else if (lang == 'uk') {
            if (kase == kases.CASE_NOMINATIVE || kase == kases.CASE_ACCUSATIVE)
                return forms[1][form == 1 ? kases.CASE_NOMINATIVE : kases.CASE_GENITIVE];
            else
                return forms[1][kase];
        }
    }
    return null;
}

numeralize.pluralize = pluralize;
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

