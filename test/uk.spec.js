const assert = require('assert');
const numeralize = require('../index');

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
