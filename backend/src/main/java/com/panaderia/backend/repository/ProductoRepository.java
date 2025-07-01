// src/main/java/com/panaderia/backend/repository/ProductoRepository.java
package com.panaderia.backend.repository;

import com.panaderia.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
