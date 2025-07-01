document.addEventListener("DOMContentLoaded", function () {
  // Verificar sesión al cargar la página
  checkSession();

  // Elementos del DOM
  const cartIcon = document.querySelector('.cart-icon');
  const cartSidebar = document.getElementById('cart-sidebar');
  const closeCart = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const cartCountElement = document.getElementById('cart-count');
  const checkoutBtn = document.getElementById('checkout-btn');
  const checkoutForm = document.getElementById('checkout-form');
  const backToCartBtn = document.getElementById('back-to-cart');
  const confirmPurchaseBtn = document.getElementById('confirm-purchase');
  const orderSummary = document.getElementById('order-summary');
  const orderItemsContainer = document.getElementById('order-items');
  const orderTotalAmount = document.getElementById('order-total-amount');
  const closeOrderBtn = document.getElementById('close-order');
  const customerForm = document.getElementById('customer-form');
  

  // Carrito (almacenado en memoria)
  let cart = [];

  // Productos disponibles
  const products = [
    { id: 1, name: 'Pan Artesanal', price: 4.00, image: 'img/pan.jpg' },
    { id: 2, name: 'Bizcocho', price: 10.00, image: 'img/bizcocho.jpg' },
    { id: 3, name: 'Pizza Casera', price: 10.00, image: 'img/pizzascaseras.jpg' },
    { id: 4, name: 'Pionono', price: 10.00, image: 'img/pionono.jpg' },
    { id: 5, name: 'Pie de Manzana', price: 10.00, image: 'img/piedemanzana.jpg' },
    { id: 6, name: 'Torta Helada', price: 10.00, image: 'img/tortahelada.jpg' },
    { id: 7, name: 'Pan Integral', price: 5.00, image: 'img/pan-integral.jpg' },
    { id: 8, name: 'Pan de Ajo', price: 6.00, image: 'img/pan-ajo.jpg' },
    { id: 9, name: 'Baguette', price: 7.00, image: 'img/baguette.jpg' },
    { id: 10, name: 'Pan de Centeno', price: 6.50, image: 'img/pan-centeno.jpg' },
    { id: 11, name: 'Pizza Pepperoni', price: 12.00, image: 'img/pizza-pepperoni.jpg' },
    { id: 12, name: 'Pizza Hawaiana', price: 12.00, image: 'img/pizza-hawaiana.jpg' },
    { id: 13, name: 'Pizza Vegetariana', price: 11.00, image: 'img/pizza-vegetariana.jpg' },
    { id: 14, name: 'Pizza Margarita', price: 10.50, image: 'img/pizza-margarita.jpg' },
    { id: 15, name: 'Pionono de Chocolate', price: 12.00, image: 'img/pionono-chocolate.jpg' },
    { id: 16, name: 'Pionono de Frutas', price: 12.00, image: 'img/pionono-frutas.jpg' },
    { id: 17, name: 'Pionono Dulce de Leche', price: 11.00, image: 'img/pionono-dulce-leche.jpg' },
    { id: 18, name: 'Pionono de Crema', price: 10.50, image: 'img/pionono-crema.jpg' },
    { id: 19, name: 'Torta de Chocolate', price: 15.00, image: 'img/torta-chocolate.jpg' },
    { id: 20, name: 'Torta Tres Leches', price: 16.00, image: 'img/torta-tres-leches.jpg' },
    { id: 21, name: 'Torta Red Velvet', price: 18.00, image: 'img/torta-red-velvet.jpg' },
    { id: 22, name: 'Cheesecake', price: 17.00, image: 'img/torta-cheesecake.jpg' },
    { id: 23, name: 'Pie de Cereza', price: 12.00, image: 'img/pie-cereza.jpg' },
    { id: 24, name: 'Pie de Limón', price: 11.00, image: 'img/pie-limon.jpg' },
    { id: 25, name: 'Pie de Calabaza', price: 12.00, image: 'img/pie-calabaza.jpg' },
    { id: 26, name: 'Pie de Queso', price: 13.00, image: 'img/pie-queso.jpg' },
    { id: 27, name: 'Bizcocho de Vainilla', price: 11.00, image: 'img/bizcocho-vainilla.jpg' },
    { id: 28, name: 'Bizcocho de Chocolate', price: 12.00, image: 'img/bizcocho-chocolate.jpg' },
    { id: 29, name: 'Bizcocho de Naranja', price: 11.00, image: 'img/bizcocho-naranja.jpg' },
    { id: 30, name: 'Bizcocho de Coco', price: 12.00, image: 'img/bizcocho-coco.jpg' }
  ];

  // Eventos para abrir/cerrar el carrito
  cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
  });

  closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    checkoutForm.style.display = 'none';
    orderSummary.style.display = 'none';
    document.querySelector('.cart-total').style.display = 'block';
    document.querySelector('.cart-items').style.display = 'block';
  });

  // Evento delegado para botones "Agregar al carrito"
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
      e.preventDefault();
      const card = e.target.closest('.card');
      if (!card.classList.contains('todos')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === id);
        if (product) {
          addToCart(product);
        }
      }
    }
  });

  // Función para agregar producto al carrito
  function addToCart(product) {
    /*checkSession().then(loggedIn => {
      if (!loggedIn) {
        showAuthModal();
        alert('Por favor inicia sesión para agregar productos al carrito');
        return;
      }*/

      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1
        });
      }
      
      updateCart();
      showAddedToCartMessage(product.name);
    }
  

  // Función para mostrar mensaje de producto agregado
  function showAddedToCartMessage(productName) {
    const message = document.createElement('div');
    message.className = 'cart-message';
    message.textContent = `¡${productName} agregado al carrito!`;
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      message.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(message);
      }, 300);
    }, 2000);
  }

  // Función para actualizar el carrito en la UI
  function updateCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
      cartTotalElement.textContent = 'S/0.00';
      cartCountElement.textContent = '0';
      return;
    }
    
    cart.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.className = 'cart-item';
      
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="cart-item-price">S/${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-quantity">
          <button class="decrease-quantity" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="increase-quantity" data-id="${item.id}">+</button>
        </div>
        <span class="cart-item-remove" data-id="${item.id}">×</span>
      `;
      
      cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Agregar eventos a los botones de cantidad y eliminar
    document.querySelectorAll('.decrease-quantity').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.getAttribute('data-id'));
        updateQuantity(productId, -1);
      });
    });
    
    document.querySelectorAll('.increase-quantity').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.getAttribute('data-id'));
        updateQuantity(productId, 1);
      });
    });
    
    document.querySelectorAll('.cart-item-remove').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.getAttribute('data-id'));
        removeFromCart(productId);
      });
    });
    
    // Calcular y mostrar el total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `S/${total.toFixed(2)}`;
    
    // Actualizar contador del carrito
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    cartCountElement.textContent = itemCount;
  }

  // Función para actualizar la cantidad de un producto
  function updateQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
      cart[itemIndex].quantity += change;
      
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
      
      updateCart();
    }
  }

  // Función para eliminar un producto del carrito
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
  }

  // Evento para el botón "Realizar Compra"
  checkoutBtn.addEventListener('click', () => {
    checkSession().then(loggedIn => {
      if (!loggedIn) {
        showAuthModal();
        alert('Por favor inicia sesión para continuar con la compra');
        return;
      }

      if (cart.length === 0) {
        alert('Tu carrito está vacío');
      } else {
        document.querySelector('.cart-total').style.display = 'none';
        document.querySelector('.cart-items').style.display = 'none';
        checkoutForm.style.display = 'block';
      }
    });
  });

  // Evento para volver al carrito desde el formulario
  backToCartBtn.addEventListener('click', () => {
    checkoutForm.style.display = 'none';
    document.querySelector('.cart-total').style.display = 'block';
    document.querySelector('.cart-items').style.display = 'block';
  });

  // Evento para confirmar la compra
  customerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('customer-name').value;
    const address = document.getElementById('customer-address').value;
    const dni = document.getElementById('customer-dni').value;
    
    if (!name || !address || !dni) {
      alert('Por favor complete todos los campos');
      return;
    }
    
    checkoutForm.style.display = 'none';
    orderSummary.style.display = 'block';
    
    orderItemsContainer.innerHTML = '';
    cart.forEach(item => {
      const orderItem = document.createElement('div');
      orderItem.className = 'order-item';
      orderItem.innerHTML = `
        <p>${item.name} x ${item.quantity} - S/${(item.price * item.quantity).toFixed(2)}</p>
      `;
      orderItemsContainer.appendChild(orderItem);
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderTotalAmount.textContent = `S/${total.toFixed(2)}`;
    
    const customerInfo = document.createElement('div');
    customerInfo.className = 'customer-info';
    customerInfo.innerHTML = `
      <h4>Datos del Cliente</h4>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Dirección:</strong> ${address}</p>
      <p><strong>DNI:</strong> ${dni}</p>
      <p><strong>Método de pago:</strong> ${document.querySelector('input[name="payment"]:checked').value === 'tarjeta' ? 'Tarjeta' : 'Efectivo'}</p>
    `;
    orderItemsContainer.appendChild(customerInfo);
  });
  
  // Evento para cerrar el resumen de la orden
  closeOrderBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    orderSummary.style.display = 'none';
    document.querySelector('.cart-total').style.display = 'block';
    document.querySelector('.cart-items').style.display = 'block';
    
    cart = [];
    updateCart();
  });

  // Funciones para manejo de autenticación
  function checkSession() {
    return new Promise((resolve) => {
      // Simulación de verificación de sesión
      // En producción, reemplazar con llamada real al servidor
      const loggedIn = localStorage.getItem('userLoggedIn') === 'true';
      resolve(loggedIn);
    });
  }

  function showUserInfo(user) {
    document.getElementById('user-name').textContent = `Hola, ${user.nombre}`;
    document.getElementById('user-info').style.display = 'block';
    document.querySelector('.cart-icon').style.display = 'flex';
  }

  function showAuthModal() {
    document.getElementById('auth-modal').style.display = 'flex';
  }

  function hideAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
  }

  // Eventos para el modal de autenticación
  document.querySelector('.close-modal')?.addEventListener('click', hideAuthModal);
  document.getElementById('show-register')?.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
  });
  document.getElementById('show-login')?.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
  });

  // Manejo del formulario de login
  document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert('Correo no válido.');
    return;
  }

  if (password.length < 8) {
    alert('Contraseña mínima de 8 caracteres.');
    return;
  }

  localStorage.setItem('userLoggedIn', 'true');
  hideAuthModal();
  checkSession().then(() => {
    showUserInfo({ nombre: 'Usuario Demo' });
  });
  });
  // Manejo del formulario de registro
  document.getElementById('registerForm')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('register-nombre').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const direccion = document.getElementById('register-direccion').value.trim();
  const telefono = document.getElementById('register-telefono').value.trim();
  const dni = document.getElementById('register-dni').value.trim();

  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-z\d@$!%*?&\-_]{8,}$/;
  const telefonoRegex = /^9\d{8}$/;

  if (!soloLetras.test(nombre)) {
    alert('El nombre solo puede contener letras.');
    return;
  }

  if (!emailRegex.test(email)) {
    alert('Por favor, introduce un correo electrónico válido.');
    return;
  }

  if (!passwordRegex.test(password)) {
    alert('La contraseña debe tener mínimo 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.');
    return;
  }

  if (!telefonoRegex.test(telefono)) {
    alert('El teléfono debe comenzar con 9 y tener 9 dígitos.');
    return;
  }

  if (!/^\d{8}$/.test(dni)) {
    alert('El DNI debe tener exactamente 8 dígitos.');
    return;
  }

  // Simulación de registro exitoso
  localStorage.setItem('userLoggedIn', 'true');
  hideAuthModal();
  checkSession().then(() => {
    showUserInfo({ nombre });
  });
  });

  // Cerrar sesión
  document.getElementById('logout-btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('userLoggedIn');
    location.reload();
  });

  // Filtrado de productos por categoría
  const botones = document.querySelectorAll('.tabs button');
  const items = document.querySelectorAll('.gallery .item');

  function mostrarSoloPresentacion() {
    items.forEach(item => {
      if (item.classList.contains('todos')) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Hacer clic en cartas de 'todos' para ir a su categoría
  const presentacionItems = document.querySelectorAll('.item.todos');
  presentacionItems.forEach(item => {
    item.addEventListener('click', () => {
      const categoria = item.dataset.categoria;
      const botonCategoria = document.querySelector(`.tabs button[data-categoria="${categoria}"]`);
      if (botonCategoria) {
        botonCategoria.click();
      }
    });
  });

  // Ejecutar al cargar la página
  mostrarSoloPresentacion();

  // Evento para los botones de categoría
  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const categoria = boton.dataset.categoria.toLowerCase();
  
      botones.forEach(b => b.classList.remove('active'));
      boton.classList.add('active');
  
      if (categoria === 'todos') {
        mostrarSoloPresentacion();
      } else {
        items.forEach(item => {
          if (item.classList.contains(categoria)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      }
    });
  });
});