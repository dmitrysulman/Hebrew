package org.dmitrysulman.hebrew.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "verbs")
@NoArgsConstructor
@Getter
@Setter
public class Verb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String infinitive;
}
