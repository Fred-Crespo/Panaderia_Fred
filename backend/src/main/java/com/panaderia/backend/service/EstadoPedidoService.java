// src/main/java/com/panaderia/backend/service/EstadoPedidoService.java
package com.panaderia.backend.service;

import com.panaderia.backend.dto.EstadoPedidoDTO;
import com.panaderia.backend.model.EstadoPedido;
import com.panaderia.backend.model.Pedido;
import com.panaderia.backend.model.Cliente;
import com.panaderia.backend.repository.EstadoPedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstadoPedidoService {

    @Autowired
    private EstadoPedidoRepository estadoPedidoRepository;

    public EstadoPedidoDTO obtenerEstadoPorNumeroPedido(String numeroPedido) {
        System.out.println("🔍 Buscando estado para pedido: " + numeroPedido);

        EstadoPedido estado = estadoPedidoRepository.findByPedido_NumeroPedido(numeroPedido)
            .orElseThrow(() -> new RuntimeException("❌ No se encontró el pedido con ese número: " + numeroPedido));

        Pedido pedido = estado.getPedido();
        System.out.println("✅ Pedido encontrado: " + pedido.getNumeroPedido());

        EstadoPedidoDTO dto = new EstadoPedidoDTO();
        dto.setNumeroPedido(pedido.getNumeroPedido());
        dto.setEstado(estado.getEstado());
        dto.setTracking(estado.getTracking());
        dto.setFecha(estado.getFecha());

        Cliente cliente = pedido.getCliente();
        if (cliente != null) {
            dto.setCliente(cliente.getNombre());
            dto.setMetodoPago(cliente.getMetodoPago());
            dto.setDireccion(cliente.getDireccion());
            dto.setMetodoEntrega(cliente.getMetodoEntrega());
        } else {
            System.err.println("⚠️ Advertencia: Cliente es null en el pedido");
            dto.setCliente("Cliente no disponible");
            dto.setMetodoPago("-");
            dto.setDireccion("-");
            dto.setMetodoEntrega("-");
        }

        return dto;
    }
}


/*package com.panaderia.backend.service;

import com.panaderia.backend.dto.EstadoPedidoDTO;
import com.panaderia.backend.model.EstadoPedido;
import com.panaderia.backend.model.Pedido;
import com.panaderia.backend.model.Cliente;
import com.panaderia.backend.repository.EstadoPedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstadoPedidoService {

    @Autowired
    private EstadoPedidoRepository estadoPedidoRepository;

    public EstadoPedidoDTO obtenerEstadoPorNumeroPedido(String numeroPedido) {
    System.out.println("🔍 Buscando estado para pedido: " + numeroPedido);

    EstadoPedido estado = estadoPedidoRepository.findByPedido_NumeroPedido(numeroPedido)
        .orElseThrow(() -> new RuntimeException("❌ No se encontró el pedido con ese número: " + numeroPedido));

    Pedido pedido = estado.getPedido();
    System.out.println("✅ Pedido encontrado: " + pedido.getNumeroPedido());

    EstadoPedidoDTO dto = new EstadoPedidoDTO();
    dto.setNumeroPedido(pedido.getNumeroPedido());
    dto.setEstado(estado.getEstado());
    dto.setTracking(estado.getTracking());
    dto.setFecha(estado.getFecha());

    // ⚠️ Protección contra nulls
    Cliente cliente = pedido.getCliente();
    if (cliente != null) {
        dto.setCliente(cliente.getNombre());
        dto.setMetodoPago(cliente.getMetodoPago());
        dto.setDireccion(cliente.getDireccion());
        dto.setMetodoEntrega(cliente.getMetodoEntrega());
    } else {
        System.err.println("⚠️ Advertencia: Cliente es null en el pedido");
        dto.setCliente("Cliente no disponible");
        dto.setMetodoPago("-");
        dto.setDireccion("-");
        dto.setMetodoEntrega("-");
    }

    return dto;
}


}*/

