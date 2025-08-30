// Get product ID from URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load product details
function loadProductDetails() {
    const productId = getProductIdFromUrl();
    if (!productId) {
        window.location.href = 'index.html';
        return;
    }

    const product = getTshirtProductById(parseInt(productId));
    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    // Update DOM with product details
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `₹${product.price.toLocaleString()}`;
    
    // Add product category and type
    document.title = `${product.name} - PUMA`;
    
    // Add category and type info
    const productInfo = document.querySelector('.product-info-section');
    const categoryTypeInfo = document.createElement('div');
    categoryTypeInfo.className = 'category-type-info';
    categoryTypeInfo.innerHTML = `
        <p class="product-category">${product.category}</p>
        <p class="product-type">${product.type}</p>
    `;
    productInfo.insertBefore(categoryTypeInfo, document.querySelector('.size-selector'));
}

// Handle size selection
function initializeSizeSelector() {
    const sizeOptions = document.querySelectorAll('.size-option');
    let selectedSize = null;

    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            option.classList.add('selected');
            selectedSize = option.textContent; // Use the actual size text (S, M, L, etc.)
        });
    });

    return () => selectedSize;
}

// Add to Cart functionality
function initializeAddToCart(getSelectedSize) {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        const selectedSize = getSelectedSize();
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        const productId = getProductIdFromUrl();
        const product = getTshirtProductById(parseInt(productId));

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === product.id && item.size === selectedSize);

        if (existingItem) {
            existingItem.quantity += 1;
            alert(`${product.name} quantity increased in cart!`);
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: selectedSize,
                quantity: 1,
                category: product.category,
                type: product.type
            });
            alert(`${product.name} added to cart successfully!`);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
    });
}

// Buy Now functionality
function initializeBuyNow(getSelectedSize) {
    const buyNowBtn = document.getElementById('buy-now-btn');
    buyNowBtn.addEventListener('click', () => {
        const selectedSize = getSelectedSize();
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        const productId = getProductIdFromUrl();
        const product = getTshirtProductById(parseInt(productId));

        // Add to cart first
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize,
            quantity: 1,
            category: product.category,
            type: product.type
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Redirect to checkout
        window.location.href = 'checkout.html';
    });
}

// Update cart badge
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadProductDetails();
    const getSelectedSize = initializeSizeSelector();
    initializeAddToCart(getSelectedSize);
    initializeBuyNow(getSelectedSize);
    updateCartBadge();
}); 