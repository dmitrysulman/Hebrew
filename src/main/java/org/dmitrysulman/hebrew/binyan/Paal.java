package org.dmitrysulman.hebrew.binyan;

abstract class Paal implements Binyan {
    @Override
    public String getRoot(String base) {
        char[] root = new char[3];
        root[0] = base.charAt(0);
        root[1] = base.charAt(2);
        root[2] = base.charAt(3);

        return String.valueOf(root);
    }

    @Override
    public String getPastTenseSingularFirstPerson(String base) {
        return getRoot(base).concat("תי");
    }

    @Override
    public String getPastTensePluralFirstPerson(String base) {
        return getRoot(base).concat("נו");
    }

    @Override
    public String getPastTenseMaleSingularSecondPerson(String base) {
        return getRoot(base).concat("ת");
    }

    @Override
    public String getPastTenseFemaleSingularSecondPerson(String base) {
        return getRoot(base).concat("ת");
    }

    @Override
    public String getPastTenseMaleSingularThirdPerson(String base) {
        return getRoot(base);
    }

    @Override
    public String getPastTenseFemaleSingularThirdPerson(String base) {
        return getRoot(base).concat("ה");
    }

    @Override
    public String getPastTenseMalePluralSecondPerson(String base) {
        return getRoot(base).concat("תם");
    }

    @Override
    public String getPastTenseFemalePluralSecondPerson(String base) {
        return getRoot(base).concat("תן");
    }

    @Override
    public String getPastTensePluralThirdPerson(String base) {
        return getRoot(base).concat("ו");
    }

    @Override
    public String getPresentTenseMaleSingular(String base) {
        return base;
    }

    @Override
    public String getPresentTenseFemaleSingular(String base) {
        return base.concat("ת");
    }

    @Override
    public String getPresentTenseMalePlural(String base) {
        return base.concat("ים");
    }

    @Override
    public String getPresentTenseFemalePlural(String base) {
        return base.concat("ות");
    }
}
