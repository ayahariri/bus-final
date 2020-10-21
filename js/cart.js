/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var getTable = document.getElementById('cart');
  getTable.children[1].innerHTML = '';

}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  var getTable = document.getElementById('cart');
  var tableBody = getTable.children[1];
  // console.log(tableBody);
  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR

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
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();