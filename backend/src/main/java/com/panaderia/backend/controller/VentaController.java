package com.panaderia.backend.controller;

import com.panaderia.backend.model.Venta;
import com.panaderia.backend.repository.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventas")
public class VentaController {

    @Autowired
    private VentaRepository ventaRepository;

    @PostMapping
    public Venta registrarVenta(@RequestBody Venta venta) {
        return ventaRepository.save(venta);
    }

    @GetMapping
    public List<Venta> obtenerVentas() {
        return ventaRepository.findAll();
    }
}



