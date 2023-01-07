package org.dmitrysulman.hebrew.service;

import org.dmitrysulman.hebrew.dto.BinyansDto;
import org.dmitrysulman.hebrew.dto.LanguagesDto;
import org.dmitrysulman.hebrew.dto.VerbFormsDto;
import org.dmitrysulman.hebrew.word.verb.VerbWord;
import org.dmitrysulman.hebrew.dto.VerbDto;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface VerbService {
    List<VerbDto> findAll();

    Map<Character, List<VerbDto>> findAllGroupByFirstLetter();

    void save(VerbDto verbDto);

    VerbDto findById(int id);

    VerbFormsDto getVerbForms(String base);

    VerbFormsDto getVerbForms(String base, String binyan);

    BinyansDto getBinyans();

    void registerBinyan(VerbWord.Binyan binyan, VerbWord verbWord);

    LanguagesDto getLanguages();

    Optional<Integer> findIdByInfinitive(String infinitive);
}
