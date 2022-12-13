package org.dmitrysulman.hebrew.service;

import org.dmitrysulman.hebrew.dto.GetVerbFormsDto;
import org.dmitrysulman.hebrew.words.VerbWord;
import org.dmitrysulman.hebrew.dto.AddVerbDto;
import org.dmitrysulman.hebrew.dto.GetVerbDto;

import java.util.List;

public interface VerbService {
    List<org.dmitrysulman.hebrew.model.Verb> findAll();

    void save(AddVerbDto addVerbDto);

    GetVerbDto findById(int id);

    GetVerbFormsDto getVerbForms(String base);

    GetVerbFormsDto getVerbForms(String base, String binyan);

    void registerBinyan(VerbWord.BinyanName binyanName, VerbWord verbWord);
}
