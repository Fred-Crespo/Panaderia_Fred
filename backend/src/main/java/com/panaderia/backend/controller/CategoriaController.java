package com.panaderia.backend.controller;

import com.panaderia.backend.model.Categoria;
import com.panaderia.backend.repository.CategoriaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping
    public List<Categoria> obtenerCategorias() {
        return categoriaRepository.findAll();
    }
}
