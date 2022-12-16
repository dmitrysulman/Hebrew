package org.dmitrysulman.hebrew.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.LinkedHashMap;
import java.util.Map;

@NoArgsConstructor
@Getter
public class BinyansDto {
    private final Map<String, String> binyans = new LinkedHashMap<>();
}
