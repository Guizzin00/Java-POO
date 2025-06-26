package br.com.reservaviagens.trabalho.DAO;

import org.springframework.data.repository.CrudRepository;

import br.com.reservaviagens.trabalho.model.Usuario;

public interface IUsuario extends CrudRepository<Usuario, Integer>{
	
}
