package org.dmitrysulman.hebrew.words;

public interface PastTense {
    String getPastTenseSingularFirstPerson(String base);

    String getPastTensePluralFirstPerson(String base);

    String getPastTenseMaleSingularSecondPerson(String base);

    String getPastTenseFemaleSingularSecondPerson(String base);

    String getPastTenseMaleSingularThirdPerson(String base);

    String getPastTenseFemaleSingularThirdPerson(String base);

    String getPastTenseMalePluralSecondPerson(String base);

    String getPastTenseFemalePluralSecondPerson(String base);

    String getPastTensePluralThirdPerson(String base);
}
