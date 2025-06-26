package br.com.reservaviagens.trabalho.DAO;

import org.springframework.data.repository.CrudRepository;

import br.com.reservaviagens.trabalho.model.Viagem;

public interface IViagem extends CrudRepository<Viagem, Integer> {
	
}