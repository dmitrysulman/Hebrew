package org.dmitrysulman.hebrew.binyan;

public interface PresentTense {
    String getPresentTenseMaleSingular(String base);

    String getPresentTenseFemaleSingular(String base);

    String getPresentTenseMalePlural(String base);

    String getPresentTenseFemalePlural(String base);
}
