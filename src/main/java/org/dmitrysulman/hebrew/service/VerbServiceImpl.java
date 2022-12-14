package org.dmitrysulman.hebrew.service;

import org.dmitrysulman.hebrew.dto.GetVerbFormsDto;
import org.dmitrysulman.hebrew.model.Verb;
import org.dmitrysulman.hebrew.words.VerbWord;
import org.dmitrysulman.hebrew.dto.AddVerbDto;
import org.dmitrysulman.hebrew.dto.GetVerbDto;
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
    private final Map<VerbWord.BinyanName, VerbWord> binyans;

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
    public GetVerbFormsDto getVerbForms(String base) {
        for (Map.Entry<VerbWord.BinyanName, VerbWord> binyan : binyans.entrySet()) {
            if (binyan.getValue().isThisBinyan(base)) {
                return buildVerbFormsDto(base, binyan.getValue());
            }
        }
        return new GetVerbFormsDto();
    }

    private GetVerbFormsDto buildVerbFormsDto(String base, VerbWord binyan) {
        return GetVerbFormsDto.builder()
                .binyan(binyan.getBinyanName().toString())
                .root(binyan.getRoot(base))
                .infinitive(binyan.getInfinitive(base))
                .presentTenseMaleSingular(binyan.getPresentTenseMaleSingular(base))
                .presentTenseFemaleSingular(binyan.getPresentTenseFemaleSingular(base))
                .presentTenseMalePlural(binyan.getPresentTenseMalePlural(base))
                .presentTenseFemalePlural(binyan.getPresentTenseFemalePlural(base))
                .pastTenseSingularFirstPerson(binyan.getPastTenseSingularFirstPerson(base))
                .pastTensePluralFirstPerson(binyan.getPastTensePluralFirstPerson(base))
                .pastTenseMaleSingularSecondPerson(binyan.getPastTenseMaleSingularSecondPerson(base))
                .pastTenseFemaleSingularSecondPerson(binyan.getPastTenseFemaleSingularSecondPerson(base))
                .pastTenseMalePluralSecondPerson(binyan.getPastTenseMalePluralSecondPerson(base))
                .pastTenseFemalePluralSecondPerson(binyan.getPastTenseFemalePluralSecondPerson(base))
                .pastTenseMaleSingularThirdPerson(binyan.getPastTenseMaleSingularThirdPerson(base))
                .pastTenseFemaleSingularThirdPerson(binyan.getPastTenseFemaleSingularThirdPerson(base))
                .pastTensePluralThirdPerson(binyan.getPastTensePluralThirdPerson(base))
                .futureTenseSingularFirstPerson(binyan.getFutureTenseSingularFirstPerson(base))
                .futureTensePluralFirstPerson(binyan.getFutureTensePluralFirstPerson(base))
                .futureTenseMaleSingularSecondPerson(binyan.getFutureTenseMaleSingularSecondPerson(base))
                .futureTenseFemaleSingularSecondPerson(binyan.getFutureTenseFemaleSingularSecondPerson(base))
                .futureTensePluralSecondPerson(binyan.getFutureTensePluralSecondPerson(base))
                .futureTenseMaleSingularThirdPerson(binyan.getFutureTenseMaleSingularThirdPerson(base))
                .futureTenseFemaleSingularThirdPerson(binyan.getFutureTenseFemaleSingularThirdPerson(base))
                .futureTensePluralThirdPerson(binyan.getFutureTensePluralThirdPerson(base))
                .build();
    }

    @Override
    public GetVerbFormsDto getVerbForms(String base, String binyan) {
        try {
            return buildVerbFormsDto(base, binyans.get(VerbWord.BinyanName.valueOf(binyan)));
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    @Override
    public void registerBinyan(VerbWord.BinyanName binyanName, VerbWord verbWord) {
        binyans.put(binyanName, verbWord);
    }
}
