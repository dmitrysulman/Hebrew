package org.dmitrysulman.hebrew.repository;

import org.dmitrysulman.hebrew.model.Verb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.util.List;

public interface VerbRepository extends JpaRepository<Verb, Integer> {
    @Query("select distinct v from Verb v left join fetch v.verbForms")
    @QueryHints(@QueryHint(name = "hibernate.query.passDistinctThrough", value = "false"))
    List<Verb> findAllWithVerbForms();

    @Query("select distinct v from Verb v left join fetch v.verbTranslations")
    @QueryHints(@QueryHint(name = "hibernate.query.passDistinctThrough", value = "false"))
    List<Verb> findAllWithTranslations();
}
