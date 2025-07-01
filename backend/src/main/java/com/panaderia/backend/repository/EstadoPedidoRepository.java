package com.panaderia.backend.repository;

import com.panaderia.backend.model.EstadoPedido;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EstadoPedidoRepository extends JpaRepository<EstadoPedido, Long> {

    @EntityGraph(attributePaths = {"pedido", "pedido.cliente"})
    Optional<EstadoPedido> findByPedido_NumeroPedido(String numeroPedido);

}


