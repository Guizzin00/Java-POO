package br.com.reservaviagens.trabalho.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.reservaviagens.trabalho.DAO.IDestino;
import br.com.reservaviagens.trabalho.model.Destino;

@RestController
@CrossOrigin("*")
@RequestMapping("/destinos")
public class DestinoController {
	@Autowired
    private IDestino dao;

    @PostMapping
    public ResponseEntity<Destino> criar(@RequestBody Destino destino) {
        return ResponseEntity.status(201).body(dao.save(destino));
    }

    @GetMapping
    public ResponseEntity<List<Destino>> listar() {
        return ResponseEntity.ok((List<Destino>) dao.findAll());
    }

}
