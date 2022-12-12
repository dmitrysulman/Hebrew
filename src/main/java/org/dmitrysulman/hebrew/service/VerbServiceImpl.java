package org.dmitrysulman.hebrew.service;

import org.dmitrysulman.hebrew.binyan.Binyan;
import org.dmitrysulman.hebrew.dto.AddVerbDto;
import org.dmitrysulman.hebrew.dto.GetVerbDto;
import org.dmitrysulman.hebrew.model.Verb;
import org.dmitrysulman.hebrew.repository.VerbRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class VerbServiceImpl implements VerbService {
    private final VerbRepository verbRepository;
    private final ModelMapper modelMapper;
    private final Map<Binyan.BinyanName, Binyan> binyans;

    @Autowired
    public VerbServiceImpl(VerbRepository verbRepository, ModelMapper modelMapper) {
        this.verbRepository = verbRepository;
        this.modelMapper = modelMapper;
        binyans = new HashMap<>();
    }

    @Override
    public List<Verb> findAll() {
        return verbRepository.findAll();
    }

    @Override
    public void save(AddVerbDto addVerbDto) {
        Verb verb = modelMapper.map(addVerbDto, Verb.class);
        verbRepository.save(verb);
    }

    @Override
    public GetVerbDto findById(int id) {
        Optional<Verb> verb = verbRepository.findById(id);
        GetVerbDto getVerbDto = null;
        if (verb.isPresent()) {
            getVerbDto = modelMapper.map(verb.get(), GetVerbDto.class);
        }
        return getVerbDto;
    }

    @Override
    public void registerBinyan(Binyan.BinyanName binyanName, Binyan binyan) {
        binyans.put(binyanName, binyan);
    }
}
