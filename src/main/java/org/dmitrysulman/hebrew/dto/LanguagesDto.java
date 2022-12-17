package org.dmitrysulman.hebrew.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.LinkedHashMap;
import java.util.Map;

@NoArgsConstructor
@Getter
public class LanguagesDto {
    private final Map<String, String> languages = new LinkedHashMap<>();
}