package org.dmitrysulman.hebrew.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "verb_translations")
@NoArgsConstructor
@Getter
@Setter
public class VerbTranslation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    @NotNull
    private Language language;

    @Column(name = "infinitive_translated")
    @NotNull
    private String infinitiveTranslated;

    @ManyToOne
    @JoinColumn(name = "verb_id")
    @NotNull
    private Verb verb;
}
