package org.dmitrysulman.hebrew.util;

import org.dmitrysulman.hebrew.dto.FieldKeyDto;
import org.springframework.validation.FieldError;

import javax.validation.ConstraintViolation;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class ErrorResponse {
    private String message;
    private Instant timestamp;
    private int status;
    private List<ValidationError> validationErrors;

    public ErrorResponse() {
    }

    public ErrorResponse(String message, Instant timestamp, int status) {
        this.message = message;
        this.timestamp = timestamp;
        this.status = status;
    }

    public void addValidationError(FieldError fieldError) {
        if (validationErrors == null) {
            validationErrors = new ArrayList<>();
        }
        String field = fieldError.getField();
        if (fieldError.contains(ConstraintViolation.class)) {
            Object fieldErrorSource = fieldError.unwrap(ConstraintViolation.class).getLeafBean();
            if (fieldErrorSource instanceof FieldKeyDto) {
                field = ((FieldKeyDto) fieldErrorSource).getFieldKey();
            }
        }

        validationErrors.add(new ValidationError(field, fieldError.getDefaultMessage()));
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public List<ValidationError> getValidationErrors() {
        return validationErrors;
    }

    public void setValidationErrors(List<ValidationError> validationErrors) {
        this.validationErrors = validationErrors;
    }

    private static class ValidationError {
        private String field;
        private String message;

        public ValidationError() {
        }

        public ValidationError(String field, String message) {
            this.field = field;
            this.message = message;
        }

        public String getField() {
            return field;
        }

        public void setField(String field) {
            this.field = field;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
