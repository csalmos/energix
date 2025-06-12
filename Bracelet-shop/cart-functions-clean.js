// Global variables
let cart = [];
let products = {};

// DOM Elements
const cartIcon = document.querySelector('.cart-icon');
const cartOverlay = document.querySelector('.cart-overlay');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.total-amount');
const emptyCart = document.querySelector('.empty-cart');

// Cart Functions
function toggleCart() {
    if (cartOverlay && cartSidebar) {
        cartOverlay.classList.toggle('active');
        cartSidebar.classList.toggle('active');
        document.body.style.overflow = cartOverlay.classList.contains('active') ? 'hidden' : '';
    }
}

function closeCart() {
    if (cartOverlay && cartSidebar) {
        cartOverlay.classList.remove('active');
        cartSidebar.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateCart() {
    if (!cartItemsContainer) return;
    
    // Clear the cart container
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        // Show empty cart message
        if (emptyCart) emptyCart.style.display = 'flex';
        if (cartTotal) cartTotal.textContent = '0 Ft';
        return;
    }
    
    // Hide empty cart message
    if (emptyCart) emptyCart.style.display = 'none';
    
    // Add each item to the cart
    let total = 0;
    cart.forEach((item, index) => {
        const product = products[item.id];
        if (!product) return;
        
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-item-details">
                <h4>${product.name}</h4>
                <p>${product.price.toLocaleString()} Ft</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" data-index="${index}" data-change="-1">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-index="${index}" data-change="1">+</button>
                </div>
            </div>
            <button class="remove-item" data-index="${index}">×</button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Update total
    if (cartTotal) {
        cartTotal.textContent = `${total.toLocaleString()} Ft`;
    }
    
    // Update cart count in header
    updateCartCount();
}

function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    saveCart();
    updateCart();
    showNotification(`${quantity}x ${product.name} added to cart!`);
}

function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        saveCart();
        updateCart();
    }
}

function updateQuantity(index, change) {
    if (index >= 0 && index < cart.length) {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) {
            cart.splice(index, 1);
        }
        saveCart();
        updateCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCart();
        } catch (e) {
            console.error('Error loading cart from localStorage:', e);
            cart = [];
        }
    }
}

function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountBadge = document.querySelector('.cart-count');
    
    if (cartCountBadge) {
        cartCountBadge.textContent = cartCount;
        cartCountBadge.style.display = cartCount > 0 ? 'flex' : 'none';
    }
}

function showNotification(message, duration = 3000) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    if (!notification || !notificationMessage) return;
    
    notificationMessage.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

// Event Listeners
function setupEventListeners() {
    // Cart icon click
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCart();
        });
    }
    
    // Close cart when clicking overlay
    if (cartOverlay) {
        cartOverlay.addEventListener('click', (e) => {
            if (e.target === cartOverlay) {
                closeCart();
            }
        });
    }
    
    // Handle cart item interactions using event delegation
    document.addEventListener('click', (e) => {
        // Quantity controls
        const quantityBtn = e.target.closest('.quantity-btn');
        if (quantityBtn) {
            const index = parseInt(quantityBtn.dataset.index);
            const change = parseInt(quantityBtn.dataset.change);
            updateQuantity(index, change);
            return;
        }
        
        // Remove item
        const removeBtn = e.target.closest('.remove-item');
        if (removeBtn) {
            const index = parseInt(removeBtn.dataset.index);
            removeFromCart(index);
            return;
        }
        
        // Checkout button
        const checkoutBtn = e.target.closest('.checkout-btn');
        if (checkoutBtn) {
            e.preventDefault();
            if (cart.length > 0) {
                // Redirect to checkout page or show checkout form
                console.log('Proceeding to checkout');
            }
            return;
        }
    });
}

// Initialize the application
function init() {
    // Load products data
    if (typeof products === 'object' && Object.keys(products).length > 0) {
        console.log('Products loaded:', Object.keys(products));
    } else {
        console.log('No products data found. Loading from products.js...');
        // Load products from products.js if needed
    }
    
    // Load cart from localStorage
    loadCart();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initial cart update
    updateCart();
}

// Make functions globally available
window.toggleCart = toggleCart;
window.closeCart = closeCart;
window.addToCart = addToCart;
window.updateCart = updateCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.saveCart = saveCart;
window.showNotification = showNotification;

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
