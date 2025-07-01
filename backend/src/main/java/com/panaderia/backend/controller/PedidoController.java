package com.panaderia.backend.controller;

import com.panaderia.backend.model.Pedido;
import com.panaderia.backend.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.panaderia.backend.model.Cliente;
import com.panaderia.backend.model.PedidoRequest;
import com.panaderia.backend.model.DetallePedidoRequest;
import com.panaderia.backend.model.EstadoPedido;
import com.panaderia.backend.model.DetallePedido;
import com.panaderia.backend.repository.ClienteRepository;
import com.panaderia.backend.repository.EstadoPedidoRepository;

import java.util.List;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private EstadoPedidoRepository estadoPedidoRepository; 

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarPedido(@RequestBody PedidoRequest request) {
        Cliente cliente = clienteRepository.findById(request.getClienteId())
                                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Pedido pedido = new Pedido();
        pedido.setCliente(cliente);
        pedido.setNumeroPedido("ORD-" + System.currentTimeMillis()); // generar código único simple
        pedido.setSubtotal(request.getSubtotal());
        pedido.setIgv(request.getIgv());
        pedido.setEnvio(request.getEnvio());
        pedido.setTotal(request.getTotal());

        List<DetallePedido> detalles = new ArrayList<>();
        for (DetallePedidoRequest item : request.getItems()) {
            DetallePedido detalle = new DetallePedido();
            detalle.setPedido(pedido);
            detalle.setProductoNombre(item.getProductoNombre());
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecioUnitario(item.getPrecioUnitario());
            detalles.add(detalle);
        }

        pedido.setDetalles(detalles);
        Pedido pedidoGuardado = pedidoRepository.save(pedido);

        EstadoPedido estado = new EstadoPedido();
        estado.setPedido(pedidoGuardado);
        estado.setEstado("En preparación");
        estado.setTracking("TRK-" + UUID.randomUUID().toString().substring(0, 9));
        estado.setFecha(LocalDateTime.now());
        estadoPedidoRepository.save(estado);

        return ResponseEntity.ok(Map.of("numeroPedido", pedidoGuardado.getNumeroPedido()));
    }
}

