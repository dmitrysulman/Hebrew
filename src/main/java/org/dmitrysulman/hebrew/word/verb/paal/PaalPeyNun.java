package org.dmitrysulman.hebrew.word.verb.paal;

import org.springframework.stereotype.Component;

@Component
public class PaalPeyNun extends Paal {
    @Override
    public BinyanName getBinyanName() {
        return BinyanName.PAAL_PEYNUN;
    }

    @Override
    protected String getFutureBase(String base) {
        char[] futureBase = new char[3];
        String root = getRoot(base);
        futureBase[0] = 'י';
        futureBase[1] = root.charAt(1);
        futureBase[2] = root.charAt(2);

        return String.valueOf(futureBase);
    }

    @Override
    public String getFutureTenseSingularFirstPerson(String base) {
        return "א".concat(getFutureBase(base).substring(1, 3));
    }

    @Override
    public boolean isThisBinyan(String base) {
        return base.length() == 4 &&
                base.charAt(1) == 'ו' &&
                base.charAt(3) != 'ה' &&
                (base.charAt(0) == 'נ' ||
                        base.charAt(0) == 'ל');
    }
}
