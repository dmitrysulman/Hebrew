package org.dmitrysulman.hebrew.words;

import org.springframework.stereotype.Component;

@Component
public class PaalLamedHey extends Paal {
    @Override
    public String getInfinitive(String base) {
        char[] infinitive = new char[5];
        String root = getRoot(base);
        infinitive[0] = 'ל';
        infinitive[1] = root.charAt(0);
        infinitive[2] = root.charAt(1);
        infinitive[3] = 'ו';
        infinitive[4] = 'ת';

        return String.valueOf(infinitive);
    }

    @Override
    public BinyanName getBinyanName() {
        return BinyanName.PAAL_LAMEDHEY;
    }

    @Override
    public boolean isThisBinyan(String base) {
        return base.length() == 4 &&
                base.charAt(1) == 'ו' &&
                base.charAt(3) == 'ה';
    }

    @Override
    protected String getPastBase(String base) {
        char[] pastBase = new char[2];
        String root = getRoot(base);
        pastBase[0] = root.charAt(0);
        pastBase[1] = root.charAt(1);

        return String.valueOf(pastBase);
    }

    @Override
    protected String getFutureBase(String base) {
        return getPastBase(base);
    }

    @Override
    protected String getPresentBase(String base) {
        char[] presentBase = new char[3];
        String root = getRoot(base);
        presentBase[0] = root.charAt(0);
        presentBase[1] = 'ו';
        presentBase[2] = root.charAt(1);

        return String.valueOf(presentBase);
    }

    @Override
    public String getFutureTenseSingularFirstPerson(String base) {
        return "א".concat(getRoot(base));
    }

    @Override
    public String getFutureTensePluralFirstPerson(String base) {
        return "נ".concat(getRoot(base));
    }

    @Override
    public String getFutureTenseMaleSingularSecondPerson(String base) {
        return "ת".concat(getRoot(base));
    }

    @Override
    public String getFutureTenseMaleSingularThirdPerson(String base) {
        return "י".concat(getRoot(base));
    }

    @Override
    public String getFutureTenseFemaleSingularThirdPerson(String base) {
        return "ת".concat(getRoot(base));
    }

    @Override
    public String getPresentTenseMaleSingular(String base) {
        return getPresentBase(base).concat("ה");
    }

    @Override
    public String getPresentTenseFemaleSingular(String base) {
        return getPresentBase(base).concat("ה");
    }

    @Override
    public String getPastTenseSingularFirstPerson(String base) {
        return getPastBase(base).concat("יתי");
    }

    @Override
    public String getPastTensePluralFirstPerson(String base) {
        return getPastBase(base).concat("ינו");
    }

    @Override
    public String getPastTenseMaleSingularSecondPerson(String base) {
        return getPastBase(base).concat("ית");
    }

    @Override
    public String getPastTenseFemaleSingularSecondPerson(String base) {
        return getPastBase(base).concat("ית");
    }

    @Override
    public String getPastTenseMaleSingularThirdPerson(String base) {
        return getPastBase(base).concat("ה");
    }

    @Override
    public String getPastTenseFemaleSingularThirdPerson(String base) {
        return getPastBase(base).concat("תה");
    }

    @Override
    public String getPastTenseMalePluralSecondPerson(String base) {
        return getPastBase(base).concat("יתם");
    }

    @Override
    public String getPastTenseFemalePluralSecondPerson(String base) {
        return getPastBase(base).concat("יתן");
    }
}
