// Handle mobile dropdown toggle
document.querySelectorAll('.nav-dropdown > a').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation(); // Stop event from bubbling up
            
            const parent = this.parentElement;
            const isActive = parent.classList.contains('active');
            
            // Close all dropdowns first
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // Toggle current dropdown if it wasn't active
            if (!isActive) {
                parent.classList.add('active');
            }
        }
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }
});

// Close dropdowns when clicking on a dropdown item
document.querySelectorAll('.dropdown-menu a').forEach(item => {
    item.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            this.closest('.nav-dropdown').classList.remove('active');
        }
    });
});

// Add this to your existing script.js
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
    
    // Toggle mobile menu
    function toggleMenu() {
        hamburger.classList.toggle('is-active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // Toggle menu when clicking hamburger
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu when clicking overlay
    navOverlay.addEventListener('click', () => {
        if (hamburger.classList.contains('is-active')) {
            toggleMenu();
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (hamburger.classList.contains('is-active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.hamburger')) {
            toggleMenu();
        }
    });
    
    return true;
}

// Initialize mobile menu when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

// Function to test cart
function testCart() {
    console.log('=== Testing Cart ===');
    console.log('Cart contents:', JSON.parse(localStorage.getItem('cart') || '[]'));
    console.log('Cart elements:', {
        overlay: document.querySelector('.cart-overlay'),
        sidebar: document.querySelector('.cart-sidebar'),
        button: document.querySelector('.checkout-btn'),
        form: document.getElementById('checkout-form')
    });
}

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

// Function to load product page data
function loadProductPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');

    console.log('Loading product page for ID:', productId);

    if (!productId || !window.products[productId]) {
        console.error('Product not found');
        window.location.href = 'index.html';
        return;
    }

    const product = window.products[productId];

    document.title = `${product.name} - EnergiX`;

    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productPrice').textContent = `${product.price.toLocaleString()} Ft`;
    document.getElementById('productDescription').innerHTML = `<p>${product.description}</p>`;

    const mainImage = document.getElementById('productImage');
    mainImage.src = (product.images[0] && product.images[0].full) || 'assets/placeholder.svg';
    mainImage.alt = product.name;

    mainImage.onerror = function() {
        console.error('Failed to load image:', this.src);
    };

    const thumbnailsContainer = document.getElementById('productThumbnails');
    thumbnailsContainer.innerHTML = '';

    product.images.forEach((image, index) => {
        if (!image.thumbnail || !image.full) {
            console.warn('Invalid image format at index', index, image);
            return;
        }

        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail${index === 0 ? ' active' : ''}`;
        thumbnail.dataset.image = image.full;

        const img = document.createElement('img');
        img.src = image.thumbnail;
        img.alt = `${product.name} - Kép ${index + 1}`;

        img.onerror = function() {
            console.error('Failed to load thumbnail:', this.src);
            this.src = 'assets/placeholder.svg';
        };

        thumbnail.addEventListener('click', (e) => {
            e.preventDefault();
            const fullImage = thumbnail.dataset.image;
            if (fullImage) {
                mainImage.src = fullImage;
                
                document.querySelectorAll('.thumbnail').forEach(thumb => {
                    thumb.classList.remove('active');
                });
                thumbnail.classList.add('active');

                mainImage.style.opacity = 0;
                setTimeout(() => {
                    mainImage.style.opacity = 1;
                }, 100);
            }
        });

        thumbnail.appendChild(img);
        thumbnailsContainer.appendChild(thumbnail);
    });

    const quantityInput = document.getElementById('quantity');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');

    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value) || 1;
            quantityInput.value = currentValue + 1;
        });

        quantityInput.addEventListener('change', () => {
            let value = parseInt(quantityInput.value) || 1;
            if (value < 1) value = 1;
            quantityInput.value = value;
        });
    }
}

// Initialize product page
function initProductPage(productId) {
    console.log('Initializing product page for:', productId);
    
    // Get the product from data
    const product = window.products[productId];
    if (!product) {
        console.error('Product not found:', productId);
        window.location.href = 'index.html';
        return;
    }

    // Set product details
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productPrice').textContent = `${product.price.toLocaleString()} Ft`;
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
        mainImage.src = product.images[0].full || 'assets/placeholder.svg';
        mainImage.alt = product.name;
        mainImage.dataset.full = product.images[0].full; // Store full size URL
        
        // Add error handling
        mainImage.onerror = function() {
            console.error('Failed to load main image:', this.src);
            this.src = 'assets/placeholder.svg';
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
            img.src = image.thumbnail || 'assets/placeholder.svg';
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
                this.src = 'assets/placeholder.svg';
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
                imagePath = 'assets/EnergiX/Argentum/Argentum, háttérrel-1000w.webp';
                altText = 'Argentum karkötő részletes nézet';
                break;
            case 'eter':
                imagePath = 'assets/EnergiX/Éter/Éter-háttérrel-1200w.webp';
                altText = 'Éter karkötő részletes nézet';
                break;
            case 'zafir':
                imagePath = 'assets/EnergiX/Zafír/Zafír_fehér_háttér-700w.webp';
                altText = 'Zafír karkötő részletes nézet';
                break;
        }
        
        if (imagePath) {
            featureImage.src = imagePath;
            featureImage.alt = altText;
            
            // Add error handling
            featureImage.onerror = function() {
                console.error('Failed to load feature image:', this.src);
                this.src = 'assets/placeholder.svg';
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
                    console.log('After addToCart:', cart);
                    showNotification(redirectToCheckout 
                        ? 'Tovább a fizetéshez...' 
                        : `${quantity}x ${product.name} hozzáadva a kosárhoz!`);
                    
                    if (redirectToCheckout) {
                        // Small delay to show the notification before redirecting
                        setTimeout(() => {
                            window.location.href = 'penztar.html';
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
}

// Initialize scroll animation for feature points and texts using Intersection Observer
function initScrollAnimation() {
    console.log('Initializing scroll animation with Intersection Observer...');
    const featureDots = document.querySelectorAll('.feature-dot');
    const featureTexts = document.querySelectorAll('.feature-text');
    
    if (featureDots.length === 0) {
        return; // No feature dots to animate
    }
    
    console.log(`Found ${featureDots.length} feature dots and ${featureTexts.length} feature texts`);
    
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported, falling back to scroll events');
        initFallbackScrollAnimation();
        return;
    }
    
    // Set up Intersection Observer for feature dots (only controls dot visibility)
    const dotObserver = new IntersectionObserver((entries, observer) => {
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
    
    console.log('Intersection Observers initialized');
    
    // Fallback for older browsers
    function initFallbackScrollAnimation() {
        console.log('Initializing fallback scroll animation...');
        
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
        console.log('Manually triggering scroll check');
        featureDots.forEach((dot, index) => {
            const rect = dot.getBoundingClientRect();
            const featureId = dot.dataset.feature;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                console.log('Manually showing dot:', featureId);
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
    console.log('Initializing interactive features...');
    
    // Set up product-specific feature dot positions
    setupFeatureDotPositions();
    
    // Wait for the next tick to ensure DOM is ready
    setTimeout(() => {
        // Initialize scroll animations
        console.log('Initializing scroll animation...');
        initScrollAnimation();
        
        // Add hover and click effects for feature dots
        const featureDots = document.querySelectorAll('.feature-dot');
        console.log(`Found ${featureDots.length} feature dots for hover effects`);
        
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
                console.log(`Hovering over dot ${index + 1}`);
                label.style.opacity = '1';
            });
            
            dot.addEventListener('mouseleave', () => {
                console.log(`Left dot ${index + 1}`);
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
            console.log('Manually triggering initial scroll check');
            if (window.triggerScrollCheck && typeof window.triggerScrollCheck === 'function') {
                window.triggerScrollCheck();
            }
        }, 1000);
    }, 100);
}

// Set up product-specific feature dot positions and labels
function setupFeatureDotPositions() {
    const featureDots = document.querySelectorAll('.feature-dot');
    if (!featureDots.length) return;
    
    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product') || 'argentum-1';
    
    // Extract product type from ID (e.g., 'argentum' from 'argentum-1')
    let productType = productId.split('-')[0].toLowerCase();
    
    // Default to 'argentum' if product type not recognized
    const validTypes = ['argentum', 'eter', 'zafir'];
    if (!validTypes.includes(productType)) {
        productType = 'argentum'; // Default
    }
    
    // Get the current product
    const product = window.products[productType];
    
    console.log(`Setting up feature dots for product type: ${productType}`);
    
    featureDots.forEach(dot => {
        try {
            const feature = dot.getAttribute('data-feature');
            const positions = JSON.parse(dot.getAttribute('data-positions') || '{}');
            const position = positions[productType];
            const line = dot.querySelector('.feature-line');

            if (position) {
                // Set dot position with adjustments for line connection
                const dotTop = position.top || '50%';
                const dotLeft = position.left || '50%';

                // Adjust position to account for dot size
                const topNum = parseFloat(dotTop);
                const leftNum = parseFloat(dotLeft);
                
                // Position the dot
                dot.style.top = `${topNum}%`;
                dot.style.left = `${leftNum}%`;

                // Adjust line position based on direction
                if (line) {
                    const direction = position.lineDir || 'right';
                    // Remove any existing direction classes
                    line.classList.remove('line-right', 'line-left', 'line-top', 'line-bottom');
                    
                    // Add the correct direction class
                    line.classList.add(`line-${direction}`);
                    
                    if (position.lineLength) {
                        line.style.setProperty('--line-length', `${position.lineLength}px`);
                    } else {
                        line.style.removeProperty('--line-length'); // Reset to default if not specified
                    }
                    // Reset vertical styles to prevent conflicts
                    line.style.top = '';
                    line.style.bottom = '';
                    line.style.left = '';
                    line.style.right = '';
                    line.style.transform = '';
                    
                    switch (direction) {
                        case 'right':
                            line.style.left = '0';
                            break;
                        case 'left':
                            line.style.right = '0';
                            break;
                        case 'top':
                            line.style.top = '50%';
                            line.style.left = '50%';
                            line.style.transform = 'translateX(-50%) translateY(-100%) scaleY(1)';
                            break;
                        case 'bottom':
                            line.style.top = '50%';
                            line.style.left = '50%';
                            line.style.transform = 'translateX(-50%) translateY(100%) scaleY(0)';
                            break;
                    }
                }

                // Set line direction and length
                if (line) {
                    // Remove any existing direction classes
                    line.classList.remove('line-right', 'line-left', 'line-top', 'line-bottom');

                    
                    // Add the appropriate direction class
                    const direction = position.lineDir || 'right'; // Default to right if not specified
                    line.classList.add(`line-${direction}`);
                    
                    // Set line length if specified in data-positions, otherwise use default from CSS
                    console.group(`Feature: ${feature}`);
                    console.log('Position data:', position);
                    console.log('Line element:', line);
                    
                    // Get the label element if it exists
                    const featureLabel = dot.querySelector('.feature-label');
                    
                    // Set line length (use specified or default)
                    const lineLength = position.lineLength !== undefined ? position.lineLength : 120;
                    const lineLengthPx = `${lineLength}px`;
                    
                    // Set line length as CSS variable on the line and dot
                    line.style.setProperty('--line-length', lineLengthPx);
                    dot.style.setProperty('--line-length', lineLengthPx);
                    
                    // For vertical lines, set height instead of width
                    if (direction === 'top' || direction === 'bottom') {
                        line.style.height = '120px';
                    } else {
                        line.style.width = lineLengthPx;
                    }
                    
                    // If label exists, update its position and class
                    if (featureLabel && featureLabel.textContent.trim() !== '') {
                        const direction = position.lineDir || 'right';
                        
                        // Reset and set base class
                        featureLabel.className = 'feature-label';
                        
                        // Set the line length as a CSS variable on the label
                        featureLabel.style.setProperty('--line-length', lineLengthPx);
                        
                        // Position the label based on direction using CSS classes
                        featureLabel.style.removeProperty('left');
                        featureLabel.style.removeProperty('right');
                        featureLabel.style.removeProperty('top');
                        featureLabel.style.removeProperty('bottom');
                        featureLabel.style.removeProperty('transform');
                        
                        // Ensure the dot has the correct data-positions attribute
                        // This is used by CSS to position the labels
                        dot.dataset.positions = direction;
                        
                        // Set the line length on the dot as well
                        dot.style.setProperty('--line-length', lineLengthPx);
                        
                        // Make sure the label is visible
                        featureLabel.style.opacity = '1';
                        
                        // Add the direction class to the dot for easier CSS targeting
                        dot.classList.add(`line-${direction}`);
                        featureLabel.classList.add(`label-${direction}`);
                        featureLabel.style.visibility = 'visible';
                        
                        console.log(`Positioned ${feature} label to ${direction} with length ${lineLengthPx}`);
                    } else {
                        console.warn(`No label found for feature:`, feature);
                    }
                    
                    // Make sure the line is visible
                    if (line) {
                        line.style.opacity = '1';
                    }
                    
                    console.log('Current line style after setting:', line.style.getPropertyValue('--line-length'));
                    console.groupEnd();
                    
                    // Update label position based on line direction
                    const label = dot.querySelector('.feature-label');
                    if (label) {
                        // If this is the material feature, update the label text
                        if (feature === 'material' && product && product.material) {
                            label.textContent = product.material;
                        }
                        
                        label.classList.remove('label-right', 'label-left', 'label-top', 'label-bottom');
                        label.classList.add(`label-${direction}`);
                    }
                    console.log(`Set ${feature} to`, position);
                }
            }
        } catch (e) {
            console.error('Error setting up feature dot positions:'.toUpperCase(), e);
        }
    });
}

// FAQ Functionality
function initFAQ() {
    console.log('Initializing FAQ...');
    const faqItems = document.querySelectorAll('.faq-item');
    console.log(`Found ${faqItems.length} FAQ items`);

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

        console.log(`Initialized FAQ item ${index + 1}`, {
            question: question.textContent.trim().substring(0, 30) + '...',
            hasAnswer: !!answer
        });
    });
    
    console.log('FAQ initialization complete');
}

// Initialize product page
function initializePage() {
    console.log('=== initializePage() called ===');
    console.log('Document readyState:', document.readyState);
    console.log('Window products:', window.products ? 'Exists' : 'Undefined');
    if (window.products) {
        console.log('Available product IDs:', Object.keys(window.products));
    }

    // Initialize interactive features (should work on all pages)
    if (typeof initInteractiveFeatures === 'function') {
        console.log('Initializing interactive features...');
        initInteractiveFeatures();
    } else {
        console.error('initInteractiveFeatures function not found');
    }
    
    // Initialize FAQ functionality if FAQ section exists
    if (document.querySelector('.faq-container') && typeof initFAQ === 'function') {
        console.log('Initializing FAQ section...');
        try {
            initFAQ();
            console.log('FAQ initialization complete');
        } catch (e) {
            console.error('Error initializing FAQ:', e);
        }
    }

    // Run initialization when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePage);
    } else {
        // DOMContentLoaded has already fired
        setTimeout(initializePage, 0);
    }

    // Also initialize if the script is loaded after DOMContentLoaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initializePage, 0);
    }

    // Check if we have products data
    if (typeof window.products === 'undefined' || !window.products || !Object.keys(window.products).length) {
        console.error('Products not found or empty. Products object:', window.products);
        return;
    }

    // Check if we're on a product page
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    console.log('URL product ID:', productId);
    
    if (productId) {
        console.log('Initializing product page for product ID:', productId);
        
        // Check if product exists
        if (!window.products[productId]) {
            console.error('Product not found in window.products:', productId);
            console.log('Available products:', Object.keys(window.products));
            return;
        }
        
        // Initialize product page if needed
        if (typeof initProductPage === 'function') {
            console.log('Calling initProductPage with ID:', productId);
            initProductPage(productId);
        } else {
            console.error('initProductPage function not found');
        }
        
        // Load related products if on a product page
        if (typeof loadRelatedProducts === 'function') {
            console.log('Loading related products...');
            loadRelatedProducts(productId);
        } else {
            console.error('loadRelatedProducts function not found');
        }
    } else {
        console.error('No product ID found in URL');
    }
    
    // Initialize tabs and other UI components
    if (typeof initTabs === 'function') {
        initTabs();
    } else {
        console.error('initTabs function not found');
    }

    // Function to handle feature text fields (currently not in use)
    function setupFeatureTextFields() {
        // This function is intentionally left empty as we want to show all text fields by default
    }
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
    if (window.location.pathname.includes('product.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('product');
        
        if (productId) {
            console.log('Initializing product page for product ID:', productId);
            
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
    if (document.querySelector('.faq-container') && typeof initFAQ === 'function') {
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
        console.log('Switching to tab:', tabId);
        
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
    const relatedSection = document.querySelector('.related-products');
    if (!relatedSection) return;
    
    // Update section title
    const titleElement = relatedSection.querySelector('h2');
    if (titleElement) {
        titleElement.textContent = 'További Termékeink';
    }
    
    const relatedProductsContainer = document.getElementById('relatedProducts');
    if (!relatedProductsContainer) return;
    
    relatedProductsContainer.innerHTML = '';
    
    // Get all products except the current one
    const otherProducts = Object.entries(products).filter(([key]) => key !== currentProductId);
    
    // Display exactly 2 random related products
    const shuffled = otherProducts.sort(() => 0.5 - Math.random());
    const selectedProducts = shuffled.slice(0, 2);
    
    selectedProducts.forEach(([key, product]) => {
        const productElement = document.createElement('div');
        productElement.className = 'related-product';
        
        // Get the best available image (prefer full size, fall back to thumbnail)
        let imageUrl = 'assets/placeholder.svg';
        if (product.images && product.images[0]) {
            // Try to get the full-size image first, fall back to thumbnail
            imageUrl = product.images[0].full || 
                      (product.images[0].thumbnail ? product.images[0].thumbnail.replace('-200w', '-800w') : 'assets/placeholder.svg');
        }
        
        // Create a link that wraps the entire product card
        const productLink = document.createElement('a');
        productLink.href = `product.html?product=${product.id}`;
        productLink.className = 'product-card-link';
        productLink.style.textDecoration = 'none';
        productLink.style.color = 'inherit';
        
        productLink.innerHTML = `
            <div class="related-product-image" style="background-image: url('${imageUrl}')"></div>
            <div class="related-product-content">
                <h3>${product.name}</h3>
                <div class="price">${product.price.toLocaleString()} Ft</div>
                <span class="btn-view-product">Tovább a termékre</span>
            </div>
        `;
        
        productElement.appendChild(productLink);
        relatedProductsContainer.appendChild(productElement);
    });
}

// Handle Buy Now functionality
function buyNowHandler(e) {
    e.preventDefault();
    
    // Get the product ID from the closest product card or use current product ID
    const productCard = e.target.closest('.category-card, .product-container');
    let productId;
    
    if (productCard) {
        productId = productCard.dataset.id || productCard.dataset.category;
    } else {
        // Try to get product ID from URL if on product page
        const urlParams = new URLSearchParams(window.location.search);
        productId = urlParams.get('product');
    }
    
    if (!productId) {
        console.error('Product ID not found');
        return;
    }
    
    // Add to cart
    const product = window.products[productId];
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    // Add to cart and redirect to checkout
    addToCart(product, 1, true); // true = redirect to checkout after adding
}

// Setup event listeners
function setupEventListeners() {
    // Add click handlers to all Buy Now buttons
    document.addEventListener('click', function(e) {
        const buyNowBtn = e.target.closest('.buy-now-btn, .details-buy-now-btn');
        if (buyNowBtn) {
            buyNowHandler(e);
        }
    });
    
    // Product page links are now in the HTML
    
    
    
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

// Initialize tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    function switchTab(tabId) {
        console.log('Switching to tab:', tabId);
        
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
    
    // Activate the first tab by default if none is active
    if (tabButtons.length > 0 && !document.querySelector('.tab-btn.active')) {
        const firstTabId = tabButtons[0].getAttribute('data-tab');
        switchTab(firstTabId);
    }
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
        
        console.log('Carousel updated:', {
            currentIndex,
            maxIndex,
            scrollPosition,
            cardWidth,
            cardsToShow
        });
    }
    
    // Navigation functions
    function nextSlide() {
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        if (currentIndex >= maxIndex) {
            currentIndex = 0; // Loop to start
        } else {
            currentIndex += cardsToShow;
        }
        updateCarousel();
    }
    
    function prevSlide() {
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        if (currentIndex <= 0) {
            currentIndex = maxIndex; // Loop to end
        } else {
            currentIndex -= cardsToShow;
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
            console.log('Parsed consent data:', parsed);
            
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
            
            console.log('Returning valid consent:', validConsent);
            return validConsent;
            
        } catch (e) {
            console.error('Error reading cookie consent:', e);
            return null;
        }
    };
    
    const showBanner = function() {
        console.log('=== showBanner() called ===');
        if (!banner) {
            console.error('Banner element not found');
            return;
        }
        
        // Check if already shown
        if (banner.classList.contains('show')) {
            console.log('Banner already visible');
            return;
        }
        
        console.log('Displaying cookie banner');
        
        // Force reflow to ensure transition works
        banner.style.display = 'block';
        void banner.offsetHeight;
        banner.classList.add('show');
        
        // Ensure body has enough padding to prevent content jump
        const bannerHeight = banner.offsetHeight;
        document.body.style.paddingBottom = bannerHeight + 'px';
        document.body.classList.add('cookie-banner-visible');
        
        console.log('Banner shown, body class added');
    };
    
    const hideBanner = function() {
        console.log('=== hideBanner() called ===');
        if (!banner) {
            console.error('Banner element not found');
            return;
        }
        
        // Check if already hidden
        if (!banner.classList.contains('show')) {
            console.log('Banner already hidden');
            return;
        }
        
        console.log('Hiding cookie banner');
        banner.classList.remove('show');
        
        // Wait for transition to complete before hiding
        setTimeout(() => {
            if (banner.classList.contains('show')) {
                console.log('Banner shown again during transition, aborting hide');
                return;
            }
            
            banner.style.display = 'none';
            document.body.style.paddingBottom = '0';
            document.body.classList.remove('cookie-banner-visible');
            console.log('Banner hidden, body class removed');
        }, 300); // Match this with your CSS transition duration
    };
    
    const showModal = function() {
        console.log('Showing cookie settings modal');
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
        console.log('Hiding cookie settings modal');
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
        console.log('=== saveConsent() called with:', consent);
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

            console.log('Saving consent to localStorage:', consentData);
            localStorage.setItem('cookieConsent', JSON.stringify(consentData));
            console.log('Cookie consent saved to localStorage');

            // Apply the consent
            console.log('Calling applyConsent');
            applyConsent(consentData);

            // Verify the consent was saved correctly
            const savedConsent = localStorage.getItem('cookieConsent');
            console.log('Verifying saved consent:', savedConsent);
            
            if (!savedConsent) {
                throw new Error('Failed to save consent to localStorage');
            }

            // Hide the banner if it's visible
            console.log('Hiding banner');
            hideBanner();

            console.log('saveConsent() completed successfully');
            return true;
        } catch (e) {
            console.error('Error in saveConsent:', e);
            return false;
        }
    };

    const applyConsent = function(consent) {
        console.log('=== applyConsent() called with:', consent);

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
        
        console.log('Applying validated consent:', validConsent);
        
        // Save the validated consent
        try {
            localStorage.setItem('cookieConsent', JSON.stringify(validConsent));
            console.log('Consent saved to localStorage');
        } catch (e) {
            console.error('Failed to save consent to localStorage:', e);
        }
        
        // Hide the banner and modal
        hideBanner();
        hideModal();
        
        // Apply consent to cookie settings toggles if they exist
        if (modal) {
            console.log('Updating toggle states in modal');
            const preferenceToggle = modal.querySelector('.cookie-toggle[data-category="preferences"]');
            const statsToggle = modal.querySelector('.cookie-toggle[data-category="statistics"]');
            const marketingToggle = modal.querySelector('.cookie-toggle[data-category="marketing"]');
            
            if (preferenceToggle) preferenceToggle.checked = validConsent.preferences;
            if (statsToggle) statsToggle.checked = validConsent.statistics;
            if (marketingToggle) marketingToggle.checked = validConsent.marketing;
        }
        
        // Apply any necessary cookie settings based on consent
        console.log('Applying cookie settings based on consent');
        
        // Example: Load analytics if statistics are enabled
        if (validConsent.statistics) {
            console.log('Loading analytics (statistics enabled)');
            // Your analytics code here
        }
        
        // Example: Load marketing scripts if marketing is enabled
        if (validConsent.marketing) {
            console.log('Loading marketing scripts (marketing enabled)');
            // Your marketing scripts here
        }
        
        // Dispatch a custom event that other scripts can listen for
        document.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
            detail: validConsent
        }));
        
        console.log('Consent application complete');
    };
    
    const acceptAll = function(e) {
        console.log('=== acceptAll() called ===');
        if (e) {
            e.preventDefault();
            console.log('Event prevented');
        }
        
        console.log('Creating consent object');
        const consent = {
            preferences: true,
            statistics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };
        
        console.log('Calling saveConsent with:', consent);
        const saved = saveConsent(consent);
        console.log('saveConsent returned:', saved);
        
        if (saved) {
            console.log('Consent saved successfully, hiding banner');
            hideBanner();
            
            // Show confirmation message
            console.log('Creating confirmation message');
            const confirmation = document.createElement('div');
            confirmation.className = 'cookie-save-confirmation';
            confirmation.textContent = 'Sütik elfogadva';
            document.body.appendChild(confirmation);
            
            // Style the confirmation message
            console.log('Styling confirmation message');
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
            console.log('Setting up confirmation message timeout');
            setTimeout(() => {
                confirmation.style.opacity = '0';
                setTimeout(() => {
                    confirmation.remove();
                    console.log('Confirmation message removed');
                }, 300);
            }, 3000);
            
            console.log('acceptAll() completed successfully');
        } else {
            console.error('Failed to save consent');
        }
    };
    
    const setupEventListeners = function() {
        console.log('=== setupEventListeners() called ===');
        // Accept button
        const acceptBtn = document.querySelector('.cookie-consent-accept');
        console.log('Accept button element:', acceptBtn);
        if (acceptBtn) {
            console.log('Adding click event listener to accept button');
            acceptBtn.addEventListener('click', (e) => {
                console.log('Accept button clicked, calling acceptAll');
                acceptAll(e);
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
                
                console.log('Saving consent with values:', consent);
                
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
            console.log('=== CookieConsent.init() called ===');
            
            // Get DOM elements
            banner = document.querySelector('.cookie-consent-banner');
            modal = document.querySelector('.cookie-settings-modal');
            
            // Check if banner exists
            if (!banner) {
                console.error('Cookie consent banner element not found');
                return;
            }
            
            console.log('Banner element found, checking for existing consent...');
            
            // Check if already consented
            const consent = getConsent();
            if (consent) {
                console.log('Existing consent found:', consent);
                console.log('Applying existing consent...');
                applyConsent(consent);
                console.log('Existing consent applied, banner should be hidden');
                return;
            }
            
            console.log('No existing consent found, showing banner...');
            
            // Only set up event listeners if we're showing the banner
            console.log('Setting up event listeners...');
            setupEventListeners();
            
            // Show banner if no consent
            console.log('Showing banner...');
            showBanner();
            
            console.log('Cookie consent initialization complete');
        }
    };
})();
    
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
        console.log('Cookie consent already initialized');
        return;
    }
    
    // Make it globally available
    window.cookieConsent = CookieConsent;
    
    // Check for existing consent first
    if (hasValidConsent()) {
        console.log('Valid consent found, not showing banner');
        cookieConsentInitialized = true;
        
        // Still initialize but don't show banner
        window.cookieConsent.init();
        return;
    }
    
    console.log('No valid consent found, showing cookie banner');
    
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

// Start the initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize the page
        initializePage();
        
        // Initialize cart
        console.log('DOM fully loaded, initializing cart...');
        if (typeof initCart === 'function') {
            console.log('initCart function found, calling it...');
            initCart();
        } else {
            console.error('initCart function not found!');
        }
        
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
        
        // Initialize cart if it exists
        if (typeof cart !== 'undefined') {
            cart.init();
        }
        
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

// Example usage:
// showPopup({
//     content: '<h3>Hello!</h3><p>This is a popup message.</p>',
//     duration: 5000 // Optional: auto-close after 5 seconds
// });

// Show popup after 5 seconds when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Your existing DOMContentLoaded code here...
    
    // Add this new code
    setTimeout(function() {
        showPopup({
            duration: 0 // 0 means it won't auto-close
        });
    }, 5000); // 5000 milliseconds = 5 seconds
});