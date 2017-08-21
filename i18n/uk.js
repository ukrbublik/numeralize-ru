//http://www.slovnyk.ua
var UK = {};

UK.UNITS = {
    'рубль': [
        ['рубль', 'рубля', 'рублю', 'рубль', 'рублем', 'рублі'], //1
        ['рубля', 'рублів', 'рублям', 'рубля', 'рублями', 'рублях'], //2
        ['рублів', 'рублів', 'рублям', 'рублів', 'рублями', 'рублях'], //5
    ],
    'гривня': [
        ['гривня', 'гривні', 'гривні', 'гривню', 'гривнею', 'гривні'], //1
        ['гривні', 'гривень', 'гривням', 'гривні', 'гривнями', 'гривнях'], //2
        ['гривень', 'гривень', 'гривням', 'гривень', 'гривнями', 'гривнях'], //5
    ],
    'копійка': [
        ['копійка', 'копійки', 'копійці', 'копійку', 'копійкою', 'копійці'], //1
        ['копійки', 'копійок', 'копійкам', 'копійки', 'копійками', 'копійках'], //2
        ['копійок', 'копійок', 'копійкам', 'копійок', 'копійками', 'копійках'], //5
    ],
    'долар': [
        ['долар', 'долара', 'долару', 'долар', 'доларом', 'доларі'], //1
        ['долари', 'доларів', 'доларам', 'долари', 'доларами', 'доларах'], //2
        ['доларів', 'доларів', 'доларам', 'доларів', 'доларами', 'доларах'], //5
    ],
};

UK.MINORS = [
    ['нуль', 'нуля', 'нулю', 'нуль', 'нулем', 'нулі'],
    [
        ['один', 'одна', ['одно', 'одне']],
        ['одного', ['одної', 'однієї'], 'одного'],
        ['одному', 'одній', 'одному'],
        ['один', 'одну', 'одне'],
        ['одним', ['одною', 'однією'], 'одним'],
        [['однім', 'одному'], 'одній', ['однім', 'одному']],
    ],
    [
        ['два', 'дві', 'два'],
        'двох',
        'двом',
        [['двох', 'два'], ['двох', 'дві'], 'два'],
        'двома',
        'двох',
    ],
    [
        'три',
        'трьох',
        'трьом',
        [['трьох', 'три'], ['трьох', 'три'], 'три'],
        'трьома',
        'трьох',
    ],
    [
        'чотири',
        'чотирьох',
        'чотирьом',
        [['чотирьох', 'чотири'], ['чотирьох', 'чотири'], 'чотири'],
        'чотирма',
        'чотирьох',
    ],
    [
        "п'ять", 
        [["п'ятьох", "п'яти"], ["п'ятьох", "п'яти"], "п'яти"], 
        [["п'ятьом", "п'яти"], ["п'ятьом", "п'яти"], "п'яти"], 
        [["п'ятьох", "п'ять"], ["п'ятьох", "п'ять"], "п'ять"], 
        [["п'ятьома", "п'ятьма"], ["п'ятьома", "п'ятьма"], "п'ятьма"], 
        [["п'ятьох", "п'яти"], ["п'ятьох", "п'яти"], "п'яти"], 
    ],
    [
        'шість',
        [['шістьох', 'шести'], ['шістьох', 'шести'], 'шести'],
        [['шістьом', 'шести'], ['шістьом', 'шести'], 'шести'],
        [['шістьох', 'шість'], ['шістьох', 'шість'], 'шість'],
        [['шістьома', 'шістьма'], ['шістьома', 'шістьма'], 'шістьма'],
        [['шістьох', 'шести'], ['шістьох', 'шести'], 'шести'],
    ],
    [
        'сім',
        [['сімох', 'семи'], ['сімох', 'семи'], 'семи'],
        [['сімом', 'семи'], ['сімом', 'семи'], 'семи'],
        [['сімох', 'сім'], ['сімох', 'сім'], 'сім'],
        [['сімома', 'сьома'], ['сімома', 'сьома'], 'сьома'],
        [['сімох', 'семи'], ['сімох', 'семи'], 'семи'],
    ],
    [
        'вісім',
        [['вісьмох', 'восьми'], ['вісьмох', 'восьми'], 'восьми'],
        [['вісьмом', 'восьми'], ['вісьмом', 'восьми'], 'восьми'],
        [['вісьмох', 'вісім'], ['вісьмох', 'вісім'], 'вісім'],
        [['вісьмома', 'вісьма'], ['вісьмома', 'вісьма'], 'вісьма'],
        [['вісьмох', 'восьми'], ['вісьмох', 'восьми'], 'восьми'],
    ],
    [
        "дев'ять",
        [["дев'ятьох", "дев'яти"], ["дев'ятьох", "дев'яти"], "дев'яти"],
        [["дев'ятьом", "дев'яти"], ["дев'ятьом", "дев'яти"], "дев'яти"],
        [["дев'ятьох", "дев'ять"], ["дев'ятьох", "дев'ять"], "дев'ять"],
        [["дев'ятьома", "дев'ятьма"], ["дев'ятьома", "дев'ятьма"], "дев'ятьма"],
        [["дев'ятьох", "дев'яти"], ["дев'ятьох", "дев'яти"], "дев'яти"],
    ],
    [
        'десять',
        [['десятьох', 'десяти'], ['десятьох', 'десяти'], 'десяти'],
        [['десятьом', 'десяти'], ['десятьом', 'десяти'], 'десяти'],
        [['десятьох', 'десять'], ['десятьох', 'десять'], 'десять'],
        [['десятьома', 'десятьма'], ['десятьома', 'десятьма'], 'десятьма'],
        [['десятьох', 'десяти'], ['десятьох', 'десяти'], 'десяти'],
    ],
].concat(
    ['оди', 'два', 'три', 'чотир', "п'ят", 'шіст', 'сім', 'вісім', "дев'ят"].map(function(p) {
        return [
            p+'надцять', 
            [[p+'надцятьох', p+'надцяти'], [p+'надцятьох', p+'надцяти'], p+'надцяти'],
            [[p+'надцятьом', p+'надцяти'], [p+'надцятьом', p+'надцяти'], p+'надцяти'],
            [[p+'надцятьох', p+'надцять'], [p+'надцятьох', p+'надцять'], p+'надцять'],
            [[p+'надцятьома', p+'надцятьма'], [p+'надцятьома', p+'надцятьма'], p+'надцятьма'],
            [[p+'надцятьох', p+'надцяти'], [p+'надцятьох', p+'надцяти'], p+'надцяти'],
        ];
    })
);

UK.TENS = [
    false,
    false,
].concat(
    ['два', 'три'].map(function(p) {
        return [
            p+'дцять',
            [p+'дцятьох', p+'дцяти'],
            [p+'дцятьом', p+'дцяти'],
            [p+'дцятьох', p+'дцять'],
            [p+'дцятьома', p+'дцятьма'],
            [p+'дцятьох', p+'дцяти'],
        ];
    })
).concat([[
    'сорок',
    'сорока',
    'сорока',
    ['сорока', 'сорок'],
    'сорока',
    'сорока',
]]).concat(
    ["п'ят", 'шіст', 'сім', 'вісім', "дев'ят"].map(function(p) {
        return [
            p+'десят',
            [p+'десятьох', p+'десяти'],
            [p+'десятьом', p+'десяти'],
            [p+'десятьох', p+'десят'],
            [p+'десятьома', p+'десятьма'],
            [p+'десятьох', p+'десяти'],
        ];
    })
);

UK.HUNDREDS = [
    false,
    ['сто', 'ста', 'ста', 'сто', 'ста', 'ста'],
    ['двісті', 'двохсот', 'двомстам', ['двохсот', 'двісті'], 'двомастами', 'двохстах'],
    ['триста', 'трьохсот', 'трьомстам', ['трьохсот', 'триста'], 'трьомастами', 'трьохсот'],
    ['чотириста', 'чотирьохсот', 'чотирьомстам', ['чотирьохсот', 'чотириста'], 'чотирмастами', 'чотирьохсот'],
    ["п'ятсот", "п'ятисот", "п'ятистам", "п'ятсот", ["п'ятьомастами", "п'ятьмастами"], "п'ятистах"],
    ['шістсот', 'шестисот', 'шестистам', 'шістсот', ['шістьомастами', 'шістьмастами'], 'шестистах'],
    ['сімсот', 'семисот', 'семистам', 'сімсот', ['сьомастами', 'сімомастами'], 'семистах'],
    ['вісімсот', 'восьмисот', 'восьмистам', 'вісімсот', ['вісьмомастами', 'вісьмастами'], 'восьмистах'],
    ["дев'ятсот", "дев'ятисот", "дев'ятистам", "дев'ятсот", ["дев'ятьомастами", "дев'ятьмастами"], "дев'ятистах"],
];

UK.LARGES = [
    false,
    [
        numeralize.GENDER_FEMININE,
        ['тисяча', 'тисячі', 'тисяч'],
        ['тисячі', 'тисяч', 'тисяч'],
        ['тисячі', 'тисячам', 'тисячам'],
        ['тисячу', 'тисячі', 'тисяч'],
        ['тисячею', 'тисячами', 'тисячами'],
        ['тисячі', 'тисячах', 'тисячах']
    ]
].concat(['мільйон', 'мільярд', 'трильйон'].map(function(base) {
    return [numeralize.GENDER_MASCULINE]
        .concat([
            ['', 'и', 'ів'],
            ['а', 'ів', 'ів'],
            ['у', 'ам', 'ам'],
            ['', 'и', 'и'],
            ['ом', 'ами', 'ами'],
            ['і', 'ах', 'ах']
        ].map(function(kase) {
            return kase.map(function(suffix) {
                return base + suffix;
            });
        }));
}));

export default UK;
