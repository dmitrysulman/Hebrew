package org.dmitrysulman.hebrew.controller;

import org.dmitrysulman.hebrew.dto.AddVerbDto;
import org.dmitrysulman.hebrew.dto.GetVerbDto;
import org.dmitrysulman.hebrew.dto.GetVerbFormsDto;
import org.dmitrysulman.hebrew.model.Verb;
import org.dmitrysulman.hebrew.service.VerbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/verbs")
public class VerbController {
    private final VerbService verbService;

    @Autowired
    public VerbController(VerbService verbService) {
        this.verbService = verbService;
    }

    @GetMapping("")
    public List<Verb> getAllVerbs() {
        return verbService.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<HttpStatus> addVerb(@RequestBody AddVerbDto addVerbDto) {
        verbService.save(addVerbDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public GetVerbDto getVerb(@PathVariable int id) {
        GetVerbDto getVerbDto = verbService.findById(id);
        if (getVerbDto == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        } else {
            return getVerbDto;
        }
    }

    @GetMapping("/get_forms/{verb}")
    public GetVerbFormsDto getVerbForms(@PathVariable String verb,
                                        @RequestParam(required = false) String binyan) {
        GetVerbFormsDto verbForms;
        if (binyan == null) {
            verbForms = verbService.getVerbForms(verb);
        } else {
            verbForms = verbService.getVerbForms(verb, binyan);
        }
        return verbForms;
    }
}
