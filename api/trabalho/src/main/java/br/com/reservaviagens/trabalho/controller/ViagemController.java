package br.com.reservaviagens.trabalho.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.reservaviagens.trabalho.DAO.IDestino;
import br.com.reservaviagens.trabalho.DAO.IUsuario;
import br.com.reservaviagens.trabalho.DAO.IViagem;
import br.com.reservaviagens.trabalho.model.Destino;
import br.com.reservaviagens.trabalho.model.Usuario;
import br.com.reservaviagens.trabalho.model.Viagem;

@RestController
@CrossOrigin("*")
@RequestMapping("/viagens")
public class ViagemController {
	@Autowired
    private IViagem dao;

    @Autowired
    private IUsuario usuarioDao;

    @Autowired
    private IDestino destinoDao;

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Map<String, Integer> dados) {
        Optional<Usuario> passageiro = usuarioDao.findById(dados.get("passageiroId"));
        Optional<Destino> destino = destinoDao.findById(dados.get("destinoId"));

        if (passageiro.isPresent() && destino.isPresent()) {
            Viagem viagem = new Viagem();
            viagem.setPassageiro(passageiro.get());
            viagem.setDestino(destino.get());
            return ResponseEntity.status(201).body(dao.save(viagem));
        }

        return ResponseEntity.status(404).body("Passageiro ou destino não encontrado");
    }

    @GetMapping
    public ResponseEntity<List<Viagem>> listar() {
        return ResponseEntity.ok((List<Viagem>) dao.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        Optional<Viagem> viagem = dao.findById(id);
        if (viagem.isPresent()) {
            return ResponseEntity.ok(viagem.get());
        }
        return ResponseEntity.status(404).body("Reserva não encontrada");
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable int id, @RequestBody Map<String, Integer> dados) {
        Optional<Viagem> viagemExistente = dao.findById(id);
        Optional<Usuario> passageiro = usuarioDao.findById(dados.get("passageiroId"));
        Optional<Destino> destino = destinoDao.findById(dados.get("destinoId"));

        if (viagemExistente.isPresent() && passageiro.isPresent() && destino.isPresent()) {
            Viagem viagem = viagemExistente.get();
            viagem.setPassageiro(passageiro.get());
            viagem.setDestino(destino.get());
            dao.save(viagem);
            return ResponseEntity.ok().body(viagem);
        }

        return ResponseEntity.status(404).body("Viagem, passageiro ou destino não encontrado");
    }
  
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable int id) {
        Optional<Viagem> viagem = dao.findById(id);
        if (viagem.isPresent()) {
            dao.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    
}
