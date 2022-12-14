package org.dmitrysulman.hebrew.word.verb;

public interface PresentTense {
    String getPresentTenseMaleSingular(String base);

    String getPresentTenseFemaleSingular(String base);

    String getPresentTenseMalePlural(String base);

    String getPresentTenseFemalePlural(String base);
}
