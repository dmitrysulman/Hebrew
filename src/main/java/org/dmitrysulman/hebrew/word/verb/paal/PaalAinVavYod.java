package org.dmitrysulman.hebrew.word.verb.paal;

abstract class PaalAinVavYod extends Paal {
    @Override
    public String getInfinitive(String base) {
        char[] infinitive = new char[4];
        String root = getRoot(base);
        infinitive[0] = 'ל';
        infinitive[1] = root.charAt(0);
        infinitive[2] = root.charAt(1);
        infinitive[3] = root.charAt(2);

        return String.valueOf(infinitive);
    }

    @Override
    protected String getPastBase(String base) {
        return base;
    }

    @Override
    public String getPresentTenseFemaleSingular(String base) {
        return changeSofit(getPresentBase(base).concat("ה"));
    }

    @Override
    public boolean isThisBinyan(String base) {
        return base.length() == 2;
    }
}
