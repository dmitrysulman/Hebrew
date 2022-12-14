package org.dmitrysulman.hebrew.word.verb.paal;

import org.springframework.stereotype.Component;

@Component
public class PaalPeyAlef extends Paal {
    @Override
    public Binyan getBinyanName() {
        return Binyan.PAAL_PEYALEF;
    }

    @Override
    public String getFutureTenseSingularFirstPerson(String base) {
        return base;
    }

    @Override
    public boolean isThisBinyan(String base) {
        return base.length() == 4 &&
                base.charAt(1) == 'ו' &&
                base.charAt(3) != 'ה' &&
                base.charAt(0) == 'א';
    }
}
