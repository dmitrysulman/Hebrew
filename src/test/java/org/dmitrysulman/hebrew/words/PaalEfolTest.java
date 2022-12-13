package org.dmitrysulman.hebrew.words;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class PaalEfolTest {

    private String verb = "כותב";

    @InjectMocks
    PaalEfol paalEfol;

    @Test
    void isThisBinyan() {
        assertEquals(VerbWord.BinyanName.PAAL_EFOL, paalEfol.getBinyanName());
        assertTrue(paalEfol.isThisBinyan(verb));
        assertEquals("כתב", paalEfol.getRoot(verb));
        assertEquals("כותב", paalEfol.getPresentTenseMaleSingular(verb));
        assertEquals("כותבת", paalEfol.getPresentTenseFemaleSingular(verb));
        assertEquals("כותבים", paalEfol.getPresentTenseMalePlural(verb));
        assertEquals("כותבות", paalEfol.getPresentTenseFemalePlural(verb));

        System.out.println(paalEfol.getRoot(verb));
        System.out.println("===============Present==================");
        System.out.println(paalEfol.getPresentTenseMaleSingular(verb));
        System.out.println(paalEfol.getPresentTenseFemaleSingular(verb));
        System.out.println(paalEfol.getPresentTenseMalePlural(verb));
        System.out.println(paalEfol.getPresentTenseFemalePlural(verb));
        System.out.println("===============Past==================");
        System.out.println(paalEfol.getPastTenseSingularFirstPerson(verb));
        System.out.println(paalEfol.getPastTenseMaleSingularSecondPerson(verb));
        System.out.println(paalEfol.getPastTenseFemaleSingularSecondPerson(verb));
        System.out.println(paalEfol.getPastTenseMaleSingularThirdPerson(verb));
        System.out.println(paalEfol.getPastTenseFemaleSingularThirdPerson(verb));
        System.out.println(paalEfol.getPastTensePluralFirstPerson(verb));
        System.out.println(paalEfol.getPastTenseMalePluralSecondPerson(verb));
        System.out.println(paalEfol.getPastTenseFemalePluralSecondPerson(verb));
        System.out.println(paalEfol.getPastTensePluralThirdPerson(verb));
        System.out.println("===============Future==================");
        System.out.println(paalEfol.getFutureTenseSingularFirstPerson(verb));
        System.out.println(paalEfol.getFutureTenseMaleSingularSecondPerson(verb));
        System.out.println(paalEfol.getFutureTenseFemaleSingularSecondPerson(verb));
        System.out.println(paalEfol.getFutureTenseMaleSingularThirdPerson(verb));
        System.out.println(paalEfol.getFutureTenseFemaleSingularThirdPerson(verb));
        System.out.println(paalEfol.getFutureTensePluralFirstPerson(verb));
        System.out.println(paalEfol.getFutureTensePluralSecondPerson(verb));
        System.out.println(paalEfol.getFutureTensePluralThirdPerson(verb));
    }
}