package org.dmitrysulman.hebrew.controller;

import org.dmitrysulman.hebrew.dto.BinyansDto;
import org.dmitrysulman.hebrew.dto.LanguagesDto;
import org.dmitrysulman.hebrew.dto.VerbDto;
import org.dmitrysulman.hebrew.dto.VerbFormsDto;
import org.dmitrysulman.hebrew.service.VerbService;
import org.dmitrysulman.hebrew.util.VerbDtoValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/verbs")
public class VerbController {
    private final VerbService verbService;
    private final VerbDtoValidator verbDtoValidator;

    @InitBinder("verbDto")
    public void initBinder(WebDataBinder binder) {
        binder.addValidators(verbDtoValidator);
    }

    @Autowired
    public VerbController(VerbService verbService, VerbDtoValidator verbDtoValidator) {
        this.verbService = verbService;
        this.verbDtoValidator = verbDtoValidator;
    }

    @GetMapping("")
    public List<VerbDto> getAllVerbs() {
        return verbService.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<HttpStatus> addVerb(@RequestBody @Valid VerbDto verbDto) {
        verbService.save(verbDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public VerbDto getVerb(@PathVariable int id) {
        VerbDto verbDto = verbService.findById(id);
        if (verbDto == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        } else {
            return verbDto;
        }
    }

    @GetMapping("/get_forms/{verb}")
    public VerbFormsDto getVerbForms(@PathVariable String verb,
                                     @RequestParam(required = false) String binyan) {
        VerbFormsDto verbForms;
        if (binyan == null) {
            verbForms = verbService.getVerbForms(verb);
        } else {
            verbForms = verbService.getVerbForms(verb, binyan);
        }

        return verbForms;
    }

    @GetMapping("/get_binyans")
    public BinyansDto getBinyans() {
        return verbService.getBinyans();
    }

    @GetMapping("/get_languages")
    public LanguagesDto getLanguages() {
        return verbService.getLanguages();
    }
}
