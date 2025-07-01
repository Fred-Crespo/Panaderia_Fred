// PedidoRequest.java
package com.panaderia.backend.model;

import java.util.List;

public class PedidoRequest {
    private Long clienteId;
    private double subtotal;
    private double igv;
    private double envio;
    private double total;
    private List<DetallePedidoRequest> items;

    // Getters y setters
    public Long getClienteId() { return clienteId; }
    public void setClienteId(Long clienteId) { this.clienteId = clienteId; }

    public double getSubtotal() { return subtotal; }
    public void setSubtotal(double subtotal) { this.subtotal = subtotal; }

    public double getIgv() { return igv; }
    public void setIgv(double igv) { this.igv = igv; }

    public double getEnvio() { return envio; }
    public void setEnvio(double envio) { this.envio = envio; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public List<DetallePedidoRequest> getItems() { return items; }
    public void setItems(List<DetallePedidoRequest> items) { this.items = items; }
}


