// src/main/java/com/panaderia/backend/dto/EstadoPedidoDTO.java
package com.panaderia.backend.dto;

import java.time.LocalDateTime;

public class EstadoPedidoDTO {
    private String numeroPedido;
    private String estado;
    private String tracking;
    private LocalDateTime fecha;
    private String cliente;
    private String metodoPago;
    private String direccion;
    private String metodoEntrega;

    public String getNumeroPedido() { return numeroPedido; }
    public void setNumeroPedido(String numeroPedido) { this.numeroPedido = numeroPedido; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getTracking() { return tracking; }
    public void setTracking(String tracking) { this.tracking = tracking; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }

    public String getCliente() { return cliente; }
    public void setCliente(String cliente) { this.cliente = cliente; }

    public String getMetodoPago() { return metodoPago; }
    public void setMetodoPago(String metodoPago) { this.metodoPago = metodoPago; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getMetodoEntrega() { return metodoEntrega; }
    public void setMetodoEntrega(String metodoEntrega) { this.metodoEntrega = metodoEntrega; }
}

