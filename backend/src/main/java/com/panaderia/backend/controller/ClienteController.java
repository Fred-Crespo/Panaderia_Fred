package com.panaderia.backend.controller;

import com.panaderia.backend.model.Cliente;
import com.panaderia.backend.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/registro")
    public ResponseEntity<?> registrarCliente(@RequestBody Cliente cliente) {
        Cliente nuevoCliente = clienteRepository.save(cliente);
        return ResponseEntity.ok(Map.of("id", nuevoCliente.getId()));
    }
}

