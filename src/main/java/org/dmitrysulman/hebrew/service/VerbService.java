package org.dmitrysulman.hebrew.service;

import org.dmitrysulman.hebrew.dto.BinyansDto;
import org.dmitrysulman.hebrew.dto.VerbFormsDto;
import org.dmitrysulman.hebrew.word.verb.VerbWord;
import org.dmitrysulman.hebrew.dto.VerbDto;

import java.util.List;

public interface VerbService {
    List<org.dmitrysulman.hebrew.model.Verb> findAll();

    void save(VerbDto verbDto);

    VerbDto findById(int id);

    VerbFormsDto getVerbForms(String base);

    VerbFormsDto getVerbForms(String base, String binyan);

    BinyansDto getBinyans();

    void registerBinyan(VerbWord.BinyanName binyanName, VerbWord verbWord);
}
