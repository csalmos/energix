// Cart functionality
// Using global scope for cart

function getBasePath() {
    return window.location.pathname.includes('blog/') ? '../' : './';
}

// Debug function to log cart state
function logCartState() {
    console.log('=== CART STATE ===');
    console.log('Cart items:', JSON.parse(JSON.stringify(cart)));
    console.log('DOM cart items:', document.querySelectorAll('.cart-item').length);
    console.log('=================');
}

// Cart functions
function toggleCart() {
    console.log('toggleCart called');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartSidebar = document.querySelector('.cart-sidebar');
    
    if (cartOverlay && cartSidebar) {
        const isOpening = !cartOverlay.classList.contains('active');
        cartOverlay.classList.toggle('active');
        cartSidebar.classList.toggle('active');
        document.body.style.overflow = isOpening ? 'hidden' : '';
        
        if (isOpening) {
            console.log('Cart opened');
            logCartState();
        } else {
            console.log('Cart closed');
        }
    } else {
        console.error('Could not find cart overlay or sidebar');
    }
}

function closeCart() {
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartSidebar = document.querySelector('.cart-sidebar');
    
    if (cartOverlay && cartSidebar) {
        cartOverlay.classList.remove('active');
        cartSidebar.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateCart() {
    console.log('=== updateCart called ===');
    // Look for cart items container in both possible locations
    let cartItemsContainer = document.getElementById('order-items') || document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-amount');
    const emptyCart = document.querySelector('.empty-cart');
    
    if (!cartItemsContainer) {
        console.error('Could not find cart items container');
        return;
    }
    
    console.log('Cart items container found');
    
    // Clear the cart container
    console.log('Clearing cart container');
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        console.log('Cart is empty, showing empty message');
        // Show empty cart message
        if (emptyCart) {
            emptyCart.style.display = 'flex';
            console.log('Empty cart message shown');
        }
        if (cartTotal) {
            cartTotal.textContent = '0 Ft';
            console.log('Cart total reset to 0');
        }
        return;
    }
    
    console.log(`Rendering ${cart.length} cart items`);
    
    // Hide empty cart message
    if (emptyCart) {
        emptyCart.style.display = 'none';
        console.log('Hiding empty cart message');
    }
    
    // Add each item to the cart
    let total = 0;
    
    cart.forEach((item, index) => {
        try {
            console.log(`Rendering cart item ${index}:`, item);
            
            // Get the product data
            const product = (item.name && item.price) ? item : 
                          (window.products && window.products[item.id]) || item;
            
            if (!product) {
                console.error('Invalid product data at index', index, ':', item);
                return;
            }
            
            const quantity = parseInt(item.quantity || 1);
            const price = parseFloat(product.price || 0);
            const itemTotal = price * quantity;
            total += itemTotal;
            
            // Create cart item element
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.dataset.index = index;
            
            // Debug logging for product data
            console.log('Product data:', product);
            console.log('Product ID:', product.id);
            
            // Use specific cart/checkout images for each product
            let productImage = getBasePath() + 'assets/placeholder.svg';
            
            // Set the specific cart/checkout image for each product
            if (product.id === 'argentum') {
                productImage = getBasePath() + 'assets/EnergiX/Argentum/Argentum, háttérrel -200w.webp';
            } 
            else if (product.id === 'eter') {
                productImage = getBasePath() + 'assets/EnergiX/Éter/Éter-háttérrel-200w.webp';
            }
            else if (product.id === 'zafir') {
                productImage = getBasePath() + 'assets/EnergiX/Zafír/Zafír_fehér_háttér-200w.webp';
            }
            
            console.log(`Using cart image for ${product.id}: ${productImage}`);
            
            console.log(`Final image path for ${product.id}:`, productImage);
            
            // Create the cart item structure using template literals
            cartItem.innerHTML = `
                <img src="${productImage}" 
                     alt="${product.name || 'Termék'}" 
                     class="cart-item-image"
                     onerror="handleImageError(this, '${product.id}')"
                     onload="console.log('Image loaded successfully:', this.src)"
                     loading="lazy">
                <div class="cart-item-details">
                    <div class="item-name-row">
                        <h4 class="item-name">${product.name || 'Ismeretlen termék'}</h4>
                        <span class="item-price">${price.toLocaleString()} Ft</span>
                    </div>
                    <div class="item-quantity-row">
                        <div class="item-quantity">
                            <button type="button" class="quantity-btn minus" data-index="${index}">-</button>
                            <span class="quantity">${quantity}</span>
                            <button type="button" class="quantity-btn plus" data-index="${index}">+</button>
                        </div>
                        <button type="button" class="remove-item" data-index="${index}" aria-label="Eltávolítás">Eltávolítás</button>
                    </div>
                </div>
            `;
            
            // Add event listeners directly to the buttons
            const minusBtn = cartItem.querySelector('.quantity-btn.minus');
            const plusBtn = cartItem.querySelector('.quantity-btn.plus');
            const removeBtn = cartItem.querySelector('.remove-item');
            
            minusBtn.addEventListener('click', () => updateQuantity(index, -1));
            plusBtn.addEventListener('click', () => updateQuantity(index, 1));
            removeBtn.addEventListener('click', () => removeFromCart(index));
            
            // Add to the container
            cartItemsContainer.appendChild(cartItem);
            console.log(`Cart item ${index} rendered`);
            
        } catch (error) {
            console.error(`Error rendering cart item ${index}:`, error);
        }
    });
    
    // Update total
    if (cartTotal) {
        cartTotal.textContent = `${total.toLocaleString()} Ft`;
    }
    
    // Update cart count at the end of rendering
    updateCartCount();
}

function addToCart(product, quantity = 1) {
    console.group('=== addToCart ===');
    console.log('Adding to cart:', product, 'Quantity:', quantity);
    
    try {
        // Check if cart is already loaded
        if (!cart || !Array.isArray(cart)) {
            cart = JSON.parse(localStorage.getItem('cart')) || [];
        }
        
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            // Update quantity if item exists
            existingItem.quantity = quantity; // Set to the new quantity instead of adding
        } else {
            // Simple and reliable image path handling
            let imagePath = getBasePath() + 'assets/placeholder.svg';
            
            // Try to get the first available image
            if (product.images && Array.isArray(product.images) && product.images.length > 0) {
                const firstImage = product.images[0];
                
                if (typeof firstImage === 'string') {
                    imagePath = firstImage;
                } else if (firstImage.thumbnail) {
                    imagePath = firstImage.thumbnail;
                } else if (firstImage.full) {
                    imagePath = firstImage.full;
                }
            }
            
            // For specific products, use hardcoded paths as fallback
            if (product.id === 'argentum') {
                imagePath = getBasePath() + 'assets/EnergiX/Argentum/Argentum_háttérrel-200w.webp';
            } else if (product.id === 'eter') {
                imagePath = getBasePath() + 'assets/EnergiX/Éter/Éter-háttérrel-200w.webp';
            } else if (product.id === 'zafir') {
                imagePath = getBasePath() + 'assets/EnergiX/Zafír/Zafír_fehér_háttér-200w.webp';
            }

            const newItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: imagePath,  // Use the resolved image path
                mainImage: imagePath,  // Use the same image for both cart and checkout
                quantity: quantity,
                images: product.images // Store all images for reference
            };
            
            console.log('Adding new item to cart:', newItem);
            cart.push(newItem);
        }
        
        // Save and update cart
        saveCart();
        updateCart();
        showNotification(`${quantity}x ${product.name} hozzáadva a kosárhoz!`);
        console.groupEnd();
        return true;
    } catch (error) {
        console.error('Error in addToCart:', error);
        showNotification('Hiba történt a kosárhoz adáskor.');
        console.groupEnd();
        return false;
    }
}

function removeFromCart(index) {
    console.group('=== removeFromCart ===');
    console.log('Attempting to remove item at index:', index);
    console.log('Cart before removal:', JSON.parse(JSON.stringify(cart)));
    
    // Validate index
    if (index < 0 || index >= cart.length) {
        console.error('Invalid index for removal:', index);
        console.groupEnd();
        return;
    }
    
    // Remove the item from the cart
    const removedItem = cart.splice(index, 1)[0];
    console.log('Removed item:', removedItem);
    
    // Save the updated cart
    saveCart();
    
    // Force a complete re-render of the cart
    updateCart();
    
    // Show notification
    showNotification(`${removedItem.name} eltávolítva a kosárból`);
    
    console.log('Cart after removal:', JSON.parse(JSON.stringify(cart)));
    console.groupEnd();
}

function updateQuantity(index, change) {
    console.group('=== Update Quantity ===');
    console.log('Updating quantity for index:', index, 'Change:', change);
    
    // Validate index
    if (isNaN(index) || index < 0 || index >= cart.length) {
        console.error('Invalid index:', index, 'Cart length:', cart.length);
        console.groupEnd();
        return;
    }
    
    const item = cart[index];
    if (!item) {
        console.error('No item found at index:', index);
        console.groupEnd();
        return;
    }
    
    console.log('Current item:', item);
    
    // Ensure quantity is a number
    const currentQuantity = parseInt(item.quantity) || 0;
    const newQuantity = currentQuantity + change;
    
    // Don't allow quantity less than 1
    if (newQuantity < 1) {
        console.log('Quantity would be less than 1, removing item');
        removeFromCart(index);
        console.groupEnd();
        return;
    }
    
    // Update the quantity
    item.quantity = newQuantity;
    
    console.log('Updated item:', item);
    
    try {
        // Save the updated cart
        saveCart();
        console.log('Cart saved successfully');
        
        // Update the quantity display in the UI
        const cartItemElement = document.querySelector(`.cart-item[data-index="${index}"]`);
        if (cartItemElement) {
            const quantityElement = cartItemElement.querySelector('.quantity');
            if (quantityElement) {
                quantityElement.textContent = newQuantity;
                console.log('Updated quantity in UI');
            } else {
                console.warn('Could not find quantity element in cart item');
                // If we can't find the quantity element, update the whole cart
                updateCart();
            }
        } else {
            console.warn('Could not find cart item element, updating whole cart');
            // Update the cart only if we need to
            updateCart();
        }
        
        // Update the cart total and cart count
        updateCartTotal();
        updateCartCount();
        
    } catch (error) {
        console.error('Error updating cart:', error);
        // If there's an error, try to update the whole cart as a fallback
        updateCart();
    }
    
    console.groupEnd();
}

function saveCart() {
    try {
        // Ensure we're saving the current window.cart
        const cartToSave = Array.isArray(window.cart) ? window.cart : [];
        console.log('Saving cart to localStorage:', cartToSave);
        localStorage.setItem('cart', JSON.stringify(cartToSave));
        console.log('Cart saved successfully');
        
        // Update the cart count after saving
        updateCartCount();
    } catch (e) {
        console.error('Error saving cart to localStorage:', e);
    }
}

function loadCart() {
    console.log('Loading cart from localStorage...');
    const savedCart = localStorage.getItem('cart');
    
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            console.log('Cart loaded from localStorage:', cart);
            return cart;
        } catch (error) {
            console.error('Error parsing saved cart:', error);
            cart = [];
            saveCart();
            return cart;
        }
    } else {
        cart = [];
        saveCart();
        return cart;
    }
}

function updateCartCount() {
    console.log('=== updateCartCount called ===');
    
    // Ensure cart is an array before reducing
    const cartArray = Array.isArray(window.cart) ? window.cart : [];
    const cartCount = cartArray.reduce((sum, item) => {
        const quantity = parseInt(item?.quantity || 0);
        return sum + (isNaN(quantity) ? 0 : quantity);
    }, 0);
    
    console.log('Calculated cart count:', cartCount, 'from cart:', cartArray);
    
    // Update all cart count badges on the page
    const cartCountBadges = document.querySelectorAll('.cart-count');
    console.log('Found cart count badges:', cartCountBadges.length);
    
    cartCountBadges.forEach(badge => {
        if (badge) {
            console.log('Updating badge:', badge, 'with count:', cartCount);
            badge.textContent = cartCount;
            badge.style.display = cartCount > 0 ? 'flex' : 'none';
        }
    });
    
    console.log('Cart count updated to:', cartCount);
    return cartCount;
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

// Initialize cart when DOM is loaded
function initCart() {
    // Prevent multiple initializations
    if (window.cartInitialized) {
        console.log('Cart already initialized');
        updateCart(); // Make sure cart is updated even if already initialized
        return;
    }
    window.cartInitialized = true;

    console.log('=== initCart called ===');
    
    // Ensure cart is properly initialized from localStorage
    if (!Array.isArray(window.cart)) {
        try {
            const savedCart = localStorage.getItem('cart');
            window.cart = savedCart ? JSON.parse(savedCart) : [];
            console.log('Cart initialized from localStorage:', window.cart);
        } catch (e) {
            console.error('Error loading cart from localStorage:', e);
            window.cart = [];
        }
    }
    
    // Update the DOM with the current cart state
    updateCart();
    
    // Skip cart UI setup on checkout page
    const isCheckoutPage = window.location.pathname.includes('penztar.html');
    
    if (!isCheckoutPage) {
        // Set up cart icon click handler
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.addEventListener('click', (e) => {
                e.preventDefault();
                toggleCart();
            });
        }
        
        // Close cart when clicking overlay or close button
        const cartOverlay = document.querySelector('.cart-overlay');
        const closeCartBtn = document.querySelector('.close-cart');
        
        if (cartOverlay) {
            cartOverlay.addEventListener('click', (e) => {
                if (e.target === cartOverlay) {
                    closeCart();
                }
            });
        }
        
        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                closeCart();
            });
        }
        
        // Set up cart event listeners
        setupCartEventListeners();
    }
    
    console.log('Cart initialization complete');
    
    // Handle all clicks on the document and delegate to cart items
    function handleDocumentClick(e) {
        // Find the closest button that was clicked
        const button = e.target.closest('button');
        if (!button) return;
        
        // Check if it's a cart-related button
        if (button.classList.contains('close-cart')) {
            console.log('Closing cart');
            e.preventDefault();
            closeCart();
        }
    }
    
    // Add direct event listeners to the cart container
    function setupCartEventListeners() {
        const cartContainer = document.querySelector('.cart-items') || document.querySelector('.cart-sidebar');
        if (!cartContainer) {
            console.log('No cart container found - this is expected on checkout page');
            return;
        }

        // Use event delegation on the document level to handle dynamic content
        document.body.removeEventListener('click', handleDocumentClick);
        document.body.addEventListener('click', handleDocumentClick);
        
        console.log('Cart event listeners set up');
    }
    
    // Set up the event listeners when the cart is updated
    if (!isCheckoutPage) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupCartEventListeners);
        } else {
            setupCartEventListeners();
        }
    }
    
    // Handle checkout button click
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Load cart from localStorage
            cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            if (cart.length === 0) {
                showNotification('A kosár üres. Kérjük, adjon hozzá termékeket a kosarához!');
                return;
            }
            
            // Save cart and redirect to checkout
            saveCart();
            window.location.href = 'penztar.html';
        });
    }
}

// Update the cart total in the UI
function updateCartTotal() {
    console.group('=== updateCartTotal ===');
    
    try {
        // Calculate the total
        const total = cart.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 1;
            return sum + (price * quantity);
        }, 0);
        
        console.log('New cart total:', total);
        
        // Update the total in the UI
        const totalElement = document.querySelector('.total-amount');
        if (totalElement) {
            totalElement.textContent = `${total.toLocaleString()} Ft`;
            console.log('Updated total in UI');
        } else {
            console.warn('Could not find total element');
        }
    } catch (error) {
        console.error('Error updating cart total:', error);
    }
    
    console.groupEnd();
}

// Handle image loading errors
function handleImageError(img, productId) {
    console.error(`Error loading image for product ${productId}:`, img.src);
    
    // Try different fallback approaches
    if (img.src.includes('Zafír') || productId === 'zafir') {
        // Try alternative Zafír image
        if (!img.src.includes('Zafír_fehér_háttér-200w.webp')) {
            console.log('Trying alternative Zafír image...');
            img.src = getBasePath() + 'assets/EnergiX/Zafír/Zafír_fehér_háttér-200w.webp';
            return; // Let the browser try to load the alternative image
        }
    }
    
    // If we get here, use the generic placeholder
    console.log('Using generic placeholder');
    img.src = getBasePath() + 'assets/placeholder.svg';
    img.alt = 'Image not available';
    
    // Prevent infinite error loop
    img.onerror = null;
    
    // Log additional error details
    const errorEvent = new Error('Image load failed');
    console.error('Image error details:', {
        src: img.src,
        productId: productId,
        error: errorEvent.stack
    });
}

// Make cart functions globally available
window.toggleCart = toggleCart;
window.closeCart = closeCart;
window.addToCart = addToCart;
window.handleImageError = handleImageError;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.saveCart = saveCart;
window.loadCart = loadCart;
window.updateCartCount = updateCartCount;
window.showNotification = showNotification;
window.initCart = initCart;
window.updateCartTotal = updateCartTotal;
window.updateCart = updateCart;

// Initialize cart when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCart);
} else {
    initCart();
}
