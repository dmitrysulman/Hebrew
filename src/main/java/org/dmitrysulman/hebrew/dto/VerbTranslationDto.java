package org.dmitrysulman.hebrew.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.dmitrysulman.hebrew.model.enums.Language;

@NoArgsConstructor
@Getter
@Setter
public class VerbTranslationDto {
    private Language language;

    private String infinitiveTranslated;
}
