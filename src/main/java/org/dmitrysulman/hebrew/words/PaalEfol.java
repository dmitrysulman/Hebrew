package org.dmitrysulman.hebrew.words;

import org.springframework.stereotype.Component;

@Component
public class PaalEfol extends Paal {
    @Override
    public BinyanName getBinyanName() {
        return BinyanName.PAAL_EFOL;
    }

    @Override
    public boolean isThisBinyan(String base) {
        return base.length() == 4 &&
                base.charAt(1) == 'ו' &&
                base.charAt(0) != 'י' &&
                base.charAt(0) != 'נ' &&
                base.charAt(0) != 'א' &&
                base.charAt(0) != 'ה' &&
                base.charAt(3) != 'ה';
    }

    private String getFutureBase(String base) {
        char[] tmpBase = new char[4];
        tmpBase[0] = base.charAt(0);
        tmpBase[1] = base.charAt(2);
        tmpBase[2] = 'ו';
        tmpBase[3] = base.charAt(3);

        return String.valueOf(tmpBase);
    }

    @Override
    public String getFutureTenseSingularFirstPerson(String base) {
        return "א".concat(getFutureBase(base));
    }

    @Override
    public String getFutureTensePluralFirstPerson(String base) {
        return "נ".concat(getFutureBase(base));
    }

    @Override
    public String getFutureTenseMaleSingularSecondPerson(String base) {
        return "ת".concat(getFutureBase(base));
    }

    @Override
    public String getFutureTenseFemaleSingularSecondPerson(String base) {
        return "ת".concat(getRoot(base)).concat("י");
    }

    @Override
    public String getFutureTenseMaleSingularThirdPerson(String base) {
        return "י".concat(getFutureBase(base));
    }

    @Override
    public String getFutureTenseFemaleSingularThirdPerson(String base) {
        return "ת".concat(getFutureBase(base));
    }

    @Override
    public String getFutureTensePluralSecondPerson(String base) {
        return "ת".concat(getRoot(base)).concat("ו");
    }

    @Override
    public String getFutureTensePluralThirdPerson(String base) {
        return "י".concat(getRoot(base)).concat("ו");
    }
}
