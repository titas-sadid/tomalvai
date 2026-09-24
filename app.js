/* =========================================
   TOMAL E-COMMERCE JAVASCRIPT
========================================= */

let cart = [];


/* ================= ADD TO CART ================= */

function addToCart(name, price) {

    const existing = cart.find(item => item.name === name);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    alert(name + " added to cart!");

}


/* ================= UPDATE CART ================= */

function updateCart() {

    let count = 0;
    let total = 0;

    cart.forEach(item => {

        count += item.quantity;
        total += item.price * item.quantity;

    });

    document.getElementById("cartCount").innerText = count;
    document.getElementById("cartTotal").innerText = total;

    renderCart();

}


/* ================= RENDER CART ================= */

function renderCart() {

    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="padding:20px 0;color:#777;">
                Your cart is empty.
            </p>
        `;

        return;
    }


    cartItems.innerHTML = cart.map((item, index) => {

        return `

            <div class="cart-item">

                <div>

                    <strong>${item.name}</strong>

                    <p>
                        ৳${item.price} × ${item.quantity}
                    </p>

                </div>

                <div>

                    <button
                        onclick="changeQuantity(${index}, -1)"
                        style="border:0;padding:5px 9px;cursor:pointer;">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="changeQuantity(${index}, 1)"
                        style="border:0;padding:5px 9px;cursor:pointer;">
                        +
                    </button>

                </div>

            </div>

        `;

    }).join("");

}


/* ================= QUANTITY ================= */

function changeQuantity(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();

}


/* ================= OPEN CART ================= */

function openCart() {

    document.getElementById("cartModal").style.display = "flex";

    renderCart();

}


/* ================= CLOSE CART ================= */

function closeCart() {

    document.getElementById("cartModal").style.display = "none";

}


/* ================= CHECKOUT ================= */

function checkoutCart() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    let message = "🌿 *TOMAL NEW ORDER*%0A%0A";

    let total = 0;


    cart.forEach(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        message +=
            "🛍️ Product: " + item.name +
            "%0AQuantity: " + item.quantity +
            "%0APrice: ৳" + subtotal +
            "%0A%0A";

    });


    message +=
        "💰 *Total: ৳" + total + "*%0A%0A" +
        "Please confirm my order.";


    window.open(
        "https://wa.me/8801722332233?text=" + message,
        "_blank"
    );

}


/* ================= QUICK ORDER ================= */

function quickOrder(product, price) {

    document.getElementById("orderProduct").value = product;

    document.getElementById("order").scrollIntoView({
        behavior: "smooth"
    });

}


/* ================= ORDER FORM ================= */

function submitOrder(event) {

    event.preventDefault();


    const name =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const address =
        document.getElementById("customerAddress").value.trim();

    const product =
        document.getElementById("orderProduct").value;

    const quantity =
        document.getElementById("orderQuantity").value;


    if (!product) {

        alert("Please select a product.");

        return;

    }


    let message =
        "🌿 *TOMAL NEW ORDER*%0A%0A" +

        "👤 *Customer:* " + encodeURIComponent(name) +
        "%0A" +

        "📞 *Phone:* " + encodeURIComponent(phone) +
        "%0A" +

        "📦 *Product:* " + encodeURIComponent(product) +
        "%0A" +

        "🔢 *Quantity:* " + quantity +
        "%0A" +

        "📍 *Address:* " + encodeURIComponent(address) +
        "%0A%0A" +

        "Please confirm my order.";


    const whatsappURL =
        "https://wa.me/8801722332233?text=" + message;


    window.open(whatsappURL, "_blank");

}


/* ================= MOBILE MENU ================= */

function toggleMenu() {

    document
        .getElementById("mobileMenu")
        .classList.toggle("active");

}


/* ================= SEARCH MODAL ================= */

function openSearch() {

    document.getElementById("searchModal").style.display = "flex";

    setTimeout(() => {

        document.getElementById("modalSearch").focus();

    }, 100);

}


function closeSearch() {

    document.getElementById("searchModal").style.display = "none";

}


/* ================= PRODUCT SEARCH ================= */

function searchProducts() {

    const input =
        document.getElementById("productSearch")
        .value
        .toLowerCase();


    const cards =
        document.querySelectorAll(
            "#allProducts .product-card"
        );


    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();


        if (text.includes(input)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


/* ================= MODAL SEARCH ================= */

function searchFromModal() {

    const input =
        document.getElementById("modalSearch")
        .value
        .toLowerCase();


    closeSearch();


    document.getElementById("productSearch").value = input;

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });


    searchProducts();

}


/* ================= CLOSE MODAL ON OUTSIDE CLICK ================= */

window.addEventListener("click", function(event) {

    const modal =
        document.getElementById("cartModal");

    const search =
        document.getElementById("searchModal");


    if (event.target === modal) {

        closeCart();

    }


    if (event.target === search) {

        closeSearch();

    }

});


/* ================= INITIALIZE ================= */

updateCart();
