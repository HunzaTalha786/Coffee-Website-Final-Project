

const searchForm = document.getElementById('search-form');
const searchBar = document.getElementById('search-bar');
const menuSection = document.getElementById('menu');
const menuCards = document.querySelectorAll('.menu .card'); 

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchTerm = searchBar.value.trim().toLowerCase(); 

    let foundMatch = false;
    menuCards.forEach(function (card) {
        const coffeeName = card.querySelector('h3').textContent.toLowerCase();

        if (coffeeName.includes(searchTerm)) {
            foundMatch = true;
            card.style.backgroundColor = "#f0c4a4"; 
            card.querySelector('h3').style.color = "#fff"; 
        } else {
            card.style.backgroundColor = ""; 
            card.querySelector('h3').style.color = ""; 
        }
    });

    if (foundMatch) {
        menuSection.scrollIntoView({ behavior: "smooth" });
    } else {
        alert('No matching coffee found!');
    }
});


document.querySelectorAll('.productCard').forEach(card => {
    card.addEventListener('click', function () {
        const productId = this.getAttribute('data-id');
        window.location.href = `productPage.html?id=${productId}`; 
    });
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="Product Image">
                <p>${item.name} - $${item.price}</p>
            </div>
        `;
        total += item.price;
    });

    document.getElementById('total-price').innerText = `Total: $${total}`;
    updateCartCount(); 
}

function clearCart() {
    localStorage.removeItem('cart'); 
    cart = []; 
    renderCart(); 
    updateCartCount(); 
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.innerText = cart.length;
}

function addToCart(product) {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex >= 0) {
        alert("This product is already in the cart!");
    } else {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart)); 
    }

    const cartMessage = document.getElementById('cart-message');
    cartMessage.style.display = 'block';

    setTimeout(() => {
        cartMessage.style.display = 'none';
    }, 3000);

    updateCartCount();
}

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function () {
        const productId = this.getAttribute('data-id'); 

        const product = products.find(p => p.id == productId);

        if (product) {
            addToCart(product); 
        }
    });
});

function initializeCart() {
    renderCart(); 
    updateCartCount(); 
}

window.onload = initializeCart;

