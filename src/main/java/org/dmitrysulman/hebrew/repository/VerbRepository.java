package org.dmitrysulman.hebrew.repository;

import org.dmitrysulman.hebrew.model.Verb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerbRepository extends JpaRepository<Verb, Integer> {
}
