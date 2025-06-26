package br.com.reservaviagens.trabalho.DAO;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import br.com.reservaviagens.trabalho.model.Destino;

public interface IDestino extends CrudRepository<Destino, Integer> {

	Optional<Destino> findByPaisAndCidade(String pais, String cidade);	
}
