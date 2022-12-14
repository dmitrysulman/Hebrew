package org.dmitrysulman.hebrew.word.verb.paal;

import org.springframework.stereotype.Component;

@Component
public class PaalEfal extends Paal {
    @Override
    public BinyanName getBinyanName() {
        return BinyanName.PAAL_EFAL;
    }

    @Override
    public boolean isThisBinyan(String base) {
        return base.length() == 4 &&
                base.charAt(1) == 'ו' &&
                base.charAt(3) != 'ה' &&
                (base.charAt(2) == 'ה' ||
                        base.charAt(2) == 'א' ||
                        base.charAt(2) == 'ח' ||
                        base.charAt(2) == 'ע' ||
                        base.charAt(3) == 'א' ||
                        base.charAt(3) == 'ח' ||
                        base.charAt(3) == 'ע') &&
                base.charAt(0) != 'י' &&
                base.charAt(0) != 'נ' &&
                base.charAt(0) != 'א' &&
                base.charAt(0) != 'ה';
    }
}
