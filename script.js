// // Shopping Cart Functionality
// const cartModal = document.querySelector('.cart-modal');
// const cartItems = document.getElementById('cart-items');
// const closeCartBtn = document.getElementById('close-cart');
// let cart = [];

// // Add to Cart Event Listeners
// document.querySelectorAll('.fas fa-plus-circle').forEach(button => {
//     button.addEventListener('click', function () {
//         const productCard = this.closest('.product-body');
//         const product = {
//             id: productCard.dataset.id,
//             name: productCard.dataset.name,
//             price: parseFloat(productCard.dataset.price)
//         };

//         // Check if product already in cart
//         const existingProduct = cart.find(item => item.id === product.id);
//         if (existingProduct) {
//             existingProduct.quantity++;
//         } else {
//             product.quantity = 1;
//             cart.push(product);
//         }

//         updateCart();
//         openCart();
//     });
// });

// // Remove from Cart Function
// function removeFromCart(id) {
//     cart = cart.filter(item => item.id !== id);
//     updateCart();
// }

// // Update Cart Display
// function updateCart() {
//     cartItems.innerHTML = '';
//     cart.forEach(item => {
//         const cartItemElement = document.createElement('div');
//         cartItemElement.classList.add('cart-item');
//         cartItemElement.innerHTML = `
//             <div>
//                 <span>${item.name}</span>
//                 <span>$${(item.price * item.quantity).toFixed(2)}</span>
//                 <span>Qty: ${item.quantity}</span>
//             </div>
//             <button class="remove-item" onclick="removeFromCart('${item.id}')">Remove</button>
//         `;
//         cartItems.appendChild(cartItemElement);
//     });
// }

// // Open Cart
// function openCart() {
//     cartModal.style.display = 'block';
// }

// // Close Cart
// closeCartBtn.addEventListener('click', () => {
//     cartModal.style.display = 'none';
// });

// // Add to Cart Event Listeners
// document.querySelectorAll('.basket').forEach(button => {
// button.addEventListener('click', function () {
//     const productCard = this.closest('.product-card');
//     const product = {
//         id: productCard.dataset.id,
//         name: productCard.dataset.name,
//         price: parseFloat(productCard.dataset.price)
//     };

//     // Check if product already in cart
//     const existingProduct = cart.find(item => item.id === product.id);
//     if (existingProduct) {
//         existingProduct.quantity++;
//     } else {
//         product.quantity = 1;
//         cart.push(product);
//     }

//     updateCart();
//     openCart();
// });
// });








// Shopping Cart Functionality
const totalPriceElement = document.querySelector('.total');
const productCards = document.querySelectorAll('.card-body');

// Initialize cart as an array to store products
let cart = [];

// Update Total Price
function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.textContent = `${total.toFixed(2)} $`;
}

// Update Quantity Display
function updateQuantityDisplay(card, quantity) {
    card.querySelector('.quantity').textContent = quantity;
}

// Add Event Listeners to Buttons
productCards.forEach((card) => {
    const productName = card.querySelector('.card-title').textContent;
    const productPrice = parseFloat(card.querySelector('.unit-price').textContent);
    const quantityElement = card.querySelector('.quantity');
    const plusButton = card.querySelector('.fa-plus-circle');
    const minusButton = card.querySelector('.fa-minus-circle');
    const deleteButton = card.querySelector('.fa-trash-alt');
    const likeButton = card.querySelector('.fa-heart');

    let product = {
        name: productName,
        price: productPrice,
        quantity: 0,
    };

    // Handle Plus Button
    plusButton.addEventListener('click', () => {
        product.quantity++;
        updateQuantityDisplay(card, product.quantity);

        // Add to cart or update quantity
        const existingProduct = cart.find((item) => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity = product.quantity;
        } else {
            cart.push(product);
        }

        updateTotalPrice();
    });

    // Handle Minus Button
    minusButton.addEventListener('click', () => {
        if (product.quantity > 0) {
            product.quantity--;
            updateQuantityDisplay(card, product.quantity);

            if (product.quantity === 0) {
                cart = cart.filter((item) => item.name !== product.name);
            } else {
                const existingProduct = cart.find((item) => item.name === product.name);
                if (existingProduct) {
                    existingProduct.quantity = product.quantity;
                }
            }

            updateTotalPrice();
        }
    });

    // Handle Delete Button
    deleteButton.addEventListener('click', () => {
        product.quantity = 0;
        updateQuantityDisplay(card, product.quantity);

        cart = cart.filter((item) => item.name !== product.name);
        updateTotalPrice();
    });

    // Handle Like Button
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('liked');
        if (likeButton.classList.contains('liked')) {
            likeButton.style.color = 'red';
        } else {
            likeButton.style.color = '';
        }
    });
});
