// src/main/java/com/panaderia/backend/controller/EstadoPedidoController.java
package com.panaderia.backend.controller;

import com.panaderia.backend.dto.EstadoPedidoDTO;
import com.panaderia.backend.service.EstadoPedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/estado-pedido")
public class EstadoPedidoController {

    @Autowired
    private EstadoPedidoService estadoPedidoService;

    @GetMapping("/{numeroPedido}")
    public EstadoPedidoDTO obtenerEstado(@PathVariable String numeroPedido) {
        return estadoPedidoService.obtenerEstadoPorNumeroPedido(numeroPedido);
    }
}





