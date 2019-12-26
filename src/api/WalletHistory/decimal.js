const bigdecimal = require("bigdecimal");

export const div = (a, b) => {
    let decimalA = new bigdecimal.BigDecimal(String(a)).setScale(
        8,
        bigdecimal.BigDecimal.ROUND_HALF_UP
    );
    let decimalB = new bigdecimal.BigDecimal(String(b)).setScale(
        8,
        bigdecimal.BigDecimal.ROUND_HALF_UP
    );

    return decimalA
        .divide(decimalB)
        .setScale(8, bigdecimal.BigDecimal.ROUND_HALF_UP)
        .toString();
};
