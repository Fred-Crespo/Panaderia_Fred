package com.panaderia.backend.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "pedidos")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_pedido", unique = true)
    private String numeroPedido;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
@JoinColumn(name = "cliente_id", nullable = false)
private Cliente cliente;


    private double subtotal;
    private double igv;
    private double envio;
    private double total;

    @Column(name = "fecha", insertable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date fecha;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<DetallePedido> detalles = new ArrayList<>();

    // Getters y Setters
    // Setters
public void setCliente(Cliente cliente) {
    this.cliente = cliente;
}

public void setNumeroPedido(String numeroPedido) {
    this.numeroPedido = numeroPedido;
}

public void setSubtotal(double subtotal) {
    this.subtotal = subtotal;
}

public void setIgv(double igv) {
    this.igv = igv;
}

public void setEnvio(double envio) {
    this.envio = envio;
}

public void setTotal(double total) {
    this.total = total;
}

public void setDetalles(List<DetallePedido> detalles) {
    this.detalles = detalles;
}

// (Opcional) Getters si necesitas en el futuro
public Cliente getCliente() {
    return cliente;
}

public String getNumeroPedido() {
    return numeroPedido;
}

public double getSubtotal() {
    return subtotal;
}

public double getIgv() {
    return igv;
}

public double getEnvio() {
    return envio;
}

public double getTotal() {
    return total;
}

public List<DetallePedido> getDetalles() {
    return detalles;
}

}
