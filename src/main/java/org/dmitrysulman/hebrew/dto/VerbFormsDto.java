package org.dmitrysulman.hebrew.dto;

import lombok.*;

import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class VerbFormsDto {
    private String root;

    private String infinitive;
    
    private String binyan;

    private Map<String, VerbFormDto> verbForms;
}
