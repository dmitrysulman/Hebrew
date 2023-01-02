package org.dmitrysulman.hebrew.util;

import org.dmitrysulman.hebrew.dto.VerbDto;
import org.dmitrysulman.hebrew.service.VerbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Optional;

@Component
public class VerbDtoValidator implements Validator {
    private final VerbService verbService;

    @Autowired
    public VerbDtoValidator(VerbService verbService) {
        this.verbService = verbService;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return VerbDto.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        VerbDto verbDto = (VerbDto) target;
        Optional<Integer> verbIdWithSameInfinitive = verbService.findIdByInfinitive(verbDto.getInfinitive());
        if (verbIdWithSameInfinitive.isPresent() && !verbIdWithSameInfinitive.get().equals(verbDto.getId())) {
            errors.rejectValue("infinitive", "", "This infinitive is already exist.");
        }
    }
}
