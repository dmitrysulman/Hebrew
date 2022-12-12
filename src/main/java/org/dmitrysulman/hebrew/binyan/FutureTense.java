package org.dmitrysulman.hebrew.binyan;

public interface FutureTense {
    String getFutureTenseSingularFirstPerson(String base);

    String getFutureTensePluralFirstPerson(String base);

    String getFutureTenseMaleSingularSecondPerson(String base);

    String getFutureTenseFemaleSingularSecondPerson(String base);

    String getFutureTenseMaleSingularThirdPerson(String base);

    String getFutureTenseFemaleSingularThirdPerson(String base);

    String getFutureTensePluralSecondPerson(String base);

    String getFutureTensePluralThirdPerson(String base);
}
