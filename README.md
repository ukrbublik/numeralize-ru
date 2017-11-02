# numeralize-rus-ukr

![version](https://img.shields.io/npm/v/numeralize-rus-ukr.svg?style=flat&label=version) ![travis](https://img.shields.io/travis/ukrbublik/numeralize-rus-ukr.svg?style=flat)

Написание числительных на русском и украинском языке с учётом пола и падежа.

# Установка

```
npm install --save numeralize-rus-ukr
```

# API

### `numeralize(number, lang = 'ru', gender = numeralize.GENDER_MASCULINE, kase = numeralize.CASE_NOMINATIVE, animate = false)`

Возвращает числительное, соответствующее числу

+ `number` — число, для которого надо записать числительное;
+ `lang` — язык:
    + `ru` — русский (по умолчанию);
    + `uk` — украинский;
+ `gender` — пол:
    + `numeralize.GENDER_MASCULINE` — мужской (по умолчанию);
    + `numeralize.GENDER_FEMININE` — женский;
    + `numeralize.GENDER_NEUTER` — средний;
+ `kase` — падеж (`case` является ключевым словом, поэтому не может быть использован в качестве имени переменной):
    + `numeralize.CASE_NOMINATIVE` — именительный (по умолчанию);
    + `numeralize.CASE_GENITIVE` — родительный;
    + `numeralize.CASE_DATIVE` — дательный;
    + `numeralize.CASE_ACCUSATIVE` — винительный;
    + `numeralize.CASE_INSTRUMENTAL` — творительный;
    + `numeralize.CASE_PREPOSITIONAL` — предложный;
+ `animate` — являются ли перечисляемые предметы одушевлёнными (влияет на форму винительного падежа некоторых числительных)

```javascript
const numeralize = require('numeralize');

numeralize(5122981121);
// мужской род, 'пять миллиардов сто двадцать два миллиона девятьсот восемьдесят одна тысяча сто двадцать один'

numeralize(5122981121, 'ru', numeralize.GENDER_FEMININE);
// женский род, 'пять миллиардов сто двадцать два миллиона девятьсот восемьдесят одна тысяча сто двадцать одна'

numeralize(5122981121, 'ru', numeralize.GENDER_NEUTER);
// средний род, 'пять миллиардов сто двадцать два миллиона девятьсот восемьдесят одна тысяча сто двадцать одно'

numeralize(5122981121, 'ru', numeralize.GENDER_MASCULINE, numeralize.CASE_NOMINATIVE);
// мужской род, именительный падеж, 'пять миллиардов сто двадцать два миллиона девятьсот восемьдесят одна тысяча сто двадцать один'

numeralize(5122981121, 'ru', numeralize.GENDER_MASCULINE, numeralize.CASE_GENITIVE);
// мужской род, родительный падеж, 'пяти миллиардов ста двадцати двух миллионов девятисот восьмидесяти одной тысячи ста двадцати одного'

numeralize(5122981121, 'ru', numeralize.GENDER_MASCULINE, numeralize.CASE_DATIVE);
// мужской род, дательный падеж, 'пяти миллиардам ста двадцати двум миллионам девятистам восьмидесяти одной тысяче ста двадцати одному'

numeralize(5122981121, 'ru', numeralize.GENDER_MASCULINE, numeralize.CASE_ACCUSATIVE);
// мужской род, винительный падеж, 'пять миллиардов сто двадцать два миллиона девятьсот восемьдесят одну тысячу сто двадцать один'

numeralize(5122981121, 'ru', numeralize.GENDER_MASCULINE, numeralize.CASE_ACCUSATIVE, true);
// мужской род, винительный падеж, одушевлённые предметы, 'пять миллиардов сто двадцать два миллиона девятьсот восемьдесят одну тысячу сто двадцать одного'

numeralize(5122981121, 'ru', numeralize.GENDER_MASCULINE, numeralize.CASE_INSTRUMENTAL);
// мужской род, творительный падеж, 'пятью миллиардами ста двадцатью двумя миллионами девятьюстами восемьюдесятью одной тысячей ста двадцатью одним'

numeralize(5122981121, 'ru', numeralize.GENDER_MASCULINE, numeralize.CASE_PREPOSITIONAL);
// мужской род, творительный падеж, 'пяти миллиардах ста двадцати двух миллионах девятистах восьмидесяти одной тысяче ста двадцати одном'
```

###  `numeralize.pluralize(count, forms)`

Выбирает нужную форму существительного в зависимости от количества.

+ `count` — количество
+ `forms` — 3 формы существительного для одного/двух/пяти предмета, например, [_рубль_, _рубля_, _рублей_];

```javascript
const pluralize = require('numeralize').pluralize;

pluralize(0, ['рубль', 'рубля', 'рублей']);
// 'рублей'

pluralize(1, ['рубль', 'рубля', 'рублей']);
// 'рубль'

pluralize(2, ['рубль', 'рубля', 'рублей']);
// 'рубля'

pluralize(5, ['рубль', 'рубля', 'рублей']);
// 'рублей'

pluralize(11, ['рубль', 'рубля', 'рублей']);
// 'рублей'

pluralize(21, ['рубль', 'рубля', 'рублей']);
// 'рубль'

```

###  `numeralize.inclineUnit(count, forms, lang = 'ru', kase = numeralize.CASE_NOMINATIVE)`

Склоняет существительное (ед.изм., например, деньги) в зависимости от количества.

+ `count` — количество
+ `forms` — двуменрный массив 2x6 из 6 форм существительного для ед.ч. и мн.ч. -или- одна из известных единиц измерения, см. ниже `UNITS`;
+ `kase` — падеж

#### `UNITS`
+ ru
    + рубль
    + гривна
    + копейка
    + доллар
    + цент
+ uk
    + рубль
    + гривня
    + копійка
    + долар
    + цент

```javascript
const inclineUnit = require('numeralize').inclineUnit;

inclineUnit(2, 'рубль', 'ru');
// 'рубля'

inclineUnit(2, 'рубль', 'ru', numeralize.CASE_GENITIVE);
// 'рублей'
```


# Roadmap

+ Порядковые числительные (ordinal numerals): _первый_, _вторым_, _третьими_ и т.д.
+ Собирательные числительные (collective numerals): _трое_, _четверых_, _пятерыми_ и т.д.
+ Особые формы единственного и множественного числа: _одни сутки_, _два дня_, _пять суток_ и т.д.

# См.также

+ Подробно о склонении числительных в русском языке с примерами: http://numeralonline.ru/
