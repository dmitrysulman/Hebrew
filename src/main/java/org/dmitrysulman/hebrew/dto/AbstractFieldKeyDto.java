package org.dmitrysulman.hebrew.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.Getter;
import lombok.Setter;

abstract public class AbstractFieldKeyDto {
    @Getter @Setter
    @JsonInclude(Include.NON_NULL)
    protected String fieldKey;
}
