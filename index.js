const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeMenuBtn = document.querySelector('.close-menu');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; 
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = ''; 
});

const searchBtns = document.querySelectorAll('.search-btn');
const closeSearchBtn = document.querySelector('.close-search');
const searchOverlay = document.querySelector('.search-overlay');
const searchInput = document.querySelector('.search-input');

searchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        searchInput.focus(); // Auto focus the search input
    });
});

closeSearchBtn.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

const slides = document.querySelectorAll('.slider-content');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

let slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

/*const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});*/

// User dropdown functionality
const userToggle = document.querySelector('.user-toggle');
const userDropdown = document.querySelector('.user-dropdown');
const loginBtn = document.querySelector('.btn-login');

userToggle.addEventListener('click', (e) => {
    e.preventDefault();
    userDropdown.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!userDropdown.contains(e.target)) {
        userDropdown.classList.remove('active');
    }
});

document.getElementById("loginBtn").addEventListener("click", function () {
    window.location.href = "login.html";
})
document.getElementById("signBtn").addEventListener("click", function () {
    window.location.href = "sign.html";
})

// document.getElementById("menBtn").addEventListener("click", function () {
//     window.location.href = "team-merchandise.html";
// })
// document.getElementById("womenBtn").addEventListener("click", function () {
//     window.location.href = "team-merchandise.html";

// })
// document.getElementById("sportsBtn").addEventListener("click", function () {
//     window.location.href = "team-merchandise.html";
// })

// Product Listing Functionality
document.addEventListener('DOMContentLoaded', function () {
    const shopNowButtons = document.querySelectorAll('.shop-btn');
    const productListingOverlay = document.querySelector('.product-listing-overlay');
    const closeListingButton = document.querySelector('.close-listing');

    shopNowButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            productListingOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeListingButton.addEventListener('click', function () {
        productListingOverlay.classList.remove('active');
        document.body.style.overflow = ''; 
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && productListingOverlay.classList.contains('active')) {
            productListingOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    
    const filterBtn = document.querySelector('.filter-btn');
    const sortBtn = document.querySelector('.sort-btn');

    filterBtn.addEventListener('click', function () {
    
        console.log('Filter clicked');
    });

    sortBtn.addEventListener('click', function () {
       
        console.log('Sort clicked');
    });

   

});

document.getElementById("rcbBtn").addEventListener("click", function () {
    window.location.href = "team-merchandise.html";
})

document.getElementById("ferrariBtn").addEventListener("click", function () {
    window.location.href = "team-merchandise.html";
})

document.getElementById("dcBtn").addEventListener("click", function () {
    window.location.href = "team-merchandise.html";
})

// Product functionality
let products = [];
let cart = [];
let wishlist = [];

// Load products from JSON file
async function loadProducts() {
    try {
        const response = await fetch('selected_products.json');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Display products in the grid
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return; // Exit if grid doesn't exist on current page
    
    productsGrid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        const isWishlisted = wishlist.some(item => item.id === product.id);
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
                    <i class="fa${isWishlisted ? 's' : 'r'} fa-heart"></i>
                </button>
            </div>
            <div class="product-details">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">₹${product.price.toLocaleString()}</div>
                <button class="add-to-cart" onclick="addToCart('${product.id}', '${product.name}', '${product.category}', ${product.price}, '${product.image}')">
                    Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Initialize cart from localStorage
function initializeCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartIcon();
    }
}

// Toggle wishlist
function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const wishlistIndex = wishlist.findIndex(item => item.id === productId);
    if (wishlistIndex === -1) {
        // Add to wishlist
        wishlist.push(product);
        showNotification('Added to Wishlist!');
    } else {
        // Remove from wishlist
        wishlist.splice(wishlistIndex, 1);
        showNotification('Removed from Wishlist!');
    }

    // Update wishlist count
    updateWishlistIcon();
    // Refresh product display to update wishlist buttons
    filterProducts();
}

// Update wishlist icon
function updateWishlistIcon() {
    const wishlistIcon = document.querySelector('.fa-heart');
    if (wishlistIcon) {
        wishlistIcon.setAttribute('data-count', wishlist.length);
    }
}

// Filter products
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (!categoryFilter || !sortFilter) return;

    const category = categoryFilter.value;
    const sort = sortFilter.value;

    let filteredProducts = [...products];

    // Apply category filter
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    // Apply sorting
    switch (sort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    displayProducts(filteredProducts);
}

// Add to cart functionality
function addToCart(id, name, category, price, image) {
    // Initialize cart if not already done
    if (!cart) {
        cart = [];
    }

    const productToAdd = {
        id: parseInt(id),
        name: name,
        category: category,
        price: price,
        image: image,
        quantity: 1
    };

    // Check if product already exists in cart
    const duplicateProduct = cart.find(item => 
        item.name === name && 
        item.category === category
    );
    
    if (duplicateProduct) {
        showNotification('This product is already in your cart!', 'warning');
        return;
    }

    // Add to cart
    cart.push(productToAdd);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartIcon();
    showNotification('Product added to cart!', 'success');
}

// Update cart icon
function updateCartIcon() {
    const cartIcon = document.querySelector('.fa-shopping-cart');
    const cartBadge = document.querySelector('.cart-badge');
    const totalItems = cart.length;

    if (cartIcon) {
        cartIcon.setAttribute('data-count', totalItems);
    }

    if (cartBadge) {
        if (totalItems > 0) {
            cartBadge.style.display = 'flex';
            cartBadge.textContent = totalItems;
        } else {
            cartBadge.style.display = 'none';
        }
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }, 100);
}

// Add event listeners for add to cart buttons on index page
function initializeIndexPageCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        const productCard = button.closest('.product-card');
        if (productCard) {
            const productName = productCard.querySelector('.product-name').textContent;
            const productCategory = productCard.querySelector('.product-category').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('₹', '').replace(',', ''));
            const productImage = productCard.querySelector('img').src;
            const productId = button.getAttribute('data-product-id');

            button.onclick = () => addToCart(productId, productName, productCategory, productPrice, productImage);
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart first
    initializeCart();

    // Load products if on a page with product grid
    if (document.getElementById('productsGrid')) {
        loadProducts();
    }

    // Initialize cart functionality for index page
    initializeIndexPageCart();
    
    // Add filter change listeners if elements exist
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    if (sortFilter) {
        sortFilter.addEventListener('change', filterProducts);
    }
});

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 4px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .notification.success {
        background-color: #000;
        color: white;
    }

    .notification.warning {
        background-color: #ff6b6b;
        color: white;
    }

    .notification.show {
        opacity: 1;
        transform: translateY(0);
    }

    .fa-shopping-cart[data-count]:after {
        content: attr(data-count);
        position: absolute;
        top: -10px;
        right: -10px;
        background-color: #ff0000;
        color: white;
        font-size: 12px;
        padding: 2px 6px;
        border-radius: 50%;
        font-family: Arial, sans-serif;
    }
`;
document.head.appendChild(style);

