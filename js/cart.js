/* global Cart */
'use strict';

// event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var getTable = document.getElementById('cart');
  getTable.children[1].innerHTML = '';

}

//  <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // the table body
  var getTable = document.getElementById('cart');
  var tableBody = getTable.children[1];
  // console.log(tableBody);

  for (var i = 0; i < cart.items.length; i++) {
    var tableRow = document.createElement('tr');
    var itemQuantity = document.createElement('td');
    var imgTd = document.createElement('td');
    itemQuantity.textContent = cart.items[i].quantity;
    var itemRemove = document.createElement('td');
    var itemRemoveBtn = document.createElement('button');
    itemRemoveBtn.textContent = 'x';
    var itemImage = document.createElement('img')
    var getProdName = cart.items[i].product;
    for (var j = 0; j < Product.allProducts.length; j++) {
      if (Product.allProducts[j].name === getProdName) {
        console.log(Product.allProducts[j].filePath);
        itemImage.setAttribute('src', Product.allProducts[j].filePath);
        break;
      }
    }
  imgTd.appendChild(itemImage);
  itemRemoveBtn.setAttribute('id', cart.items[i].Product);
  itemRemove.appendChild(itemRemoveBtn);
  tableRow.appendChild(itemRemove);
  tableRow.appendChild(itemQuantity);
  tableRow.appendChild(imgTd);
  tableBody.appendChild(tableRow);
}
}

function removeItemFromCart(event) {
  var clickedElementId = event.target.id;
  
  if(clickedElementId && clickedElementId !== 'table'){
    cart.removeItem(clickedElementId);
  }

  // Re-draw the cart table & saving cart to localStorage
  renderCart();
}

// initialize the page and draw the cart on screen
renderCart();