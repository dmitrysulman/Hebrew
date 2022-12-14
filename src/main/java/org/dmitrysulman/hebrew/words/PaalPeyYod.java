package org.dmitrysulman.hebrew.words;

import org.springframework.stereotype.Component;

@Component
public class PaalPeyYod extends Paal {
    @Override
    public String getInfinitive(String base) {
        char[] infinitive = new char[4];
        String root = getRoot(base);
        infinitive[0] = 'ל';
        infinitive[1] = root.charAt(1);
        infinitive[2] = root.charAt(2);
        infinitive[3] = 'ת';

        return String.valueOf(infinitive);
    }

    @Override
    protected String getFutureBase(String base) {
        char[] futureBase = new char[2];
        String root = getRoot(base);
        futureBase[0] = root.charAt(1);
        futureBase[1] = root.charAt(2);

        return String.valueOf(futureBase);
    }

    @Override
    public BinyanName getBinyanName() {
        return BinyanName.PAAL_PEYYOD;
    }

    @Override
    public boolean isThisBinyan(String base) {
        return base.length() == 4 &&
                base.charAt(1) == 'ו' &&
                base.charAt(3) != 'ה' &&
                (base.charAt(0) == 'י' ||
                        base.charAt(0) == 'ה');
    }
}
