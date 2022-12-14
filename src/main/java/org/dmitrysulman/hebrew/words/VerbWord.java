package org.dmitrysulman.hebrew.words;

import org.dmitrysulman.hebrew.service.VerbService;
import org.springframework.beans.factory.annotation.Autowired;

abstract public class VerbWord implements PresentTense, PastTense, FutureTense, Word {
    public enum BinyanName {
        PAAL_EFOL,
        PAAL_EFAL,
        PAAL_PEYYOD,
        PAAL_AINVAV,
        PAAL_AINYOD,
        PAAL_LAMEDHEY,
        PAAL_PEYALEF,
        PAAL_PEYNUN,
        PIEL,
        HIFIL,
        HITPAEL,
        NIFAL
    }

    abstract public BinyanName getBinyanName();

    abstract public boolean isThisBinyan(String base);

    abstract public String getInfinitive(String base);

    abstract protected String getPastBase(String base);

    abstract protected String getFutureBase(String base);

    abstract protected String getPresentBase(String base);

    @Autowired
    public void registerMyself(VerbService verbService) {
        verbService.registerBinyan(getBinyanName(), this);
    }
}
