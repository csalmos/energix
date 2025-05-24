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
    mainImage.src = product.images[0] || 'placeholder.svg';
    mainImage.alt = product.name;

    mainImage.onerror = function() {
        console.error('Failed to load image:', this.src);
    };

    const thumbnailsContainer = document.getElementById('productThumbnails');
    thumbnailsContainer.innerHTML = '';

    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail${index === 0 ? ' active' : ''}`;
        thumbnail.dataset.image = image;

        const img = document.createElement('img');
        img.src = image;
        img.alt = `${product.name} - Kép ${index + 1}`;

        img.onerror = function() {
            console.error('Failed to load thumbnail:', this.src);
        };

        thumbnail.addEventListener('click', () => {
            mainImage.src = image;

            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            thumbnail.classList.add('active');

            mainImage.style.opacity = 0;
            setTimeout(() => {
                mainImage.style.opacity = 1;
            }, 100);
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
    
    // Set main image
    const mainImage = document.getElementById('productImage');
    if (mainImage) {
        mainImage.src = product.images[0] || 'placeholder.svg';
        mainImage.alt = product.name;
    }
    
    // Set thumbnails
    const thumbnails = document.getElementById('productThumbnails');
    if (thumbnails) {
        thumbnails.innerHTML = '';
        
        product.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.innerHTML = `
                <img src="${image}" alt="${product.name} kép ${index + 1}" 
                     onclick="setMainImage(this.src)">
            `;
            thumbnails.appendChild(thumbnail);
        });
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
            addToCartBtn.addEventListener('click', () => {
                const quantity = parseInt(quantityInput.value) || 1;
                const product = window.products[productId];
                
                if (product) {
                    addToCart(product, quantity);
                    console.log('After addToCart:', cart);
                    showNotification(`${quantity}x ${product.name} hozzáadva a kosárhoz!`);
                } else {
                    console.error('Product not found:', productId);
                }
            });
            addToCartBtn.setAttribute('data-has-listener', 'true');
        }
    }
}

// Initialize product page
function initializePage() {
    console.log('Initializing page...');

    // Check if we have products data
    if (typeof products === 'undefined' || !Object.keys(products).length) {
        console.error('Products not found');
        return;
    }

    // Check if we're on a product page
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    
    if (productId) {
        // Initialize product page if needed
        if (typeof initProductPage === 'function') {
            initProductPage(productId);
        }
        
        // Load related products if on a product page
        if (typeof loadRelatedProducts === 'function') {
            loadRelatedProducts(productId);
        }
    }
    
    // Initialize tabs and other UI components
    if (typeof initTabs === 'function') {
        initTabs();
    }
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

// Switch main image when clicking on thumbnail
function setMainImage(imageSrc) {
    const mainImage = document.getElementById('productImage');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
}

// Initialize tabs
function initTabs() {
    console.log('Initializing tabs...');
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

// Load related products
function loadRelatedProducts(currentProductId) {
    const relatedProductsContainer = document.getElementById('relatedProducts');
    if (!relatedProductsContainer) return;
    
    relatedProductsContainer.innerHTML = '';
    
    Object.keys(products).forEach(key => {
        if (key !== currentProductId) {
            const relatedProduct = products[key];
            const productElement = document.createElement('div');
            productElement.className = 'related-product';
            const imageUrl = relatedProduct.images[0] || 'placeholder.svg';
            
            productElement.innerHTML = `
                <a href="product.html?product=${relatedProduct.id}">
                    <div class="related-product-image" style="background-image: url('${imageUrl}')"></div>
                    <h3>${relatedProduct.name}</h3>
                    <div class="price">${relatedProduct.price.toLocaleString()} Ft</div>
                </a>
            `;
            relatedProductsContainer.appendChild(productElement);
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Add product page links to product cards
    document.querySelectorAll('.category-card').forEach(card => {
        const productLink = document.createElement('a');
        productLink.className = 'product-link';
        productLink.textContent = 'Tovább a termékre';
        productLink.style.cssText = `
            display: inline-block;
            margin: 10px 0 25px 0;
            padding: 8px 16px;
            background-color: #7ed957;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.3s;
        `;
        
        productLink.addEventListener('mouseover', () => {
            productLink.style.backgroundColor = '#66cc33';
        });
        
        productLink.addEventListener('mouseout', () => {
            productLink.style.backgroundColor = '#7ed957';
        });
        
        // Link to product page
        productLink.href = `product.html?product=${card.dataset.category}`;
        
        card.appendChild(productLink);
    });
    
    
    
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
    console.log('Initializing tabs...');
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

// Load related products
function loadRelatedProducts(currentProductId) {
    const relatedProductsContainer = document.getElementById('relatedProducts');
    if (!relatedProductsContainer) return;
    
    relatedProductsContainer.innerHTML = '';
    
    Object.keys(products).forEach(key => {
        if (key !== currentProductId) {
            const relatedProduct = products[key];
            const productElement = document.createElement('div');
            productElement.className = 'related-product';
            const imageUrl = relatedProduct.images[0] || 'placeholder.svg';
            
            productElement.innerHTML = `
                <a href="product.html?product=${relatedProduct.id}">
                    <div class="related-product-image" style="background-image: url('${imageUrl}')"></div>
                    <h3>${relatedProduct.name}</h3>
                    <div class="price">${relatedProduct.price.toLocaleString()} Ft</div>
                </a>
            `;
            relatedProductsContainer.appendChild(productElement);
        }
    });
}
