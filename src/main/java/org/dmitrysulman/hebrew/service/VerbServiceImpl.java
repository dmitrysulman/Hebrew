package org.dmitrysulman.hebrew.service;

import org.dmitrysulman.hebrew.dto.*;
import org.dmitrysulman.hebrew.model.Verb;
import org.dmitrysulman.hebrew.model.enums.*;
import org.dmitrysulman.hebrew.model.enums.Number;
import org.dmitrysulman.hebrew.word.verb.VerbWord;
import org.dmitrysulman.hebrew.repository.VerbRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional(readOnly = true)
public class VerbServiceImpl implements VerbService {
    private final VerbRepository verbRepository;
    private final ModelMapper modelMapper;
    private final Map<VerbWord.Binyan, VerbWord> binyans;

    @Autowired
    public VerbServiceImpl(VerbRepository verbRepository, ModelMapper modelMapper) {
        this.verbRepository = verbRepository;
        this.modelMapper = modelMapper;
        binyans = new HashMap<>();
    }

    @Override
    public List<VerbDto> findAll() {
        List<Verb> verbs = verbRepository.findAll();
        return verbs.stream()
                .map(verb -> modelMapper.map(verb, VerbDto.class))
                .toList();
    }

    @Override
    @Transactional
    public void save(VerbDto verbDto) {
        Verb verb = modelMapper.map(verbDto, Verb.class);
        verb.getVerbForms().forEach(verbForm -> verbForm.setVerb(verb));
        verb.getVerbTranslations().forEach(verbTranslation -> verbTranslation.setVerb(verb));
        verbRepository.save(verb);
    }

    private VerbFormDto getVerbFormDto(Tense tense,
                                    Gender gender,
                                    Number number,
                                    Person person,
                                    String form) {
        return VerbFormDto.builder()
                .tense(tense)
                .gender(gender)
                .number(number)
                .person(person)
                .form(form)
                .build();
    }

    @Override
    public VerbDto findById(int id) {
        Optional<Verb> verb = verbRepository.findById(id);
        VerbDto verbDto = null;
        if (verb.isPresent()) {
            verbDto = modelMapper.map(verb.get(), VerbDto.class);
        }
        return verbDto;
    }

    @Override
    public VerbFormsDto getVerbForms(String base) {
        for (Map.Entry<VerbWord.Binyan, VerbWord> binyan : binyans.entrySet()) {
            if (binyan.getValue().isThisBinyan(base)) {
                return buildVerbFormsDto(base, binyan.getValue());
            }
        }
        return new VerbFormsDto();
    }

    private VerbFormsDto buildVerbFormsDto(String base, VerbWord binyan) {
        Map<String, VerbFormDto> verbFormDtos = new HashMap<>();
        //present
        verbFormDtos.put("presentTenseMaleSingular", getVerbFormDto(Tense.PRESENT,
                Gender.MALE,
                Number.SINGULAR,
                Person.NONE,
                binyan.getPresentTenseMaleSingular(base)));
        verbFormDtos.put("presentTenseFemaleSingular",getVerbFormDto(Tense.PRESENT,
                Gender.FEMALE,
                Number.SINGULAR,
                Person.NONE,
                binyan.getPresentTenseFemaleSingular(base)));
        verbFormDtos.put("presentTenseMalePlural",getVerbFormDto(Tense.PRESENT,
                Gender.MALE,
                Number.PLURAL,
                Person.NONE,
                binyan.getPresentTenseMalePlural(base)));
        verbFormDtos.put("presentTenseFemalePlural",getVerbFormDto(Tense.PRESENT,
                Gender.FEMALE,
                Number.PLURAL,
                Person.NONE,
                binyan.getPresentTenseFemalePlural(base)));
        //past
        verbFormDtos.put("pastTenseSingularFirstPerson",getVerbFormDto(Tense.PAST,
                Gender.ALL,
                Number.SINGULAR,
                Person.FIRST,
                binyan.getPastTenseSingularFirstPerson(base)));
        verbFormDtos.put("pastTensePluralFirstPerson",getVerbFormDto(Tense.PAST,
                Gender.ALL,
                Number.PLURAL,
                Person.FIRST,
                binyan.getPastTensePluralFirstPerson(base)));
        verbFormDtos.put("pastTenseMaleSingularSecondPerson",getVerbFormDto(Tense.PAST,
                Gender.MALE,
                Number.SINGULAR,
                Person.SECOND,
                binyan.getPastTenseMaleSingularSecondPerson(base)));
        verbFormDtos.put("pastTenseFemaleSingularSecondPerson",getVerbFormDto(Tense.PAST,
                Gender.FEMALE,
                Number.SINGULAR,
                Person.SECOND,
                binyan.getPastTenseFemaleSingularSecondPerson(base)));
        verbFormDtos.put("pastTenseMaleSingularThirdPerson",getVerbFormDto(Tense.PAST,
                Gender.MALE,
                Number.SINGULAR,
                Person.THIRD,
                binyan.getPastTenseMaleSingularThirdPerson(base)));
        verbFormDtos.put("pastTenseFemaleSingularThirdPerson",getVerbFormDto(Tense.PAST,
                Gender.FEMALE,
                Number.SINGULAR,
                Person.THIRD,
                binyan.getPastTenseFemaleSingularThirdPerson(base)));
        verbFormDtos.put("pastTenseMalePluralSecondPerson",getVerbFormDto(Tense.PAST,
                Gender.MALE,
                Number.PLURAL,
                Person.SECOND,
                binyan.getPastTenseMalePluralSecondPerson(base)));
        verbFormDtos.put("pastTenseFemalePluralSecondPerson",getVerbFormDto(Tense.PAST,
                Gender.FEMALE,
                Number.PLURAL,
                Person.SECOND,
                binyan.getPastTenseFemalePluralSecondPerson(base)));
        verbFormDtos.put("pastTensePluralThirdPerson",getVerbFormDto(Tense.PAST,
                Gender.ALL,
                Number.PLURAL,
                Person.THIRD,
                binyan.getPastTensePluralThirdPerson(base)));
        //future
        verbFormDtos.put("futureTenseSingularFirstPerson",getVerbFormDto(Tense.FUTURE,
                Gender.ALL,
                Number.SINGULAR,
                Person.FIRST,
                binyan.getFutureTenseSingularFirstPerson(base)));
        verbFormDtos.put("futureTensePluralFirstPerson",getVerbFormDto(Tense.FUTURE,
                Gender.ALL,
                Number.PLURAL,
                Person.FIRST,
                binyan.getFutureTensePluralFirstPerson(base)));
        verbFormDtos.put("futureTenseMaleSingularSecondPerson",getVerbFormDto(Tense.FUTURE,
                Gender.MALE,
                Number.SINGULAR,
                Person.SECOND,
                binyan.getFutureTenseMaleSingularSecondPerson(base)));
        verbFormDtos.put("futureTenseFemaleSingularSecondPerson",getVerbFormDto(Tense.FUTURE,
                Gender.FEMALE,
                Number.SINGULAR,
                Person.SECOND,
                binyan.getFutureTenseFemaleSingularSecondPerson(base)));
        verbFormDtos.put("futureTenseMaleSingularThirdPerson",getVerbFormDto(Tense.FUTURE,
                Gender.MALE,
                Number.SINGULAR,
                Person.THIRD,
                binyan.getFutureTenseMaleSingularThirdPerson(base)));
        verbFormDtos.put("futureTenseFemaleSingularThirdPerson",getVerbFormDto(Tense.FUTURE,
                Gender.FEMALE,
                Number.SINGULAR,
                Person.THIRD,
                binyan.getFutureTenseFemaleSingularThirdPerson(base)));
        verbFormDtos.put("futureTensePluralSecondPerson",getVerbFormDto(Tense.FUTURE,
                Gender.ALL,
                Number.PLURAL,
                Person.SECOND,
                binyan.getFutureTensePluralSecondPerson(base)));
        verbFormDtos.put("futureTensePluralThirdPerson",getVerbFormDto(Tense.FUTURE,
                Gender.ALL,
                Number.PLURAL,
                Person.THIRD,
                binyan.getFutureTensePluralThirdPerson(base)));

        return VerbFormsDto.builder()
                .binyan(binyan.getBinyanName().toString())
                .root(binyan.getRoot(base))
                .infinitive(binyan.getInfinitive(base))
                .verbForms(verbFormDtos)
                .build();
    }

    @Override
    public VerbFormsDto getVerbForms(String base, String binyan) {
        try {
            return buildVerbFormsDto(base, binyans.get(VerbWord.Binyan.valueOf(binyan)));
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    @Override
    public BinyansDto getBinyans() {
        BinyansDto binyansDto = new BinyansDto();
        for (VerbWord.Binyan binyan : VerbWord.Binyan.values()) {
            binyansDto.getBinyans().put(binyan.name(), binyan.toString());
        }
        return binyansDto;
    }

    @Override
    public void registerBinyan(VerbWord.Binyan binyan, VerbWord verbWord) {
        binyans.put(binyan, verbWord);
    }

    @Override
    public LanguagesDto getLanguages() {
        LanguagesDto languagesDto = new LanguagesDto();
        for (Language language : Language.values()) {
            languagesDto.getLanguages().put(language.name(), language.toString());
        }
        return languagesDto;
    }
}
