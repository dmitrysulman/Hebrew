package org.dmitrysulman.hebrew.service;

import org.dmitrysulman.hebrew.binyan.Binyan;
import org.dmitrysulman.hebrew.dto.AddVerbDto;
import org.dmitrysulman.hebrew.dto.GetVerbDto;
import org.dmitrysulman.hebrew.model.Verb;

import java.util.List;

public interface VerbService {
    List<Verb> findAll();

    void save(AddVerbDto addVerbDto);

    GetVerbDto findById(int id);

    void registerBinyan(Binyan.BinyanName binyanName, Binyan binyan);
}
