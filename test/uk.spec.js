const assert = require('assert');
const numeralize = require('../build/index.js').default;

describe('numeralize (uk)', () => {
    'use strict';

    const tests = [
        ['misc',
            [5122981121,
                ['GENDER_MASCULINE',
                    ['CASE_NOMINATIVE',
                        [true, "п'ять мільярдів сто двадцять два мільйони дев'ятсот вісімдесят одна тисяча сто двадцять один"],
                    ],
                ],
                ['GENDER_FEMININE',
                    ['CASE_NOMINATIVE',
                        [true, "п'ять мільярдів сто двадцять два мільйони дев'ятсот вісімдесят одна тисяча сто двадцять одна"],
                    ],
                ],
            ]
        ]
    ];

    tests.map(test => {
        let title = test.shift();
        describe(title, () => {
            test.map(test => {
                let arg0 = test.shift();
                test.map(test => {
                    let arg1 = test.shift();
                    test.map(test => {
                        let arg2 = test.shift();
                        test.map(test => {
                            let arg3 = test.shift();
                            const expected = test.shift();
                            it(`(${arg0}, ${arg1}, ${arg2}, ${arg3}) → ${expected}`, () => {
                                assert.strictEqual(
                                    numeralize(
                                        arg0,
                                        'uk',
                                        numeralize[arg1],
                                        numeralize[arg2],
                                        arg3
                                    ),
                                    expected
                                );
                            });
                        });
                    });
                });
            });
        });
    });

});


describe('numeralize.inclineUnit (uk)', () => {
    'use strict';

    const testsUnits = {
        'гривня': [
            [2, 'CASE_NOMINATIVE', "2 гривні"],
            [5, 'CASE_NOMINATIVE', "5 гривень"],
            [2, 'CASE_GENITIVE', "2 гривень"],
            [5, 'CASE_GENITIVE', "5 гривень"],
        ],
        'долар': [
            [2, 'CASE_NOMINATIVE', "2 долари"],
            [5, 'CASE_NOMINATIVE', "5 доларів"],
        ],
    };
    Object.keys(testsUnits).map(unit => {
        let tests = testsUnits[unit];
        tests.map(test => {
            let count = test[0];
            let kase = test[1];
            let expected = test[2];
            it(`(${count}, ${unit}, ${kase}) → ${expected}`, () => {
                assert.strictEqual(
                    count + " " + numeralize.inclineUnit(count, unit, 'uk', numeralize[kase]),
                    expected
                );
            });
        });
    });
});