package org.dmitrysulman.hebrew.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.dmitrysulman.hebrew.model.enums.Language;

import javax.validation.constraints.Size;

@NoArgsConstructor
@Getter
@Setter
public class VerbTranslationDto extends FieldKeyDto {
    private Language language;

    @Size(min = 2, max = 100)
    private String infinitiveTranslated;
}
