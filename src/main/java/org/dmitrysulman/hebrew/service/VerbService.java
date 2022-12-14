package org.dmitrysulman.hebrew.service;

import org.dmitrysulman.hebrew.dto.verbFormsDto;
import org.dmitrysulman.hebrew.word.verb.VerbWord;
import org.dmitrysulman.hebrew.dto.AddVerbDto;
import org.dmitrysulman.hebrew.dto.GetVerbDto;

import java.util.List;

public interface VerbService {
    List<org.dmitrysulman.hebrew.model.Verb> findAll();

    void save(AddVerbDto addVerbDto);

    GetVerbDto findById(int id);

    verbFormsDto getVerbForms(String base);

    verbFormsDto getVerbForms(String base, String binyan);

    void registerBinyan(VerbWord.BinyanName binyanName, VerbWord verbWord);
}
