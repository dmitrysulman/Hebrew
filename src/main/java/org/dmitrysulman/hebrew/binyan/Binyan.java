package org.dmitrysulman.hebrew.binyan;

import org.dmitrysulman.hebrew.service.VerbService;
import org.springframework.beans.factory.annotation.Autowired;

public interface Binyan extends PresentTense, PastTense, FutureTense {
    enum BinyanName {
        PAAL_EFOL, PAAL_EFAL, PAAL_PEYIUD, PAAL_AINVAFIUD, PIEL, HIFIL, HITPAEL, NIFAL
    }

    String getRoot(String base);

    BinyanName getBinyanName();

    boolean isThisBinyan(String base);

    @Autowired
    default void registerMyself(VerbService verbService) {
        verbService.registerBinyan(getBinyanName(), this);
    }
}
