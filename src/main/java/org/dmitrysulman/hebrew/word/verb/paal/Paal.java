package org.dmitrysulman.hebrew.word.verb.paal;

import org.dmitrysulman.hebrew.word.verb.VerbWord;

abstract class Paal extends VerbWord {
    @Override
    public String getInfinitive(String base) {
        char[] infinitive = new char[5];
        String root = getRoot(base);
        infinitive[0] = 'ל';
        infinitive[1] = root.charAt(0);
        infinitive[2] = root.charAt(1);
        infinitive[3] = 'ו';
        infinitive[4] = root.charAt(2);

        return String.valueOf(infinitive);
    }

    @Override
    public String getRoot(String base) {
        char[] root = new char[3];
        if (base.length() == 4) {
            root[0] = base.charAt(0);
            root[1] = base.charAt(2);
            root[2] = base.charAt(3);
        }

        return String.valueOf(root);
    }

    @Override
    protected String getPastBase(String base) {
        return getRoot(base);
    }

    @Override
    protected String getFutureBase(String base) {
        return getRoot(base);
    }

    @Override
    protected String getPresentBase(String base) {
        return base;
    }

    @Override
    public String getPastTenseSingularFirstPerson(String base) {
        return changeSofit(getPastBase(base).concat("תי"));
    }

    @Override
    public String getPastTensePluralFirstPerson(String base) {
        return changeSofit(getPastBase(base).concat("נו"));
    }

    @Override
    public String getPastTenseMaleSingularSecondPerson(String base) {
        return changeSofit(getPastBase(base).concat("ת"));
    }

    @Override
    public String getPastTenseFemaleSingularSecondPerson(String base) {
        return changeSofit(getPastBase(base).concat("ת"));
    }

    @Override
    public String getPastTenseMaleSingularThirdPerson(String base) {
        return getPastBase(base);
    }

    @Override
    public String getPastTenseFemaleSingularThirdPerson(String base) {
        return changeSofit(getPastBase(base).concat("ה"));
    }

    @Override
    public String getPastTenseMalePluralSecondPerson(String base) {
        return changeSofit(getPastBase(base).concat("תם"));
    }

    @Override
    public String getPastTenseFemalePluralSecondPerson(String base) {
        return changeSofit(getPastBase(base).concat("תן"));
    }

    @Override
    public String getPastTensePluralThirdPerson(String base) {
        return changeSofit(getPastBase(base).concat("ו"));
    }

    @Override
    public String getPresentTenseMaleSingular(String base) {
        return getPresentBase(base);
    }

    @Override
    public String getPresentTenseFemaleSingular(String base) {
        return changeSofit(getPresentBase(base).concat("ת"));
    }

    @Override
    public String getPresentTenseMalePlural(String base) {
        return changeSofit(getPresentBase(base).concat("ים"));
    }

    @Override
    public String getPresentTenseFemalePlural(String base) {
        return changeSofit(getPresentBase(base).concat("ות"));
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
        return changeSofit("ת".concat(getFutureBase(base)).concat("י"));
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
        return changeSofit("ת".concat(getFutureBase(base)).concat("ו"));
    }

    @Override
    public String getFutureTensePluralThirdPerson(String base) {
        return changeSofit("י".concat(getFutureBase(base)).concat("ו"));
    }
}
