package org.dmitrysulman.hebrew.words;

import org.dmitrysulman.hebrew.service.VerbService;
import org.springframework.beans.factory.annotation.Autowired;

public interface VerbWord extends PresentTense, PastTense, FutureTense, Word {
    enum BinyanName {
        PAAL_EFOL, PAAL_EFAL, PAAL_PEYIUD, PAAL_AINVAFIUD, PIEL, HIFIL, HITPAEL, NIFAL
    }

    BinyanName getBinyanName();

    boolean isThisBinyan(String base);

    @Autowired
    default void registerMyself(VerbService verbService) {
        verbService.registerBinyan(getBinyanName(), this);
    }
}
