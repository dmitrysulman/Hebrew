package org.dmitrysulman.hebrew.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class VerbDto {
    private Integer id;

    @Size(min = 2, max = 20)
    private String infinitive;

    @Size(min = 2, max = 20)
    private String root;

    @Size(min = 2, max = 20)
    private String binyan;

    @Valid
    private List<VerbFormDto> verbForms;

    @Valid
    private List<VerbTranslationDto> verbTranslations;

}
