package org.dmitrysulman.hebrew.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class VerbDto {
    private Integer id;

    private String infinitive;

    private String root;

    private String binyan;

    private String translation;

    private List<VerbFormDto> verbForms;
}
