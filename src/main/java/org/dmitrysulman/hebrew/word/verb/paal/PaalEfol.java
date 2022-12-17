package org.dmitrysulman.hebrew.word.verb.paal;

import org.springframework.stereotype.Component;

@Component
public class PaalEfol extends Paal {
    @Override
    public Binyan getBinyanName() {
        return Binyan.PAAL_EFOL;
    }

    @Override
    public boolean isThisBinyan(String base) {
        return base.length() == 4 &&
                base.charAt(1) == 'ו' &&
                base.charAt(3) != 'ה' &&
                base.charAt(2) != 'ה' &&
                base.charAt(2) != 'א' &&
                base.charAt(2) != 'ח' &&
                base.charAt(2) != 'ע' &&
                base.charAt(3) != 'א' &&
                base.charAt(3) != 'ח' &&
                base.charAt(3) != 'ע' &&
                base.charAt(0) != 'י' &&
                base.charAt(0) != 'נ' &&
                base.charAt(0) != 'א' &&
                base.charAt(0) != 'ה';
    }

    @Override
    protected String getFutureBase(String base) {
        char[] futureBase = new char[4];
        String root = getRoot(base);
        futureBase[0] = root.charAt(0);
        futureBase[1] = root.charAt(1);
        futureBase[2] = 'ו';
        futureBase[3] = root.charAt(2);

        return String.valueOf(futureBase);
    }

    @Override
    public String getFutureTenseFemaleSingularSecondPerson(String base) {
        return changeSofit("ת".concat(getRoot(base)).concat("י"));
    }

    @Override
    public String getFutureTensePluralSecondPerson(String base) {
        return changeSofit("ת".concat(getRoot(base)).concat("ו"));
    }

    @Override
    public String getFutureTensePluralThirdPerson(String base) {
        return changeSofit("י".concat(getRoot(base)).concat("ו"));
    }
}
