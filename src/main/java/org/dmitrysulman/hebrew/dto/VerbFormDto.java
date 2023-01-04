package org.dmitrysulman.hebrew.dto;

import lombok.*;
import org.dmitrysulman.hebrew.model.enums.Gender;
import org.dmitrysulman.hebrew.model.enums.Number;
import org.dmitrysulman.hebrew.model.enums.Person;
import org.dmitrysulman.hebrew.model.enums.Tense;

import javax.validation.constraints.Size;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class VerbFormDto extends FieldKeyDto {
    private Tense tense;

    private Person person;

    private Number number;

    private Gender gender;

    @Size(min = 2, max = 20)
    private String form;
}
