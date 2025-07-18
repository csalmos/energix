// Cookie helper function
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

document.addEventListener('DOMContentLoaded', function() {
    // Reset viewport on page load
    function resetViewport() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        }
    }
    
    // Run on page load
    resetViewport();
    
    // Reset viewport after navigation if needed
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            resetViewport();
        }
    });
});

// Handle mobile dropdown toggle
document.querySelectorAll('.nav-dropdown > a').forEach((toggle, index) => {
    toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            
            e.preventDefault();
            e.stopPropagation();
            
            const parent = this.parentElement;
            const isActive = parent.classList.contains('active');

            // Set flag before making changes
            isUpdatingClass = true;
            
            try {
                // If clicking the active dropdown, close it
                if (isActive) {
                    parent.classList.remove('active');
                    const arrow = this.querySelector('.fa-chevron-down');
                    if (arrow) arrow.style.transform = '';
                } 
                // If clicking an inactive dropdown, close others and open this one
                else {
                    // Close all other dropdowns
                    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                        if (dropdown !== parent) {
                            dropdown.classList.remove('active');
                            const otherArrow = dropdown.querySelector('.fa-chevron-down');
                            if (otherArrow) otherArrow.style.transform = '';
                        }
                    });
                    
                    // Open current dropdown
                    parent.classList.add('active');
                    const arrow = this.querySelector('.fa-chevron-down');
                    if (arrow) arrow.style.transform = 'rotate(180deg)';
                }
            } finally {
                // Always reset the flag, even if there was an error
                isUpdatingClass = false;
            }
            
            return false;
        }
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (window.innerWidth > 768) return;
    
    if (!e.target.closest('.nav-dropdown')) {
        isUpdatingClass = true;
        try {
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
                const arrow = dropdown.querySelector('.fa-chevron-down');
                if (arrow) arrow.style.transform = '';
            });
        } finally {
            isUpdatingClass = false;
        }
    }
});

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    
    // Check if all required elements exist
    if (!hamburger || !navLinks || !navOverlay) {
        console.warn('Mobile menu elements not found');
        return false;
    }
    
    function toggleMenu(forceClose = false) {
        const isOpen = hamburger.classList.contains('is-active');
        
        console.group('=== TOGGLING MOBILE MENU ===');
        console.log(`Force close: ${forceClose}, Currently open: ${isOpen}`);
        
        if (forceClose || isOpen) {
            console.log('Closing menu and all dropdowns');
            // Close menu and all dropdowns
            hamburger.classList.remove('is-active');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                console.log('Closing dropdown in menu close:', dropdown);
                dropdown.classList.remove('active');
                const arrow = dropdown.querySelector('.fa-chevron-down');
                if (arrow) {
                    console.log('Resetting arrow rotation in menu close');
                    arrow.style.transform = '';
                }
            });
        } else {
            console.log('Opening menu');
            // Open menu
            hamburger.classList.add('is-active');
            navLinks.classList.add('active');
            navOverlay.classList.add('active');
            document.body.classList.add('menu-open');
        }
        console.groupEnd();
    }
    
    // Toggle menu when clicking hamburger
    hamburger.addEventListener('click', (e) => {
        console.log('Hamburger clicked');
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu when clicking overlay
    navOverlay.addEventListener('click', () => {
        console.log('Overlay clicked - forcing menu close');
        toggleMenu(true);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (hamburger.classList.contains('is-active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.hamburger')) {
            console.log('Click outside menu detected - closing menu');
            toggleMenu(true);
        }
    });

    // Close menu when clicking on a navigation link (for single page navigation)
    document.querySelectorAll('.nav-links > li > a:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                // Only close menu if not clicking on a dropdown toggle
                if (!e.target.closest('.nav-dropdown > a')) {
                    console.log('Navigation link clicked - closing menu');
                    toggleMenu(true);
                } else {
                    console.log('Dropdown toggle clicked - keeping menu open');
                }
            }
        });
    });
    
    return true;
}

// Initialize mobile menu when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

// Add mutation observer to track class changes on dropdowns
let isUpdatingClass = false; // Flag to track if we're making changes
const observer = new MutationObserver(function(mutations) {
    // Skip if we're the ones making the changes
    if (isUpdatingClass) return;
    
    mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const target = mutation.target;
            const currentClasses = target.className;
            const oldClasses = mutation.oldValue || '';
            
            // Skip if the class list hasn't actually changed
            if (currentClasses === oldClasses) return;
            
            console.group('=== CLASS CHANGE DETECTED ===');
            console.log('Element:', target);
            console.log('Old value:', oldClasses);
            console.log('New class list:', currentClasses);
            console.log('Active class present:', target.classList.contains('active'));
            console.groupEnd();
        }
    });
});

// Start observing all dropdowns
document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    observer.observe(dropdown, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ['class'],
        subtree: false
    });
});

// Function to update active link based on scroll position
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 100)) {
            current = '#' + section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
}

// Initialize homepage
function initializeHomePage() {
    
    // Initialize interactive features
    if (typeof initInteractiveFeatures === 'function') {
        initInteractiveFeatures();
    } else {
        console.error('initInteractiveFeatures function not found');
    }
    
    // Add any other homepage-specific initializations here
}

// Auto-initialize based on page
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    
    // Check for product page (both old and new formats)
    if (path.includes('product.html') || path.startsWith('/termek/')) {
        // Extract product ID from URL
        let productId;
        
        if (path.startsWith('/termek/')) {
            // New URL format: /termek/eter
            productId = path.split('/').pop();
        } else if (['/eter.html', '/argentum.html', '/zafir.html'].includes(path)) {
            // Old URL format: product.html?product=eter
            productId = path.substring(1);
        } else {
            // Old format: product.html?product=eter
            productId = searchParams.get('product');
        }
        
        if (productId) {
            initProductPage(productId);
        } else {
            console.error('No product ID found in URL');
            window.location.href = '/';
        }
    } 
    // Check for homepage
    else if (path.endsWith('index.html') || 
             path.endsWith('/') || 
             path === '' ||
             path === '/fooldal') {
        initializeHomePage();
    }
});

// Initialize product page
function initProductPage(productId) {

    // Get the product from data using find instead of direct access
    const product = window.products[productId];

    // Set product details
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productPrice').textContent = `${product.price.toLocaleString()} Ft`;
    document.getElementById('productReview').textContent = product.review;
    document.querySelector('.description p').textContent = product.description;
    document.getElementById('productFullDescription').innerHTML = product.fullDescription;
    
    // Set specifications
    document.getElementById('material').textContent = product.specs.material;
    document.getElementById('size').textContent = product.specs.size;
    document.getElementById('weight').textContent = product.specs.weight;
    document.getElementById('color').textContent = product.specs.color;
    if (product.specs.waterResistance) {
        document.getElementById('waterResistance').textContent = product.specs.waterResistance;
    }
    
    // Set main image
    const mainImage = document.getElementById('productImage');
    if (mainImage && product.images && product.images.length > 0) {
        // Set first image as main
        mainImage.src = product.images[0].full || '/assets/placeholder.svg';
        mainImage.alt = product.name;
        mainImage.dataset.full = product.images[0].full; // Store full size URL
        
        // Add error handling
        mainImage.onerror = function() {
            console.error('Failed to load main image:', this.src);
            this.src = '/assets/placeholder.svg';
        };
    }
    
    // Set thumbnails
    const thumbnails = document.getElementById('productThumbnails');
    if (thumbnails && product.images && product.images.length > 0) {
        thumbnails.innerHTML = '';
        
        // Create thumbnails for each image
        product.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            
            // Create image element with both thumbnail and full-size sources
            const img = document.createElement('img');
            img.src = image.thumbnail || '/assets/placeholder.svg';
            img.alt = `${product.name} kép ${index + 1}`;
            img.dataset.full = image.full || img.src; // Store full-size URL
            
            // Add click handler to set main image
            img.addEventListener('click', function() {
                const mainImage = document.getElementById('productImage');
                mainImage.src = this.dataset.full;
                mainImage.alt = this.alt;
                
                // Update active thumbnail
                document.querySelectorAll('.thumbnail').forEach(thumb => {
                    thumb.classList.remove('active');
                });
                this.parentElement.classList.add('active');
                
                // Add fade effect
                mainImage.style.opacity = 0;
                setTimeout(() => {
                    mainImage.style.opacity = 1;
                }, 100);
            });
            
            // Add error handling
            img.onerror = function() {
                console.error('Failed to load thumbnail:', this.src);
                this.src = '/assets/placeholder.svg';
            };
            
            thumbnail.appendChild(img);
            thumbnails.appendChild(thumbnail);
        });
    }
    
    // Update interactive feature image based on product
    const featureImage = document.querySelector('.featured-image');
    if (featureImage) {
        let imagePath = '';
        let altText = '';
        
        switch(productId) {
            case 'argentum':
                imagePath = 'assets/EnergiX/Argentum/Argentum-háttérrel-1000w.webp';
                altText = 'Argentum karkötő részletes nézet';
                break;
            case 'eter':
                imagePath = 'assets/EnergiX/Eter/Éter-háttérrel-1200w.webp';
                altText = 'Éter karkötő részletes nézet';
                break;
            case 'zafir':
                imagePath = 'assets/EnergiX/Zafir/Zafír_fehér_háttér-700w.webp';
                altText = 'Zafír karkötő részletes nézet';
                break;
        }
        
        if (imagePath) {
            featureImage.src = imagePath;
            featureImage.alt = altText;
            
            // Add error handling
            featureImage.onerror = function() {
                console.error('Failed to load feature image:', this.src);
                this.src = '/assets/placeholder.svg';
            };
        }
    }
    
    // Initialize quantity controls
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.getElementById('quantity');
    const addToCartBtn = document.getElementById('addToCart');
    
    if (minusBtn && plusBtn && quantityInput && addToCartBtn) {
        // Only set up event listeners if they don't exist
        const minusListener = minusBtn.getAttribute('data-has-listener');
        const plusListener = plusBtn.getAttribute('data-has-listener');
        const inputListener = quantityInput.getAttribute('data-has-listener');
        const addListener = addToCartBtn.getAttribute('data-has-listener');

        if (!minusListener) {
            minusBtn.addEventListener('click', () => {
                let value = parseInt(quantityInput.value) || 1;
                if (value > 1) {
                    value--;
                }
                quantityInput.value = value;
            });
            minusBtn.setAttribute('data-has-listener', 'true');
        }

        if (!plusListener) {
            plusBtn.addEventListener('click', () => {
                let value = parseInt(quantityInput.value) || 1;
                value++;
                quantityInput.value = value;
            });
            plusBtn.setAttribute('data-has-listener', 'true');
        }

        if (!inputListener) {
            quantityInput.addEventListener('input', () => {
                let value = parseInt(quantityInput.value) || 1;
                if (value < 1) value = 1;
                quantityInput.value = value;
            });
            quantityInput.setAttribute('data-has-listener', 'true');
        }

        if (!addListener) {
            // Add to cart button handler
            const addToCartHandler = (redirectToCheckout = false) => {
                const quantity = parseInt(quantityInput.value) || 1;
                const product = window.products[productId];
                
                if (product) {
                    addToCart(product, quantity);
                    console.log(redirectToCheckout 
                        ? 'Tovább a fizetéshez...' 
                        : `${quantity}x ${product.name} hozzáadva a kosárhoz!`);
                    
                    if (redirectToCheckout) {
                        // Small delay to show the notification before redirecting
                        setTimeout(() => {
                            window.location.href = '/penztar';
                        }, 800);
                    }
                } else {
                    console.error('Product not found:', productId);
                }
            };

            // Add event listener for Add to Cart button
            addToCartBtn.addEventListener('click', () => addToCartHandler(false));
            addToCartBtn.setAttribute('data-has-listener', 'true');
            
            // Add event listener for Buy Now button if it exists
            const buyNowBtn = document.getElementById('buyNow');
            if (buyNowBtn) {
                buyNowBtn.addEventListener('click', () => addToCartHandler(true));
            }
            
            // Add event listener for Feature Buy Now button if it exists
            const featureBuyNowBtn = document.getElementById('featureBuyNow');
            if (featureBuyNowBtn) {
                featureBuyNowBtn.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    addToCartHandler(true);
                });
            }
            
            // Add event listener for Section Buy Now button if it exists
            const sectionBuyNowBtn = document.getElementById('sectionBuyNow');
            if (sectionBuyNowBtn) {
                sectionBuyNowBtn.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    addToCartHandler(true);
                });
            }
        }
    }

    // Initialize interactive features (feature dots, etc.)
    if (typeof initInteractiveFeatures === 'function') {
        initInteractiveFeatures();
    } else {
        console.error('initInteractiveFeatures function not found');
    }
    
    // Load related products after a short delay to ensure DOM is ready
    setTimeout(() => {
        if (typeof loadRelatedProducts === 'function') {
            loadRelatedProducts(productId);
        } else {
            console.error('loadRelatedProducts function not found');
        }
    }, 100);

    initializeProductReviews(product);
}

// Keep track of the last click time to prevent rapid multiple clicks
let lastClickTime = 0;
const CLICK_DELAY = 1000; // 1 second delay between clicks

function addToCart(product, quantity = 1, redirectToCheckout = false, event = null) {
    // Prevent default form submission if event is provided
    if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }

    // Prevent rapid multiple clicks
    const now = Date.now();
    if (now - lastClickTime < CLICK_DELAY) {
        console.log('Please wait before adding again');
        return;
    }
    lastClickTime = now;

    // Disable the button to prevent multiple clicks
    const button = event ? event.currentTarget : null;
    if (button) {
        button.disabled = true;
        const originalText = button.textContent;
        button.textContent = 'Hozzáadás...';
        button.style.opacity = '0.7';
        button.style.cursor = 'wait';
    }

    // Rest of your existing addToCart function
    if (typeof window.Snipcart === 'undefined') {
        console.error('Snipcart is not loaded');
        if (button) {
            button.disabled = false;
            button.textContent = originalText;
            button.style.opacity = '';
            button.style.cursor = '';
        }
        return;
    }

    // Ensure quantity is a number
    quantity = parseInt(quantity, 10) || 1;
    
    // Create a unique ID for the cart item
    const uniqueId = `${product.id}-${Date.now()}`;
    
    // Prepare the item data
    const itemData = {
        id: uniqueId,
        name: product.name,
        price: parseFloat(product.price),
        quantity: quantity,
        url: window.location.href,
        description: product.description || '',
        metadata: {
            productId: String(product.id),
            sku: String(product.id),
        }
    };

    // Add image if available
    if (product.images?.[0]?.full || product.image) {
        itemData.image = product.images?.[0]?.full || product.image;
    }

    // Use Snipcart's built-in method for adding items
    try {
        // Get the current cart state safely
        const cart = window.Snipcart.store.getState().cart;
        const cartItems = Array.isArray(cart.items) ? cart.items : [];
        
        // Check if the product is already in the cart
        const existingItem = cartItems.find(item => 
            item.metadata && item.metadata.productId === String(product.id)
        );

        const resetButton = () => {
            if (button) {
                button.disabled = false;
                button.textContent = originalText;
                button.style.opacity = '';
                button.style.cursor = '';
            }
        };

        if (existingItem && existingItem.uniqueId) {
            // If item exists, update the quantity
            window.Snipcart.api.cart.items.update(existingItem.uniqueId, {
                quantity: (parseInt(existingItem.quantity, 10) || 0) + quantity
            }).then(() => {
                console.log('Item quantity updated in cart');
                if (redirectToCheckout) {
                    window.Snipcart.api.cart.checkout();
                }
                resetButton();
            }).catch(error => {
                console.error('Error updating cart item:', error);
                resetButton();
            });
        } else {
            // If item doesn't exist, add it as a new item
            window.Snipcart.api.cart.items.add(itemData)
                .then(() => {
                    console.log('Item added to cart');
                    if (redirectToCheckout) {
                        window.Snipcart.api.cart.checkout();
                    }
                    resetButton();
                })
                .catch(error => {
                    console.error('Error adding to cart:', error);
                    resetButton();
                });
        }
    } catch (error) {
        console.error('Error in addToCart:', error);
        if (button) {
            button.disabled = false;
            button.textContent = originalText;
            button.style.opacity = '';
            button.style.cursor = '';
        }
    }
}

// Helper function to add a new item to the cart
function addNewItemToCart(itemData, redirectToCheckout) {
    window.Snipcart.api.cart.items.add(itemData)
        .then(() => {
            console.log('Item added to cart');
            if (redirectToCheckout) {
                window.Snipcart.api.cart.checkout();
            }
        })
        .catch(error => {
            console.error('Error adding to cart:', error);
        });
}

// Initialize scroll animation for feature points and texts using Intersection Observer
function initScrollAnimation() {
    const featureDots = document.querySelectorAll('.feature-dot');
    const featureTexts = document.querySelectorAll('.feature-text');
    
    if (featureDots.length === 0) {
        return; // No feature dots to animate
    }
    
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported, falling back to scroll events');
        initFallbackScrollAnimation();
        return;
    }
    
    // Set up Intersection Observer for feature dots (only controls dot visibility)
    const dotObserver = new IntersectionObserver((entries, observer) => {
        if (window.innerWidth <= 768) return;
        entries.forEach(entry => {
            const dot = entry.target;
            if (entry.isIntersecting) {
                dot.classList.add('visible');
            } else {
                dot.classList.remove('visible');
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    // Observe all feature dots
    featureDots.forEach(dot => dotObserver.observe(dot));

    // Set up Intersection Observer for text fields
    const textObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const text = entry.target;
            if (entry.isIntersecting) {
                text.classList.add('visible');
            } else {
                text.classList.remove('visible');
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    // Observe all text fields
    featureTexts.forEach(text => textObserver.observe(text));
    
    // Fallback for older browsers
    function initFallbackScrollAnimation() {
        
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight * 0.9) &&
                rect.bottom >= (window.innerHeight * 0.1)
            );
        }
        
        function checkVisibility() {
            // Only check dots in fallback mode
            featureDots.forEach(dot => {
                if (isInViewport(dot)) {
                    dot.classList.add('visible');
                }
            });
        }
        
        window.addEventListener('scroll', checkVisibility, { passive: true });
        window.addEventListener('resize', checkVisibility, { passive: true });
        window.addEventListener('load', checkVisibility);
        
        // Initial check
        setTimeout(checkVisibility, 300);
    }
    
    // Expose for manual triggering if needed
    window.triggerScrollCheck = () => {
        featureDots.forEach((dot, index) => {
            const rect = dot.getBoundingClientRect();
            const featureId = dot.dataset.feature;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                dot.classList.add('visible');
            }
        });
    };
    
    // Set staggered delays for text fields
    document.querySelectorAll('.image-text-field').forEach((text, index) => {
        text.style.transitionDelay = `${index * 0.15}s`;
    });
}

// Initialize interactive features
function initInteractiveFeatures() {
    // Set up product-specific feature dot positions
    setupFeatureDotPositions();
    
    // Wait for the next tick to ensure DOM is ready
    setTimeout(() => {
        // Initialize scroll animations
        initScrollAnimation();
        
        // Add hover and click effects for feature dots
        const featureDots = document.querySelectorAll('.feature-dot');
        
        // Function to deactivate all feature dots
        function deactivateAllDots() {
            document.querySelectorAll('.feature-dot').forEach(dot => {
                dot.classList.remove('active');
            });
        }
        
        featureDots.forEach((dot, index) => {
            const label = dot.querySelector('.feature-label');
            if (!label) {
                console.warn(`No label found for dot ${index + 1}`);
                return;
            }
            
            dot.addEventListener('mouseenter', () => {
                label.style.opacity = '1';
            });
            
            dot.addEventListener('mouseleave', () => {
                label.style.opacity = '0.9';
            });
            
            // Click handler
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Toggle active state
                const isActive = dot.classList.contains('active');
                deactivateAllDots();
                
                if (!isActive) {
                    dot.classList.add('active');
                    
                    // Auto-hide after 3 seconds
                    setTimeout(() => {
                        dot.classList.remove('active');
                    }, 3000);
                }
            });
        });
        
        // Click outside to deactivate
        document.addEventListener('click', () => {
            deactivateAllDots();
        });
        
        // Prevent closing when clicking on labels or lines
        document.querySelectorAll('.feature-label, .feature-line').forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
        
        // Manually trigger a scroll check after a short delay
        setTimeout(() => {
            if (window.triggerScrollCheck && typeof window.triggerScrollCheck === 'function') {
                window.triggerScrollCheck();
            }
        }, 1000);
    }, 100);
}

// Set up product-specific feature dot positions and labels
function setupFeatureDotPositions() {
    if (window.featureDotsInitialized) {
        return;
    }

    const featureDots = document.querySelectorAll('.feature-dot');
    if (!featureDots.length) return;

    featureDots.forEach(dot => {
        try {
            const line = dot.querySelector('.feature-line');
            const label = dot.querySelector('.feature-label');
            
            // Make sure the dot is visible
            // Make dot visible
            dot.style.opacity = '1';
            dot.style.visibility = 'visible';
            dot.classList.add('visible');
            
            // Initialize line if it exists
            if (line) {
                // Get line length from inline style or use default
                let lineLength = line.style.getPropertyValue('--line-length') || '80';
                // Remove 'px' if present
                lineLength = lineLength.replace('px', '').trim();
                
                // Set base line styles
                line.style.position = 'absolute';
                line.style.backgroundColor = '#7ed957';
                line.style.opacity = '1';
                
                // Set line direction and position based on class
                if (line.classList.contains('line-right')) {
                    line.style.left = '100%';
                    line.style.width = `${lineLength}px`;
                    line.style.transform = 'translateY(-50%)';
                    line.style.top = '50%';
                    line.style.height = '2px';
                } 
                else if (line.classList.contains('line-left')) {
                    line.style.right = '100%';
                    line.style.width = `${lineLength}px`;
                    line.style.transform = 'translateY(-50%)';
                    line.style.top = '50%';
                    line.style.height = '2px';
                }
                else if (line.classList.contains('line-top') || line.classList.contains('line-up')) {
                    line.style.left = '50%';
                    line.style.bottom = '100%';
                    line.style.height = `${lineLength}px`;
                    line.style.width = '2px';
                    line.style.transform = 'translateX(-50%)';
                }
                else if (line.classList.contains('line-bottom') || line.classList.contains('line-down')) {
                    line.style.left = '50%';
                    line.style.top = '100%';
                    line.style.height = `${lineLength}px`;
                    line.style.width = '2px';
                    line.style.transform = 'translateX(-50%)';
                }
            }
            
            // Style the label if it exists
            if (label) {
                // If this is the material feature, update the label text
                const featureType = dot.getAttribute('data-feature');
                if (featureType === 'material' && product && product.material) {
                    label.textContent = product.material;
                }

                const direction = dot.getAttribute('data-direction') || 'right';
                label.classList.remove('label-right', 'label-left', 'label-top', 'label-bottom');
                label.classList.add(`label-${direction}`);
            }
            
            // Add hover effects
            dot.addEventListener('mouseenter', () => {
                dot.classList.add('active');
                if (label) label.style.opacity = '1';
                if (line) line.style.opacity = '0.8';
            });
            
            dot.addEventListener('mouseleave', () => {
                dot.classList.remove('active');
                if (label) label.style.opacity = '0';
                if (line) line.style.opacity = '1';
            });
            
        } catch (e) {
            console.error('Error initializing feature dot:', e);
        }
    });
    
    window.featureDotsInitialized = true;
}

// Initialize feature dots when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupFeatureDotPositions();
    
    // Re-initialize on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setupFeatureDotPositions, 250);
    });
});

// Also try to initialize immediately in case the DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(setupFeatureDotPositions, 0);
}

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length === 0) {
        console.warn('No FAQ items found!');
        return;
    }

    // Clean up any existing event listeners first
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            // Clone the element to remove all event listeners
            const newQuestion = question.cloneNode(true);
            question.parentNode.replaceChild(newQuestion, question);
        }
    });

    // Now initialize with clean elements
    document.querySelectorAll('.faq-item').forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) {
            console.warn('FAQ item is missing question or answer element', { item, index });
            return;
        }

        // Set ARIA attributes
        const id = `faq-${index}`;
        const buttonId = `faq-button-${index}`;
        
        question.id = buttonId;
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', id);
        question.setAttribute('role', 'button');
        question.setAttribute('tabindex', '0');
        
        answer.id = id;
        answer.setAttribute('aria-labelledby', buttonId);
        answer.setAttribute('aria-hidden', 'true');

        // Start with answer hidden using max-height and opacity
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
        answer.style.padding = '0 20px';

        // Click handler
        const handleClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isExpanding = !item.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    
                    otherItem.classList.remove('active');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.opacity = '0';
                        otherAnswer.style.padding = '0 20px';
                        otherAnswer.setAttribute('aria-hidden', 'true');
                    }
                    if (otherQuestion) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            // Toggle current item
            const isActive = !item.classList.contains('active');
            item.classList.toggle('active');
            
            if (isActive) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                answer.style.padding = '0 20px 20px';
                answer.setAttribute('aria-hidden', 'false');
                question.setAttribute('aria-expanded', 'true');
            } else {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                answer.style.padding = '0 20px';
                answer.setAttribute('aria-hidden', 'true');
                question.setAttribute('aria-expanded', 'false');
            }
        };

        // Add event listeners
        question.addEventListener('click', handleClick);
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick(e);
            }
        });
    });
}

// Gallery navigation
function initGalleryNavigation() {
    const mainImage = document.getElementById('productImage');
    const mainContainer = document.getElementById('mainImageContainer');
    let thumbnails = document.querySelectorAll('.thumbnail');
    let currentIndex = 0;
    
    // If main container or main image doesn't exist, exit the function
    if (!mainContainer || !mainImage) {
        return;
    }
    
    // If no thumbnails found, try again after a short delay
    if (thumbnails.length === 0) {
        setTimeout(() => {
            thumbnails = document.querySelectorAll('.thumbnail');
            if (thumbnails.length > 0) {
                updateMainImage(0);
            }
        }, 500);
    }

    // Function to update main image
    function updateMainImage(index) {
        if (!thumbnails.length) return;
        
        // Ensure index is within bounds
        currentIndex = (index + thumbnails.length) % thumbnails.length;
        
        // Get the image source from the thumbnail
        const thumbnail = thumbnails[currentIndex];
        const imgElement = thumbnail.querySelector('img');
        if (!imgElement) return;
        
        const newSrc = imgElement.getAttribute('data-full') || imgElement.src;
        const newAlt = imgElement.alt || `Product image ${currentIndex + 1}`;
        
        // Update main image with fade effect
        mainImage.style.opacity = 0;
        setTimeout(() => {
            mainImage.src = newSrc;
            mainImage.alt = newAlt;
            mainImage.style.opacity = 1;
            
            // Update active thumbnail
            thumbnails.forEach((t, i) => {
                t.classList.toggle('active', i === currentIndex);
            });
        }, 200);
    }

    // Handle click on thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', (e) => {
            e.stopPropagation();
            updateMainImage(index);
        });
    });

    // Handle click on main image for navigation
    mainContainer.addEventListener('click', (e) => {
        const rect = mainContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const containerWidth = rect.width;
        
        // If click is on the left 40%
        if (clickX < containerWidth * 0.4) {
            updateMainImage(currentIndex - 1);
        } 
        // If click is on the right 40%
        else if (clickX > containerWidth * 0.6) {
            updateMainImage(currentIndex + 1);
        }
    });

    // Update cursor based on mouse position
    mainContainer.addEventListener('mousemove', (e) => {
        const rect = mainContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const containerWidth = rect.width;
        
        // Reset classes
        mainContainer.classList.remove('nav-left', 'nav-right', 'nav-both');
        
        // Update cursor based on position
        if (thumbnails.length > 1) {
            if (clickX < containerWidth * 0.4) {
                mainContainer.classList.add('nav-left');
            } else if (clickX > containerWidth * 0.6) {
                mainContainer.classList.add('nav-right');
            } else {
                mainContainer.classList.add('nav-both');
            }
        }
    });

    // Initialize first image
    if (thumbnails.length > 0) {
        updateMainImage(0);
    }
}

// Initialize the page when DOM is fully loaded
function initializePage() {
    // Only initialize product page if we're on a product page
    const isOldProductPage = window.location.pathname.includes('product.html');
    const isNewProductPage = ['/eter.html', '/argentum.html', '/zafir.html'].includes(window.location.pathname);
        
        if (isOldProductPage || isNewProductPage) {
            let productId;

            if (isOldProductPage) {
                // Handle old URL structure: product.html?product=xyz
                const urlParams = new URLSearchParams(window.location.search);
                productId = urlParams.get('product');
            } else {
                // Handle new URL structure: /eter, /argentum, /zafir
                productId = window.location.pathname.replace(/\//g, '');
            }

            if (productId) {
                if (!window.products[productId]) {
                    console.error('Product not found in window.products:', productId);
                    return;
                }
                
                if (typeof initProductPage === 'function') {
                    initProductPage(productId);
                }
            
                if (typeof loadRelatedProducts === 'function') {
                    loadRelatedProducts(productId);
                }
            } else {
                console.error('No product ID found in URL');
            }
        }
    
    // Initialize tabs if they exist on the page
    if (typeof initTabs === 'function') {
        initTabs();
    }
    
    // Initialize FAQ functionality if FAQ section exists
    if ((document.querySelector('.faq-container') || document.querySelector('.faq-item')) && typeof initFAQ === 'function') {
        initFAQ();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializePage();
        if (typeof setupEventListeners === 'function') {
            setupEventListeners();
        }
        if (typeof initGalleryNavigation === 'function') {
            setTimeout(initGalleryNavigation, 300);
        }
        if (typeof setupFeatureTextFields === 'function') {
            setupFeatureTextFields();
        }
    });
} else {
    initializePage();
    if (typeof setupEventListeners === 'function') {
        setupEventListeners();
    }
    if (typeof initGalleryNavigation === 'function') {
        setTimeout(initGalleryNavigation, 300);
    }
    if (typeof setupFeatureTextFields === 'function') {
        setupFeatureTextFields();
    }
}

// Switch main image when clicking on thumbnail
function setMainImage(imageSrc) {
    const mainImage = document.getElementById('productImage');
    if (!mainImage || !imageSrc) return;

    // Store the current scroll position
    const scrollPosition = window.scrollY;
    
    // Add loading class for better UX
    mainImage.classList.add('loading');
    
    // Create a new image to preload the full-size version
    const img = new Image();
    
    img.onload = function() {
        // Update the main image source
        mainImage.src = imageSrc;
        mainImage.style.opacity = 0;
        
        // Fade in the new image
        setTimeout(() => {
            mainImage.style.opacity = 1;
            mainImage.classList.remove('loading');
            
            // Restore scroll position (in case the image size changed)
            window.scrollTo(0, scrollPosition);
        }, 100);
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            if (thumb.dataset.image === imageSrc) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    };
    
    // Handle image loading errors
    img.onerror = function() {
        console.error('Failed to load full-size image:', imageSrc);
        mainImage.src = 'assets/placeholder.svg';
        mainImage.classList.remove('loading');
    };
    
    // Start loading the image
    img.src = imageSrc;
}

// Initialize tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    function switchTab(tabId) {
        
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            }
        });
        
        tabPanes.forEach(pane => {
            if (pane.id === tabId) {
                pane.style.display = 'block';
                pane.classList.add('active');
                void pane.offsetWidth;
                pane.style.opacity = '1';
            } else {
                pane.style.opacity = '0';
                setTimeout(() => {
                    pane.style.display = 'none';
                    pane.classList.remove('active');
                }, 150);
            }
        });
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        const tabId = activeTab.getAttribute('data-tab');
        switchTab(tabId);
    } else if (tabButtons.length > 0) {
        switchTab(tabButtons[0].getAttribute('data-tab'));
    }
}

// Load related products (További Termékeink)
function loadRelatedProducts(currentProductId) {
    
    // Look for the section by ID instead of class
    const relatedSection = document.getElementById('related-products');
    
    if (!relatedSection) return;
    
    // Update section title - now looking for h2 inside the container
    const titleElement = relatedSection.querySelector('.container h2');
    if (titleElement) {
        titleElement.textContent = 'További Termékeink';
    }
    
    const relatedProductsContainer = relatedSection.querySelector('.related-products-grid');
    
    if (!relatedProductsContainer) return;
    
    // Clear any existing content
    relatedProductsContainer.innerHTML = '';
    
    // Define related products data with the new URL structure
    const relatedProducts = [
        {
            id: 'argentum',
            url: 'argentum',
            name: 'Argentum Karkötő',
            price: 27400,
            salePrice: 19180,
            image: 'assets/EnergiX/Argentum/Argentum-1200w.webp',
            description: 'Prémium ezüst karkötő mágneses hatással'
        },
        {
            id: 'zafir',
            url: 'zafir',
            name: 'Zafír Karkötő',
            price: 25200,
            salePrice: 17640,
            image: 'assets/EnergiX/Zafir/IMG_0455-1200w.webp',
            description: 'Prémium kék színezésű karkötő mágneses hatással'
        },
        {
            id: 'eter',
            url: 'eter',
            name: 'Éter Karkötő',
            price: 31500,
            salePrice: 22050,
            image: 'assets/EnergiX/Eter/Aether-1200w.webp',
            description: 'Prémium réz karkötő mágneses hatással',
            isBestseller: true
        }
    ];
    
    // Filter out current product and select 2 random related products
    const filteredProducts = relatedProducts.filter(product => product.id !== currentProductId);
    
    const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random());
    const selectedProducts = shuffled.slice(0, 2);
    
    selectedProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'related-product';
        
        // Create a link for the product image and title
        const productLink = document.createElement('a');
        productLink.href = product.url;
        productLink.className = 'product-link';
        
        productLink.innerHTML = `
            <div class="related-product-image" style="background-image: url('${product.image}')"></div>
            <div class="related-product-content">
                <h3>${product.name}</h3>
                <div class="price">${product.price.toLocaleString()} Ft</div>
            </div>
        `;
        
        // Create a separate button for "Tovább a termékre"
        const viewButton = document.createElement('a');
        viewButton.href = product.url;
        viewButton.className = 'btn-view-product';
        viewButton.textContent = 'Tovább a termékre';
        
        productElement.appendChild(productLink);
        productElement.appendChild(viewButton);
        
        relatedProductsContainer.appendChild(productElement);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Don't prevent default for cart link
            if (this.closest('.nav-links') && this.getAttribute('href') === '#cart') {
                e.preventDefault();
                return;
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#cart') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 80 && pageYOffset < sectionTop + sectionHeight - 80) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Initial update
    updateActiveLink();
}

// Blog Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.blog-carousel');
    const grid = document.querySelector('.blog-grid');
    const prevBtn = carousel?.querySelector('.prev-arrow');
    const nextBtn = carousel?.querySelector('.next-arrow');
    const cards = Array.from(document.querySelectorAll('.blog-card'));

    if (!carousel || !grid || !prevBtn || !nextBtn) {
        return;
    }
    
    let currentIndex = 0;
    let cardWidth = 0;
    let cardsToShow = 3;
    const gap = 20;
    let touchStartX = 0;
    let touchEndX = 0;

    // Érintéskezelés hozzáadása
    grid.addEventListener('touchstart', handleTouchStart, { passive: true });
    grid.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Érintés kezdete
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    // Érintés vége
    function handleTouchEnd(e) {
        if (window.innerWidth > 768) return; // Csak mobilnézetben használjuk az érintést
        
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }

    // Csúszás kezelése
    function handleSwipe() {
        const swipeThreshold = 50; // Minimális csúszási távolság pixelben
        
        // Balra csúsztatás (következő dia)
        if (touchStartX - touchEndX > swipeThreshold) {
            nextSlide();
        }
        
        // Jobbra csúsztatás (előző dia)
        if (touchEndX - touchStartX > swipeThreshold) {
            prevSlide();
        }
    }

    // Set initial styles
    grid.style.display = 'flex';
    grid.style.transition = 'transform 0.5s ease';
    grid.style.width = '100%';
    
    // Calculate how many cards to show based on screen width
    function updateCardsToShow() {
        cardsToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
        return cardsToShow;
    }
    
    // Initialize the carousel
    function initCarousel() {
        updateCardsToShow();
        const containerWidth = carousel.offsetWidth - 160; // Account for padding
        cardWidth = (containerWidth / cardsToShow) - (gap * (cardsToShow - 1) / cardsToShow);
        
        // Set card styles
        cards.forEach((card, index) => {
            card.style.width = `${cardWidth}px`;
            card.style.minWidth = `${cardWidth}px`;
            card.style.flexShrink = '0';
            card.style.marginRight = `${gap}px`;
            
            // Remove margin from last card in each row
            if ((index + 1) % cardsToShow === 0) {
                card.style.marginRight = '0';
            }
        });
        
        // Set initial position
        updateCarousel();
    }
    
    // Update carousel position
    function updateCarousel() {
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
        
        const scrollPosition = -currentIndex * (cardWidth + gap);
        grid.style.transform = `translateX(${scrollPosition}px)`;
    }

    // Helper function to get extra pixels based on screen width
    function getExtraPixels() {
        const width = window.innerWidth;
        // Define breakpoints and their corresponding extra 
        if (width < 260) return 260;
        if (width < 280) return 240;
        if (width < 300) return 220;
        if (width < 320) return 200;
        if (width < 340) return 180;
        if (width < 360) return 160;
        if (width < 380) return 140;
        if (width < 405) return 100;
        if (width < 420) return 60;
        return 0;
    }
    
    // Navigation functions
    function nextSlide() {
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        if (currentIndex >= maxIndex) {
            currentIndex = 0; // Loop to start
        } else {
            if (window.innerWidth < 420) {
                currentIndex += 1;

                const extraPixels = getExtraPixels();
                const mobileScrollDistance = (cardWidth + gap) * currentIndex + extraPixels * currentIndex;
                grid.style.transform = `translateX(-${mobileScrollDistance}px)`;
                return; // Skip the default updateCarousel call
            } else {
                currentIndex = Math.min(currentIndex + 1, maxIndex);
            }
        }
        updateCarousel();
    }
    
    function prevSlide() {
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        if (currentIndex <= 0) {
            currentIndex = maxIndex; // Loop to end
            // When looping to the end, calculate the exact position for the last card
            if (window.innerWidth < 420) {
                const extraPixels = getExtraPixels();
                const mobileScrollDistance = (cardWidth + gap) * currentIndex + extraPixels * currentIndex;
                grid.style.transform = `translateX(-${mobileScrollDistance}px)`;
                return;
            }
        } else {
            if (window.innerWidth < 420) {
                // On mobile, move back by one card plus 50px
                currentIndex--;
                // Calculate the extra pixels to add for mobile
                const extraPixels = getExtraPixels();
                const mobileScrollDistance = (cardWidth + gap) * currentIndex + extraPixels * currentIndex;
                grid.style.transform = `translateX(-${mobileScrollDistance}px)`;
                return; // Skip the default updateCarousel call
            } else {
                currentIndex--;
            }
        }
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
    });
    
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCardsToShow();
            initCarousel();
        }, 250);
    });
    
    // Initialize
    initCarousel();
    
    // Initial transform to ensure first slide is visible
    setTimeout(() => {
        grid.style.transition = 'transform 0.5s ease';
    }, 100);
});

/**
 * Cookie Consent Manager
 * Handles GDPR-compliant cookie consent functionality
 */
const CookieConsent = (function() {
    // Private variables
    let banner;
    let modal;
    let escapeHandler = null;
    
    // Private methods
    const getConsent = function() {
        try {
            const consent = localStorage.getItem('cookieConsent');
            if (!consent) {
                console.log('No consent data found in localStorage');
                return null;
            }
            
            const parsed = JSON.parse(consent);
            
            // Validate the consent object has the expected structure
            if (typeof parsed !== 'object' || parsed === null) {
                console.warn('Invalid consent data: not an object');
                return null;
            }
            
            // Check for required fields with default values
            const validConsent = {
                necessary: true, // Always true as it's required
                preferences: !!parsed.preferences,
                statistics: !!parsed.statistics,
                marketing: !!parsed.marketing,
                timestamp: parsed.timestamp || new Date().toISOString()
            };
            return validConsent;
            
        } catch (e) {
            console.error('Error reading cookie consent:', e);
            return null;
        }
    };
    
    const showBanner = function() {
        if (!banner) {
            console.error('Banner element not found');
            return;
        }
        
        // Check if already shown
        if (banner.classList.contains('show')) {
            return;
        }
        
        // Force reflow to ensure transition works
        banner.style.display = 'block';
        void banner.offsetHeight;
        banner.classList.add('show');
        
        // Ensure body has enough padding to prevent content jump
        const bannerHeight = banner.offsetHeight;
        document.body.style.paddingBottom = bannerHeight + 'px';
        document.body.classList.add('cookie-banner-visible');
    };
    
    const hideBanner = function() {
        if (!banner) {
            console.error('Banner element not found');
            return;
        }
        
        // Check if already hidden
        if (!banner.classList.contains('show')) {
            return;
        }
        banner.classList.remove('show');
        
        // Wait for transition to complete before hiding
        setTimeout(() => {
            if (banner.classList.contains('show')) {
                return;
            }
            
            banner.style.display = 'none';
            document.body.style.paddingBottom = '0';
            document.body.classList.remove('cookie-banner-visible');
        }, 300); // Match this with your CSS transition duration
    };
    
    const showModal = function() {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Trigger reflow
            void modal.offsetHeight;
            
            // Add show class for animation
            modal.classList.add('show');
            
            // Set focus to modal for accessibility
            const closeBtn = modal.querySelector('.cookie-settings-close');
            if (closeBtn) {
                closeBtn.focus();
            }
            
            // Add event listener for Escape key
            escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    hideModal();
                }
            };
            document.addEventListener('keydown', escapeHandler);
        }
    };
    
    const hideModal = function() {
        if (modal) {
            modal.classList.remove('show');
            
            // Wait for animation to complete
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
                
                // Remove event listener
                if (escapeHandler) {
                    document.removeEventListener('keydown', escapeHandler);
                    escapeHandler = null;
                }
            }, 300);
        }
    };

    const saveConsent = function(consent) {
        if (!consent) {
            console.error('No consent data provided');
            return false;
        }

        try {
            const consentData = {
                necessary: true, // Always true as it's required
                preferences: !!consent.preferences,
                statistics: !!consent.statistics,
                marketing: !!consent.marketing,
                timestamp: consent.timestamp || new Date().toISOString()
            };

            localStorage.setItem('cookieConsent', JSON.stringify(consentData));

            // Apply the consent
            applyConsent(consentData);

            // Verify the consent was saved correctly
            const savedConsent = localStorage.getItem('cookieConsent');
            
            if (!savedConsent) {
                throw new Error('Failed to save consent to localStorage');
            }

            // Hide the banner if it's visible
            hideBanner();
            return true;
        } catch (e) {
            console.error('Error in saveConsent:', e);
            return false;
        }
    };

    const applyConsent = function(consent) {
        if (!consent) {
            console.warn('No consent provided to apply');
            return;
        }
        
        // Make sure we have a valid consent object
        const validConsent = {
            necessary: true, // Always required
            preferences: !!consent.preferences,
            statistics: !!consent.statistics,
            marketing: !!consent.marketing,
            timestamp: consent.timestamp || new Date().toISOString()
        };
        
        // Save the validated consent
        try {
            localStorage.setItem('cookieConsent', JSON.stringify(validConsent));
        } catch (e) {
            console.error('Failed to save consent to localStorage:', e);
        }
        
        // Hide the banner and modal
        hideBanner();
        hideModal();

        // Load GA if statistics are enabled
        if (validConsent.statistics) {
            loadGoogleAnalytics(validConsent);
            initializeGTM();
        }

        // Apply consent to cookie settings toggles if they exist
        if (modal) {
            const preferenceToggle = modal.querySelector('.cookie-toggle[data-category="preferences"]');
            const statsToggle = modal.querySelector('.cookie-toggle[data-category="statistics"]');
            const marketingToggle = modal.querySelector('.cookie-toggle[data-category="marketing"]');
            
            if (preferenceToggle) preferenceToggle.checked = validConsent.preferences;
            if (statsToggle) statsToggle.checked = validConsent.statistics;
            if (marketingToggle) marketingToggle.checked = validConsent.marketing;
        }
        
        // Dispatch a custom event that other scripts can listen for
        document.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
            detail: validConsent
        }));
    };

    const acceptAll = function(e) {
        if (e) {
            e.preventDefault();
        }

        const consent = {
            preferences: true,
            statistics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };

        const saved = saveConsent(consent);
        
        if (saved) {
            hideBanner();
            
            // Show confirmation message
            const confirmation = document.createElement('div');
            confirmation.className = 'cookie-save-confirmation';
            confirmation.textContent = 'Sütik elfogadva';
            document.body.appendChild(confirmation);
            
            // Style the confirmation message
            Object.assign(confirmation.style, {
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#7ed957',
                color: '#2c3e50',
                padding: '12px 24px',
                borderRadius: '30px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                zIndex: '10001',
                fontWeight: '600',
                transition: 'opacity 0.3s ease-in-out'
            });
            
            // Fade out and remove after 3 seconds
            setTimeout(() => {
                confirmation.style.opacity = '0';
                setTimeout(() => {
                    confirmation.remove();
                }, 300);
            }, 3000);
        } else {
            console.error('Failed to save consent');
        }
    };
    
    
    const setupEventListeners = function() {
        // Accept button
        const acceptBtn = document.querySelector('.cookie-consent-accept');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', (e) => {
                acceptAll(e);
                loadGoogleAnalytics();
                initializeGTM();
                console.log('GA4 and GTM loaded');
            });
        } else {
            console.error('Accept button not found!');
        }
        
        // Settings button
        const settingsBtn = document.querySelector('.cookie-consent-settings');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showModal();
            });
        }
        
        // Close modal button
        const closeModalBtn = document.querySelector('.cookie-settings-close');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', hideModal);
        }
        
        // Modal overlay click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    hideModal();
                }
            });
        }
        
        // Save settings button
        const saveSettingsBtn = document.querySelector('.cookie-settings-save');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => {
                // Get all toggle inputs in the modal
                const toggles = modal.querySelectorAll('.cookie-option-toggle');
                const consent = {
                    preferences: false,
                    statistics: false,
                    marketing: false,
                    timestamp: new Date().toISOString()
                };
                
                // Update consent based on toggle states
                toggles.forEach(toggle => {
                    const type = toggle.getAttribute('data-type');
                    if (type === 'preferences') consent.preferences = toggle.checked;
                    if (type === 'statistics') consent.statistics = toggle.checked;
                    if (type === 'marketing') consent.marketing = toggle.checked;
                });
                
                // Save consent and hide both modal and banner
                if (saveConsent(consent)) {
                    hideModal();
                    hideBanner();
                    
                    // Show a brief confirmation message
                    const confirmation = document.createElement('div');
                    confirmation.className = 'cookie-save-confirmation';
                    confirmation.textContent = 'Beállítások mentve';
                    document.body.appendChild(confirmation);
                    
                    // Style the confirmation message
                    Object.assign(confirmation.style, {
                        position: 'fixed',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#7ed957',
                        color: '#2c3e50',
                        padding: '12px 24px',
                        borderRadius: '30px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        zIndex: '10001',
                        fontWeight: '600',
                        transition: 'opacity 0.3s ease-in-out'
                    });
                    
                    // Fade out and remove after 3 seconds
                    setTimeout(() => {
                        confirmation.style.opacity = '0';
                        setTimeout(() => {
                            confirmation.remove();
                        }, 300);
                    }, 3000);
                }
            });
        }

        // Dispatch the event
        const event = new Event('cookieConsentChanged');
        if (document.dispatchEvent(event)) {
            console.log('Cookie consent changed');
        }
        
        // Cancel button
        const cancelBtn = document.querySelector('.cookie-settings-cancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', hideModal);
        }
        
        // Toggle details
        const toggleDetailsBtn = document.querySelector('.cookie-consent-toggle');
        if (toggleDetailsBtn) {
            toggleDetailsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const details = document.querySelector('.cookie-consent-details');
                if (details) {
                    const isExpanded = details.classList.toggle('show');
                    toggleDetailsBtn.textContent = isExpanded ? 'Hide details' : 'Show details';
                    toggleDetailsBtn.setAttribute('aria-expanded', isExpanded);
                }
            });
        }
    };
    
    // Public API
    return {
        // Initialize the cookie consent banner
        init: function() {
            
            // Get DOM elements
            banner = document.querySelector('.cookie-consent-banner');
            modal = document.querySelector('.cookie-settings-modal');
            
            // Check if banner exists
            if (!banner) {
                console.error('Cookie consent banner element not found');
                return;
            }
            
            // Check if already consented
            const consent = getConsent();
            if (consent) {
                applyConsent(consent);
                return;
            }
            
            // Only set up event listeners if we're showing the banner
            setupEventListeners();
            
            // Show banner if no consent
            showBanner();
        }
    };
})();

// Load basic Google Analytics (statistics only)
function loadGoogleAnalytics(consent) {
    // Prevent duplicate loading
    if (window.gtag && window.gtag.config) {
        console.log('GA4 already loaded');
        updateGCMConsent(consent);
        return;
    }

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
        window.dataLayer.push(arguments);
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-JYRVFT8JEE';
    
    script.onload = function() {
        console.log('GA4 script loaded, initializing...');
        gtag('js', new Date());
        gtag('config', 'G-JYRVFT8JEE', {
            'anonymize_ip': true
        });
        console.log('GA4 initialized');
        
        // Now that GA is loaded, update GCM consent
        updateGCMConsent(consent);
    };

    script.onerror = function() {
        console.error('Failed to load GA4 script');
    };

    document.head.appendChild(script);
}

// Function to initialize GTM when consent is given
function initializeGTM() {
    // Only initialize if not already initialized
    if (!window.gtmInitialized) {
        window.gtmInitialized = true;
        
        // Create GTM script
        const gtmScript = document.createElement('script');
        gtmScript.innerHTML = `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WQ8XN3PC');
        `;
        
        // Add to head
        document.head.appendChild(gtmScript);
    }
}

function updateGCMConsent(consent) {
    console.log('Updating GCM consent:', consent);
    
    if (!window.gtag) {
        console.log('gtag not available yet, will try again in 500ms');
        setTimeout(() => {
            console.log('Retrying GCM consent update...');
            updateGCMConsent(consent);
        }, 500);
        return;
    }

    console.log('gtag is available, updating GCM consent...');
    
    try {
        gtag('consent', 'update', {
            'analytics_storage': consent.statistics ? 'granted' : 'denied',
            'ad_storage': consent.marketing ? 'granted' : 'denied',
            'ad_user_data': consent.marketing ? 'granted' : 'denied',
            'ad_personalization': consent.marketing ? 'granted' : 'denied'
        });
        console.log('GCM consent updated successfully');
        logConsentStatus();
    } catch (e) {
        console.error('Error updating GCM consent:', e);
    }
}

function logConsentStatus() {
    console.log('Checking consent status...');
    
    // Get consent states from dataLayer
    const consentStates = (window.dataLayer || []).filter(item => 
        item && item[0] === 'consent' && item[1] === 'update'
    );
    
    // Get the most recent consent state
    const latestConsent = consentStates[consentStates.length - 1];
    if (latestConsent && latestConsent[2]) {
        console.log('Current consent state:', latestConsent[2]);
        return latestConsent[2]; // Return the consent state for programmatic use
    }
    
    console.log('No consent states found in dataLayer');
    return null;
}
    
// Store initialization state
let cookieConsentInitialized = false;

// Check for existing consent
function hasValidConsent() {
    try {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) return false;
        
        const parsed = JSON.parse(consent);
        return parsed && typeof parsed === 'object' && 'timestamp' in parsed;
    } catch (e) {
        console.error('Error checking consent:', e);
        return false;
    }
}

// Initialize cookie consent when DOM is loaded
function initializeCookieConsent() {
    // Make sure we don't initialize multiple times
    if (cookieConsentInitialized) {
        return;
    }
    
    // Make it globally available
    window.cookieConsent = CookieConsent;
    
    // Check for existing consent first
    if (hasValidConsent()) {
        cookieConsentInitialized = true;
        
        // Still initialize but don't show banner
        window.cookieConsent.init();
        return;
    }
    
    // Initialize immediately
    if (document.readyState === 'loading') {
        // If document is still loading, wait for DOMContentLoaded
        document.addEventListener('DOMContentLoaded', () => {
            try {
                window.cookieConsent.init();
                cookieConsentInitialized = true;
            } catch (e) {
                console.error('Error initializing cookie consent:', e);
            }
        });
    } else {
        // If DOM is already loaded, initialize immediately
        try {
            window.cookieConsent.init();
            cookieConsentInitialized = true;
        } catch (e) {
            console.error('Error initializing cookie consent:', e);
        }
    }
}

// Listen for consent changes
document.addEventListener('cookieConsentChanged', function() {
    if (getCookie('cookie_consent') === 'all' || getCookie('cookie_consent_statistics') === 'true' || getCookie('cookie_consent_marketing') === 'true') {
        loadGoogleAnalytics();
    }
});

// Start the initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize the page
        initializePage();
        
        // Initialize event listeners
        if (typeof setupEventListeners === 'function') {
            setupEventListeners();
        }
        
        // Initialize cookie consent
        initializeCookieConsent();
    });
} else {
    // If DOM is already loaded, initialize with a small delay to ensure all elements exist
    setTimeout(function() {
        // Initialize the page
        initializePage();
        
        // Initialize event listeners
        if (typeof setupEventListeners === 'function') {
            setupEventListeners();
        }
        
        // Initialize cookie consent
        initializeCookieConsent();
    }, 0);
}

// Popup functions
function showPopup(options) {
    const popup = document.getElementById('popup-overlay');
    const popupMessage = document.getElementById('popup-message');

    if (!popup || !popupMessage) {
        console.error('Popup elements not found!');
        return;
    }

    // Only update content if provided in options
    if (popupMessage && options.content !== undefined) {
        popupMessage.innerHTML = options.content;
    }
    
    // Show popup
    popup.classList.add('active');
    
    // Close button
    const closeBtn = document.getElementById('popup-close');
    if (closeBtn) {
        closeBtn.onclick = function() {
            hidePopup();
        };
    }
    
    // Close when clicking outside content
    popup.onclick = function(e) {
        if (e.target === popup) {
            hidePopup();
        }
    };
    
    // Auto-hide if specified
    if (options.duration) {
        setTimeout(hidePopup, options.duration);
    }
}

function hidePopup() {
    const popup = document.getElementById('popup-overlay');
    if (popup) {
        popup.classList.remove('active');
    }
}

// Make functions globally available
window.showPopup = showPopup;
window.hidePopup = hidePopup;

// Show popup after 5 seconds when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Only show on homepage
    if (window.location.pathname.endsWith('index.html') || 
        window.location.pathname.endsWith('/') || 
        window.location.pathname === '' ||
        window.location.pathname.includes('product.html')) {
    
        // Add this new code
        setTimeout(function() {
            showPopup({
                duration: 0 // 0 means it won't auto-close
            });
        }, 25000); // 1000 milliseconds = 1 seconds
    }
});

// Reviews Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.review-carousel');
    const grid = document.querySelector('.review-grid');
    const prevBtn = carousel?.querySelector('.prev-arrow');
    const nextBtn = carousel?.querySelector('.next-arrow');
    const cards = Array.from(document.querySelectorAll('.review-card'));

    if (!carousel || !grid || !prevBtn || !nextBtn) {
        return;
    }
    
    let currentIndex = 0;
    let cardWidth = 0;
    let cardsToShow = 3;
    const gap = 20;
    let touchStartX = 0;
    let touchEndX = 0;

    // Érintéskezelés hozzáadása
    grid.addEventListener('touchstart', handleTouchStart, { passive: true });
    grid.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Érintés kezdete
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    // Érintés vége
    function handleTouchEnd(e) {
        if (window.innerWidth > 768) return; // Csak mobilnézetben használjuk az érintést
        
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }

    // Csúszás kezelése
    function handleSwipe() {
        const swipeThreshold = 50; // Minimális csúszási távolság pixelben
        
        // Balra csúsztatás (következő dia)
        if (touchStartX - touchEndX > swipeThreshold) {
            nextSlide();
        }
        
        // Jobbra csúsztatás (előző dia)
        if (touchEndX - touchStartX > swipeThreshold) {
            prevSlide();
        }
    }
    
    // Set initial styles
    grid.style.display = 'flex';
    grid.style.transition = 'transform 0.5s ease';
    grid.style.width = '100%';
    
    // Calculate how many cards to show based on screen width
    function updateCardsToShow() {
        cardsToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
        return cardsToShow;
    }
    
    // Initialize the carousel
    function initCarousel() {
        updateCardsToShow();
        const containerWidth = carousel.offsetWidth - 160; // Account for padding
        cardWidth = (containerWidth / cardsToShow) - (gap * (cardsToShow - 1) / cardsToShow);
        
        // Set card styles
        cards.forEach((card, index) => {
            card.style.width = `${cardWidth}px`;
            card.style.minWidth = `${cardWidth}px`;
            card.style.flexShrink = '0';
            card.style.marginRight = `${gap}px`;
            
            // Remove margin from last card in each row
            if ((index + 1) % cardsToShow === 0) {
                card.style.marginRight = '0';
            }
        });
        
        // Set initial position
        updateCarousel();
    }
    
    // Update carousel position
    function updateCarousel() {
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
        
        const scrollPosition = -currentIndex * (cardWidth + gap);
        grid.style.transform = `translateX(${scrollPosition}px)`;
    }

    // Helper function to get extra pixels based on screen width
    function getExtraPixels() {
        const width = window.innerWidth;
        // Define breakpoints and their corresponding extra 
        if (width < 260) return 260;
        if (width < 280) return 240;
        if (width < 300) return 220;
        if (width < 320) return 200;
        if (width < 340) return 180;
        if (width < 360) return 160;
        if (width < 380) return 140;
        if (width < 405) return 100;
        if (width < 420) return 60;
        return 0;
    }
    
    // Navigation functions
    function nextSlide() {
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        if (currentIndex >= maxIndex) {
            currentIndex = 0; // Loop to start
        } else {
            if (window.innerWidth < 420) {
                currentIndex += 1;

                const extraPixels = getExtraPixels();
                const mobileScrollDistance = (cardWidth + gap) * currentIndex + extraPixels * currentIndex;
                grid.style.transform = `translateX(-${mobileScrollDistance}px)`;
                return; // Skip the default updateCarousel call
            } else {
                currentIndex = Math.min(currentIndex + 1, maxIndex);
            }
        }
        updateCarousel();
    }
    
    function prevSlide() {
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        if (currentIndex <= 0) {
            currentIndex = maxIndex; // Loop to end
            // When looping to the end, calculate the exact position for the last card
            if (window.innerWidth < 420) {
                const extraPixels = getExtraPixels();
                const mobileScrollDistance = (cardWidth + gap) * currentIndex + extraPixels * currentIndex;
                grid.style.transform = `translateX(-${mobileScrollDistance}px)`;
                return;
            }
        } else {
            if (window.innerWidth < 420) {
                // On mobile, move back by one card plus 50px
                currentIndex--;
                // Calculate the extra pixels to add for mobile
                const extraPixels = getExtraPixels();
                const mobileScrollDistance = (cardWidth + gap) * currentIndex + extraPixels * currentIndex;
                grid.style.transform = `translateX(-${mobileScrollDistance}px)`;
                return; // Skip the default updateCarousel call
            } else {
                currentIndex--;
            }
        }
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
    });
    
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCardsToShow();
            initCarousel();
        }, 250);
    });
    
    // Initialize
    initCarousel();
    
    // Initial transform to ensure first slide is visible
    setTimeout(() => {
        grid.style.transition = 'transform 0.5s ease';
    }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
    const materialOptions = document.querySelectorAll('.material-option');
    const materialContents = document.querySelectorAll('.material-content');
    
    materialOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options and contents
            materialOptions.forEach(opt => opt.classList.remove('active'));
            materialContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Show corresponding content
            const materialType = this.getAttribute('data-material');
            document.getElementById(`${materialType}-info`).classList.add('active');
        });
    });
    
    // Activate first tab by default
    if (materialOptions.length > 0) {
        materialOptions[0].click();
    }
});

function initializeProductReviews(product) {
    if (!product.reviewWidget) return;
    
    const container = document.getElementById('stamped-reviews-widget');
    if (!container) return;
    
    // Create the widget element
    const widget = document.createElement('div');
    widget.setAttribute('data-stamped-widget', 'review-widget');
    widget.setAttribute('data-widget-style', 'standard');
    widget.setAttribute('data-product-id', product.reviewWidget.productId);
    widget.setAttribute('data-name', product.reviewWidget.name);
    widget.setAttribute('data-url', product.reviewWidget.url);
    widget.setAttribute('data-image-url', product.reviewWidget.imageUrl);
    widget.setAttribute('data-description', product.reviewWidget.description);
    
    // Clear and append the widget
    container.innerHTML = '';
    container.appendChild(widget);
    
    // Initialize Stamped.io widget
    if (window.StampedWidgets) {
        window.StampedWidgets.initialize();
    }
}

// Debug Snipcart template loading
document.addEventListener('snipcart.ready', () => {
    // Initialize Snipcart cart counter when Snipcart is ready
    if (window.Snipcart) {
        initializeSnipcartCart();
    } else {
        // If Snipcart isn't loaded yet, wait for it
        document.addEventListener('snipcart.ready', initializeSnipcartCart);
    }
    // Force tax calculation when cart opens
    document.addEventListener('snipcart.cart.opened', () => {
        setTimeout(() => {
            Snipcart.api.cart.taxes.forceRecalculate();
        }, 500);
    });
});

/**
 * Initialize Snipcart cart functionality
 */
function initializeSnipcartCart() {
    
    // Initial update
    updateSnipcartCartCount();
    
    // Remove any existing event listeners to prevent duplicates
    document.removeEventListener('snipcart.ready', updateSnipcartCartCount);
    document.removeEventListener('snipcart.cart.items.changed', updateSnipcartCartCount);
    document.removeEventListener('snipcart.cart.opened', updateSnipcartCartCount);
    document.removeEventListener('snipcart.cart.closed', updateSnipcartCartCount);
    
    // Add new event listeners
    document.addEventListener('snipcart.ready', handleSnipcartReady);
    
    // Also update when the page becomes visible again
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

// Handle Snipcart state changes
function handleSnipcartStateChange() {
    updateSnipcartCartCount();
}

/**
 * Update the cart counter with the current number of items in the Snipcart cart
 */
function updateSnipcartCartCount() {
    try {
        // Check if Snipcart is loaded and has store
        if (!window.Snipcart || !window.Snipcart.store) {
            console.log('Snipcart not fully initialized yet');
            // Try again in 500ms if not ready
            setTimeout(updateSnipcartCartCount, 500);
            return;
        }
        
        // Get the current cart state
        const state = window.Snipcart.store.getState();
        const count = state.cart.items.count || 0;
        
        // Update all cart counters on the page
        const counters = document.querySelectorAll('.cart-count');
        
        counters.forEach((counter) => {
            if (counter) {
                counter.textContent = count;
                counter.style.display = 'flex';
                counter.style.visibility = 'visible';
            }
        });
    } catch (error) {
        console.error('Error updating cart count:', error);
        // Retry on error
        setTimeout(updateSnipcartCartCount, 500);
    }
}

/**
 * Initialize Snipcart cart functionality
 */
function initializeSnipcartCart() {
    
    // Initial update
    updateSnipcartCartCount();
    
    // Clean up any existing listeners
    document.removeEventListener('snipcart.ready', handleSnipcartReady);
    
    // Set up new listeners
    if (window.Snipcart && window.Snipcart.store) {
        handleSnipcartReady();
    } else {
        document.addEventListener('snipcart.ready', handleSnipcartReady);
    }
}

// Handle Snipcart ready event
function handleSnipcartReady() {
    
    // Initial update
    updateSnipcartCartCount();
    
    // Listen for store changes
    if (window.Snipcart.store) {
        window.Snipcart.store.subscribe(() => {
            updateSnipcartCartCount();
        });
    }
    
    // Listen for specific events as backup
    const events = [
        'snipcart.ready',
        'snipcart.cart.items.changed',
        'snipcart.cart.opened',
        'snipcart.cart.closed'
    ];
    
    events.forEach(event => {
        document.removeEventListener(event, updateSnipcartCartCount);
        document.addEventListener(event, updateSnipcartCartCount);
    });
}

// Make the function available globally for Snipcart events
window.updateSnipcartCartCount = updateSnipcartCartCount;

document.addEventListener('DOMContentLoaded', function() {
    // Set the date we're counting down to (July 31, 2025 23:59:59)
    const countDownDate = new Date("Jul 18, 2025 23:59:59").getTime();

    // Update the countdown every 1 second
    const countdownFunction = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        const distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById("countdown").innerHTML = 
            days + " nap " + hours + " óra " + 
            minutes + " perc " + seconds + " másodperc";
        
        // If the countdown is finished, clear the interval
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "Az akció lejárt!";
        }
    }, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script started: DOMContentLoaded event fired. (Delayed check)');
    setTimeout(function() {
        var widgetElement = document.querySelector('.stamped-reviews');
        if (widgetElement) {
            widgetElement.style.setProperty('margin', '0 !important', 'important');
        } else {
            console.log('Element still not found after delay.');
        }
    }, 2000); // Try after 2 seconds (adjust as needed, e.g., 3000, 5000)
});

document.addEventListener('DOMContentLoaded', function() {
    const fixedCartButton = document.querySelector('.fixed-cart-button');
    const productDescription = document.querySelector('.product-container'); // Make sure this selector matches your product description section
    const footer = document.querySelector('footer');

    if (!fixedCartButton || !productDescription || !footer) {
        console.warn('Required elements not found');
        return;
    }

    let isDescriptionPassed = false;
    let isFooterVisible = false;

    // Külön observer a termékleírásnak
    const descriptionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Ellenőrizzük, hogy az elem teteje kiment-e a viewportból
            const elementTop = entry.boundingClientRect.top;
            const elementBottom = entry.boundingClientRect.bottom;
            
            // Ha az elem teljesen a viewport fölött van (teljesen elscrolloltuk)
            if (elementBottom < 0) {
                isDescriptionPassed = true;
            } 
            // Ha az elem legalább részben látható vagy a viewport alatt van
            else if (elementTop < window.innerHeight) {
                isDescriptionPassed = false;
            }
            updateButtonVisibility();
        });
    }, {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: [0, 0.1, 1] // Több threshold pont a pontosabb figyeléshez
    });

    // Külön observer a lábléc figyelésére
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Ellenőrizzük, hogy a lábléc teteje belépett-e a viewportba
            const elementTop = entry.boundingClientRect.top;
            const elementBottom = entry.boundingClientRect.bottom;
            const viewportHeight = window.innerHeight;
            
            // A lábléc "megérkezése" = amikor a teteje belép a viewportba (vagy közel van hozzá)
            if (elementTop <= viewportHeight) {
                isFooterVisible = true;
            } else {
                isFooterVisible = false;
            }
            
            updateButtonVisibility();
        });
    }, {
        root: null,
        rootMargin: "-50px 0px 0px 0px", // 50px-el korábban "érzékeli" a láblécet
        threshold: [0, 0.1, 1] // Több threshold pont a pontosabb figyeléshez
    });

    function updateButtonVisibility() {
        
        // A gomb akkor jelenjen meg, ha a leírást elhagytuk ÉS a lábléc még nem látható
        const shouldShow = isDescriptionPassed && !isFooterVisible;
    
        if (shouldShow) {
            fixedCartButton.classList.add('is-visible');
        
            // Mobilon padding hozzáadása
            if (window.innerWidth <= 768) {
                document.body.style.paddingBottom = fixedCartButton.offsetHeight + 'px';
            }
        } else {
            fixedCartButton.classList.remove('is-visible');
        
            // Mobilon padding törlése
            if (window.innerWidth <= 768) {
                document.body.style.paddingBottom = '0';
            }
        }
    }

    // Indítsd el a figyelést
    descriptionObserver.observe(productDescription);
    footerObserver.observe(footer);

    // Resize kezelés
    window.addEventListener('resize', () => {
        if (fixedCartButton.classList.contains('is-visible')) {
            updateButtonVisibility();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile details card toggle
    const cards = document.querySelectorAll('.details-card');
    cards.forEach(card => {
        // Create show more button
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'show-more-btn';
        showMoreBtn.textContent = 'Többet...';
        
        // Add click handler
        showMoreBtn.addEventListener('click', function() {
            card.classList.toggle('expanded');
            showMoreBtn.textContent = card.classList.contains('expanded') ? 'Kevesebbet...' : 'Többet...';
        });
        
        // Add button to card
        card.appendChild(showMoreBtn);
    });
});