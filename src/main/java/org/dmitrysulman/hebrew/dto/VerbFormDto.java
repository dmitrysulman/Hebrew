package org.dmitrysulman.hebrew.dto;

import lombok.*;
import org.dmitrysulman.hebrew.model.enums.Gender;
import org.dmitrysulman.hebrew.model.enums.Number;
import org.dmitrysulman.hebrew.model.enums.Person;
import org.dmitrysulman.hebrew.model.enums.Tense;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class VerbFormDto {
    private Tense tense;

    private Person person;

    private Number number;

    private Gender gender;

    private String form;
}
