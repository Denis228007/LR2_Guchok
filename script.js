document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products");
    const filterSelect = document.getElementById("filter");
    const searchInput = document.getElementById("search");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total");
    const cartButton = document.getElementById("cart-button");
    const cart = document.getElementById("cart");

    let products = [];
    let cartData = [];

    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts(products);
            populateFilterOptions(products);
        })
        .catch(error => console.error("Помилка завантаження JSON:", error));

    function renderProducts(items) {
        productsContainer.innerHTML = "";
        items.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>Виробник: ${product.manufacturer}</p>
                <p>Ціна: ${product.price} грн</p>
                <button onclick="addToCart(${product.id})">Додати в кошик</button>
            `;
            productsContainer.appendChild(productElement);
        });
    }

    function populateFilterOptions(products) {
        const types = [...new Set(products.map(p => p.type))];
        types.forEach(type => {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type;
            filterSelect.appendChild(option);
        });
    }

    window.addToCart = function (id) {
        const product = products.find(p => p.id === id);
        cartData.push(product);
        updateCart();
    };

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        cartData.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - ${item.price} грн <button onclick="removeFromCart(${index})">❌</button>`;
            cartItems.appendChild(li);
            total += item.price;
        });
        totalPrice.textContent = total;
    }

    window.removeFromCart = function (index) {
        cartData.splice(index, 1);
        updateCart();
    };

    filterSelect.addEventListener("change", () => {
        const selectedType = filterSelect.value;
        const filteredProducts = selectedType === "all" ? products : products.filter(p => p.type === selectedType);
        renderProducts(filteredProducts);
    });

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(p => p.name.toLowerCase().includes(query) || p.manufacturer.toLowerCase().includes(query));
        renderProducts(filteredProducts);
    });


    cartButton.addEventListener("click", () => {
        cart.style.display = cart.style.display === "block" ? "none" : "block";
    });
});
