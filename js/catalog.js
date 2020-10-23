/* global Product, Cart */

'use strict';

// empty cart
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
function populateForm() {

  //add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var dropdownItem = document.createElement('option');
    dropdownItem.textContent = Product.allProducts[i].name;
    dropdownItem.setAttribute('value', Product.allProducts[i].name);
    selectElement.appendChild(dropdownItem);
  }
}
populateForm();
// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // prevent the page from reloading
  event.preventDefault();

  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// add the selected item and quantity to the cart
function addSelectedItemToCart() {

  // TODO: dropdown
  var dropDown = document.getElementById('items');
  var selectedItem = dropDown.value;
  console.log(selectedItem);

  // get the quantity
  var quantityInput = document.getElementById('quantity');
  var itemQuantity = parseInt(quantityInput.value);
  quantityInput.value = '',
    console.log(itemQuantity);

  //  add one item to the Cart
  cart.addItem(selectedItem, itemQuantity);
  console.log(cart);
}

// update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var cartCountSpan = document.getElementById('itemCount');
  cartCountSpan.textContent = cart.items.length;
}

// add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  var cartPreview = document.getElementById('cartContents');
  cartPreview.innerHTML = '';
  // add a new element to the cartContents div with that information
  for (var i = 0; i < cart.items.length; i++) {
    var itemRow = document.createElement('div');
    var itemImage = document.createElement('img');
    var getProdName = cart.items[i].product;
    for (var j = 0; j < Product.allProducts.length; j++) {
      if (Product.allProducts[j].name === getProdName) {
        console.log(Product.allProducts[j].filePath);
        itemImage.setAttribute('src', Product.allProducts[j].filePath);
        break;
      }
    }
    var itemName = document.createElement('h6');
    itemName.textContent = cart.items[i].product;
    var itemQuantity = document.createElement('h6');
    itemQuantity.textContent = cart.items[i].quantity;
    itemRow.appendChild(itemImage);
    itemRow.appendChild(itemName);
    itemRow.appendChild(itemQuantity);

    cartPreview.appendChild(itemRow);
  }
  cartPreview.appendChild(confirmationBtnDiv);
}
var confirmationBtnDiv = document.createElement('div');
var confirmationBtn = document.createElement('button');
confirmationBtn.textContent = 'Confirm order and checkout';
confirmationBtn.textContent = 'Confirm order and checkout';
confirmationBtnDiv.appendChild(confirmationBtn);
  confirmationBtn.addEventListener('click', function(){
    var confirmation = confirm('Are you sure you want to checkout?');
    if(confirmation){
  window.location.href = 'cart.html';
}
});
// confirmationBtn.addEventListener();

// submit form

var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();