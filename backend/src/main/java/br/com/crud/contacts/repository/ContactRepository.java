package br.com.crud.contacts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.crud.contacts.entity.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> { }
