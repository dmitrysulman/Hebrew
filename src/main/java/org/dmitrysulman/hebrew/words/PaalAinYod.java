package org.dmitrysulman.hebrew.words;

import org.springframework.stereotype.Component;

@Component
public class PaalAinYod extends PaalAinVavYod {
    @Override
    public String getRoot(String base) {
        char[] root = new char[3];
        if (base.length() == 2) {
            root[0] = base.charAt(0);
            root[1] = 'י';
            root[2] = base.charAt(1);
        }

        return String.valueOf(root);
    }

    @Override
    public BinyanName getBinyanName() {
        return BinyanName.PAAL_AINYOD;
    }
}
