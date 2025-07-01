// DetallePedidoRequest.java
package com.panaderia.backend.model;

public class DetallePedidoRequest {
    private String productoNombre;
    private int cantidad;
    private double precioUnitario;

    // Getters y setters
    public String getProductoNombre() { return productoNombre; }
    public void setProductoNombre(String productoNombre) { this.productoNombre = productoNombre; }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }

    public double getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(double precioUnitario) { this.precioUnitario = precioUnitario; }
}


