package org.dmitrysulman.hebrew.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class GetVerbFormsDto {
    String root;

    String infinitive;
    
    String binyan;

    String presentTenseMaleSingular;

    String presentTenseFemaleSingular;

    String presentTenseMalePlural;

    String presentTenseFemalePlural;

    String pastTenseSingularFirstPerson;

    String pastTensePluralFirstPerson;

    String pastTenseMaleSingularSecondPerson;

    String pastTenseFemaleSingularSecondPerson;

    String pastTenseMaleSingularThirdPerson;

    String pastTenseFemaleSingularThirdPerson;

    String pastTenseMalePluralSecondPerson;

    String pastTenseFemalePluralSecondPerson;

    String pastTensePluralThirdPerson;

    String futureTenseSingularFirstPerson;

    String futureTensePluralFirstPerson;

    String futureTenseMaleSingularSecondPerson;

    String futureTenseFemaleSingularSecondPerson;

    String futureTenseMaleSingularThirdPerson;

    String futureTenseFemaleSingularThirdPerson;

    String futureTensePluralSecondPerson;

    String futureTensePluralThirdPerson;
}
