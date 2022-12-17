package org.dmitrysulman.hebrew.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.dmitrysulman.hebrew.word.verb.VerbWord;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "verbs")
@NoArgsConstructor
@Getter
@Setter
public class Verb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "infinitive", unique = true)
    @NotNull
    private String infinitive;

    @Column(name = "root")
    @NotNull
    private String root;

    @Enumerated(EnumType.STRING)
    @Column(name = "binyan")
    @NotNull
    private VerbWord.Binyan binyan;

    @OneToMany(mappedBy = "verb", cascade = CascadeType.ALL)
    private List<VerbForm> verbForms;

    @OneToMany(mappedBy = "verb", cascade = CascadeType.ALL)
    private List<VerbTranslation> verbTranslations;
}
