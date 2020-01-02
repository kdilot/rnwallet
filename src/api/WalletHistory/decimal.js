const bigdecimal = require('bigdecimal');

export const div = (a, b) => {
    let decimalA = new bigdecimal.BigDecimal(String(a)).setScale(8, bigdecimal.BigDecimal.ROUND_HALF_UP);
    let decimalB = new bigdecimal.BigDecimal(String(b)).setScale(8, bigdecimal.BigDecimal.ROUND_HALF_UP);

    return decimalA
        .divide(decimalB)
        .setScale(8, bigdecimal.BigDecimal.ROUND_HALF_UP)
        .toString();
};

export const floorDecimalPoint = (num, place) => {
    if (!Number(num) || (!Number(place) && place !== 0)) {
        return num;
    }

    if (place > 9) {
        place = 9;
    } else if (place < -9) {
        place = -9;
    }

    let commaIndex = num.indexOf('.');
    if (commaIndex === -1) {
        return num;
    }

    return num.substring(0, commaIndex + place + 1);
};
