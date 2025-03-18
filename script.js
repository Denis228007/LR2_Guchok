document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products");
    const filterSelect = document.getElementById("filter");
    const searchInput = document.getElementById("search");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total");
    
    let products = [];
    let cart = [];

    
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts(products);
            populateFilterOptions(products);
        })
        .catch(error => console.error("Помилка завантаження JSON:", error));

    
    
});
