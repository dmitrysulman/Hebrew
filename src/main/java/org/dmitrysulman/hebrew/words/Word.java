package org.dmitrysulman.hebrew.words;

import java.util.regex.Pattern;

public interface Word {
    Pattern kaf = Pattern.compile("ך(.+)");
    Pattern tsadi = Pattern.compile("ץ(.+)");
    Pattern mem = Pattern.compile("ם(.+)");
    Pattern nun = Pattern.compile("ן(.+)");
    Pattern pey = Pattern.compile("ף(.+)");

    String getRoot(String base);

    default String changeSofit(String word) {
        word = kaf.matcher(word).replaceAll("כ$1");
        word = tsadi.matcher(word).replaceAll("צ$1");
        word = mem.matcher(word).replaceAll("מ$1");
        word = nun.matcher(word).replaceAll("נ$1");
        word = pey.matcher(word).replaceAll("פ$1");
        return word;
    }
}
