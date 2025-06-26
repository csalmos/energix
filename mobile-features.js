document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth > 768) return;

    const bottomSheet = document.createElement('div');
    bottomSheet.className = 'feature-bottom-sheet';
    bottomSheet.innerHTML = `
        <div class="feature-bottom-sheet-header">
            <h3 class="feature-bottom-sheet-content"></h3>
            <button class="close-bottom-sheet">&times;</button>
        </div>
    `;
    
    const backdrop = document.createElement('div');
    backdrop.className = 'feature-bottom-sheet-backdrop';
    
    document.body.appendChild(bottomSheet);
    document.body.appendChild(backdrop);
    
    const bottomSheetContent = bottomSheet.querySelector('.feature-bottom-sheet-content');
    const closeButton = bottomSheet.querySelector('.close-bottom-sheet');
    let currentActiveDot = null;
    
    // Add plus signs to all feature dots
    const featureDots = document.querySelectorAll('.feature-dot');

    // On homepage, we'll use the first set of feature dots (index 0)
    const isHomePage = window.location.pathname.endsWith('index.html') || 
                      window.location.pathname.endsWith('/') || 
                      window.location.pathname === '';// On homepage, we'll use the first set of feature dots (index 0)
    
    featureDots.forEach((dot, index) => {
        
        // Add plus sign
        const plus = document.createElement('div');
        plus.className = 'feature-dot-plus';
        dot.appendChild(plus);

        // Set default product type for homepage
        if (isHomePage) {
            dot.dataset.productType = 'eter';
        }
        
        // Position the dot absolutely at its current location
        dot.style.transform = 'translate(-50%, -50%)';
        dot.style.margin = '0';
        dot.style.touchAction = 'manipulation';
        
        // Ensure the dot has a data-label attribute
        const label = dot.querySelector('.feature-label');
        if (label) {
            const labelText = label.textContent || 'Részletek';
            dot.dataset.label = labelText;
            // Hide the original label
            label.style.display = 'none';
        } else {
            console.warn(`No label found for dot ${index + 1}`);
        }
    });
    
    // Update positions on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            featureDots.forEach(dot => {
                const rect = dot.getBoundingClientRect();
                originalPositions.set(dot, {
                    left: rect.left + window.scrollX,
                    top: rect.top + window.scrollY
                });
                dot.style.left = `${originalPositions.get(dot).left}px`;
                dot.style.top = `${originalPositions.get(dot).top}px`;
            });
        }, 100);
    });

    // Add click handler for feature dots
    document.addEventListener('click', function handleDotClick(e) {
        const dot = e.target.closest('.feature-dot');
        if (!dot) return;
        
        // Prevent default to avoid any unwanted behavior
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle active state
        const isActive = dot.classList.toggle('active');
        
        // If this dot was already active, just close the sheet and return
        if (currentActiveDot === dot && !isActive) {
            closeBottomSheet();
            currentActiveDot = null;
            return;
        }
        
        // Deactivate any other active dot
        if (currentActiveDot && currentActiveDot !== dot) {
            currentActiveDot.classList.remove('active');
        }
        
        // Set the current active dot
        currentActiveDot = isActive ? dot : null;
        
        // Show or hide bottom sheet based on active state
        if (isActive) {
            showBottomSheet(dot.dataset.label);
        } else {
            closeBottomSheet();
        }
    }, { capture: true }); // Use capture phase to ensure we catch the event
    
    // Close bottom sheet when clicking the close button or backdrop
    closeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentActiveDot) {
            currentActiveDot.classList.remove('active');
            currentActiveDot = null;
        }
        closeBottomSheet();
    });
    
    backdrop.addEventListener('click', function() {
        if (currentActiveDot) {
            currentActiveDot.classList.remove('active');
            currentActiveDot = null;
        }
        closeBottomSheet();
    });
    
    // Close when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (currentActiveDot) {
                currentActiveDot.classList.remove('active');
                currentActiveDot = null;
            }
            closeBottomSheet();
        }
    });
    
    function showBottomSheet(content) {
        if (!content) {
            console.error('No content provided for bottom sheet');
            return;
        }
        
        // Make sure the content element exists and is accessible
        if (!bottomSheetContent) {
            console.error('Bottom sheet content element not found');
            return;
        }
        
        // Update content and show the bottom sheet
        bottomSheetContent.textContent = content;
        
        // Ensure the bottom sheet is visible
        bottomSheet.style.display = 'block';
        bottomSheet.style.visibility = 'visible';
        
        // Force reflow to ensure styles are applied
        void bottomSheet.offsetHeight;
        
        // Add active class for any animations
        bottomSheet.classList.add('active');
        backdrop.classList.add('active');
        
        // Prevent body scroll when bottom sheet is open
        document.body.style.overflow = 'hidden';
    }
    
    function closeBottomSheet() {
        // Only remove active class, don't hide the element
        bottomSheet.classList.remove('active');
        backdrop.classList.remove('active');
        
        // Re-enable body scroll
        document.body.style.overflow = '';
        
        // Remove active state from current dot
        if (currentActiveDot) {
            currentActiveDot.classList.remove('active');
            currentActiveDot = null;
        }
    }
    
    // Add touch event for better mobile interaction
    let startY;
    let isSwiping = false;
    
    bottomSheet.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        isSwiping = false;
    }, { passive: true });
    
    bottomSheet.addEventListener('touchmove', function(e) {
        if (!bottomSheet.classList.contains('active')) return;
        
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;
        
        // Only allow swiping down to close
        if (deltaY > 0) {
            e.preventDefault();
            isSwiping = true;
            const translateY = Math.min(deltaY, 100);
            bottomSheet.style.transform = `translateY(${translateY}px)`;
            backdrop.style.opacity = 1 - (translateY / 200);
        }
    }, { passive: false });
    
    bottomSheet.addEventListener('touchend', function() {
        if (!isSwiping) return;
        
        if (parseInt(bottomSheet.style.transform || '0') > 50) {
            closeBottomSheet();
            if (currentActiveDot) {
                currentActiveDot.classList.remove('active');
                currentActiveDot = null;
            }
        }
        
        // Reset styles
        bottomSheet.style.transform = '';
        backdrop.style.opacity = '';
    }, { passive: true });
});