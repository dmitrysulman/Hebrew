package org.dmitrysulman.hebrew.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "verb_forms")
@NoArgsConstructor
@Getter
@Setter
public class VerbForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tense")
    @NotNull
    private Tense tense;

    @Enumerated(EnumType.STRING)
    @Column(name = "person")
    @NotNull
    private Person person;

    @Enumerated(EnumType.STRING)
    @Column(name = "number")
    @NotNull
    private Number number;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    @NotNull
    private Gender gender;

    @Column(name = "form")
    @NotNull
    private String form;

    @ManyToOne
    @JoinColumn(name = "verb_id")
    @NotNull
    private Verb verb;
}
