// Sample product data
const products = [
    {
        id: 1,
        name: "Men's T-Shirt",
        price: 29.99,
        category: "men",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
        description: "A comfortable and stylish t-shirt made from 100% cotton."
    },
    {
        id: 2,
        name: "Women's Dress",
        price: 49.99,
        category: "women",
        image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500&h=600&fit=crop",
        description: "Elegant dress perfect for any occasion."
    },
    {
        id: 3,
        name: "Kids' Jeans",
        price: 24.99,
        category: "kids",
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=600&fit=crop",
        description: "Durable and comfortable jeans for kids."
    },
    {
        id: 4,
        name: "Men's Jeans",
        price: 39.99,
        category: "men",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
        description: "Classic fit jeans for men."
    },
    {
        id: 5,
        name: "Women's Blouse",
        price: 34.99,
        category: "women",
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&h=600&fit=crop",
        description: "Stylish blouse for women."
    },
    {
        id: 6,
        name: "Kids' T-Shirt",
        price: 19.99,
        category: "kids",
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=600&fit=crop",
        description: "Fun and colorful t-shirt for kids."
    }
];

// Cart data
let cart = [];

// DOM Elements
const homeSection = document.getElementById('home-section');
const productsSection = document.getElementById('products-section');
const cartSection = document.getElementById('cart-section');
const featuredProducts = document.getElementById('featured-products');
const productsGrid = document.getElementById('products-grid');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    loadAllProducts();
    updateCartCount();
});

// Show home section
function showHome() {
    homeSection.style.display = 'block';
    productsSection.style.display = 'none';
    cartSection.style.display = 'none';
}

// Show products section
function showProducts() {
    homeSection.style.display = 'none';
    productsSection.style.display = 'block';
    cartSection.style.display = 'none';
}

// Show cart section
function showCart() {
    homeSection.style.display = 'none';
    productsSection.style.display = 'none';
    cartSection.style.display = 'block';
    updateCart();
}

// Load featured products
function loadFeaturedProducts() {
    featuredProducts.innerHTML = '';
    const featured = products.slice(0, 3);
    
    featured.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        featuredProducts.appendChild(col);
    });
}

// Load all products
function loadAllProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(col);
    });
}

// Filter products by category
function filterProducts() {
    const category = document.getElementById('category-filter').value;
    productsGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    filteredProducts.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(col);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showCart();
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <button class="btn btn-primary" onclick="showProducts()">Continue Shopping</button>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${item.image}" alt="${item.name}" class="img-fluid">
                    </div>
                    <div class="col-md-4">
                        <h5>${item.name}</h5>
                    </div>
                    <div class="col-md-2">
                        <p>$${item.price}</p>
                    </div>
                    <div class="col-md-2">
                        <input type="number" class="form-control quantity-input" 
                               value="${item.quantity}" 
                               min="1" 
                               onchange="updateQuantity(${item.id}, this.value)">
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    updateCartSummary();
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Update quantity
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity);
        updateCart();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    updateCartCount();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
} 