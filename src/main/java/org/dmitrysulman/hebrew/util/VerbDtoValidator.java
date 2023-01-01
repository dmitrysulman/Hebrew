package org.dmitrysulman.hebrew.util;

import org.dmitrysulman.hebrew.dto.VerbDto;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class VerbDtoValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return VerbDto.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
//        errors.reject("fail");
    }
}
