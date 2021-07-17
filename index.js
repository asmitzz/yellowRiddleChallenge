var cart = [];

const fetchData = () => {
  fetch("https://yellowriddle.netlify.app/products.json")
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      cart = data.products.map((product) => {
        return { ...product, qty: 1 };
      });
      let container = document.querySelector(".product-cart-1");

      for (let i = 0; i < cart.length; i++) {
        let html = `
             <div class="product-img-inner">
               <div class="product-img"> 
                  <img class="img" src="${cart[i].img}" />
                  <div class="product-cart1-details">
                    <p class="product-name">${cart[i].name}</p>
                    <small class="Product-seller">Seller:${cart[i].seller}
                      <img class="fAssured-true" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png" />
                    </small>
            
                    <div class="Product-details">
                       <p class="final-price">${cart[i].finalPrice} ${cart[i].currency}</p>   &nbsp;
                       <p class="original-price">${cart[i].originalPrice} ${cart[i].currency}</p>&nbsp;
                       <p class="discount-percentage">${cart[i].discountPercentage}% OFF</p>&nbsp;
                       <p class="product-offer">${cart[i].offers.count} Offers available</p>
                       <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" class="_3GN0Y0"><g fill="none"><path d="M-1-1h16v16H-1"></path><path d="M7 0C3.136 0 0 3.136 0 7s3.136 7 7 7 7-3.136 7-7-3.136-7-7-7zm.7 10.5H6.3V6.3h1.4v4.2zm0-5.6H6.3V3.5h1.4v1.4z" fill="#388e3c" class=""></path></g></svg>
                    </div>
                  </div>
                  <div class="product-cart1-delivery-details">
                      <p class="product-delivery-date">Delivery by ${cart[i].delivery.estimatedDate} | Free <span class="strike-fee"> ₹${cart[i].delivery.originalDeliveryCharge}</span></p>
                      <small class="product-replacement">${cart[i].delivery.replacementPolicyDuration} Replacement Policy</small>
                  </div>
              </div>
              <div class="cart-action">
                 <div class="quantity">
                    <a href="#" onclick="decrementQty(${i})" id="quantity__minus"><span class="minus">-</span></a> &nbsp;
                    <input name="quantity" onchange="updateQty(${i})" type="number" id="quantity__input" value=${cart[i].qty}> &nbsp;
                    <a href="#" onclick="incrementQty(${i})" id="quantity__plus"><span class="plus">+</span></a> &nbsp;
                </div>
                <div class="action-btn">
                  <button  class="save-later">SAVE FOR LATER</button>
                  <button class="remove-btn">REMOVE<button>
                </div>
              </div> 
            </div>`;

        container.innerHTML += html;
      }
      updatePrice(cart);
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchData();

function decrementQty(i) {
  let getItem = document.querySelectorAll("#quantity__input")[i];
  cart[i].qty--;
  getItem.value = cart[i].qty;
  updatePrice(cart)
}

function incrementQty(i) {
    let getItem = document.querySelectorAll("#quantity__input")[i];
    cart[i].qty++;
    getItem.value = cart[i].qty;
    updatePrice(cart)
}

function updatePrice(cart){
    let getPriceElement = document.querySelector(".price"); 
    let getDiscountElement = document.querySelector(".discount-offered"); 
    let totalAmountSaveElement = document.querySelector(".offer-onAmount"); 
    let getAmountElement = document.querySelector(".amount"); 
    let totalPrice = cart.reduce((acc,i) => acc + i.qty*i.originalPrice,0)
    let totalItem = cart.reduce((acc,i) => acc + i.qty,0)
    let totalDiscount = cart.reduce((acc,i) => acc + parseInt(i.qty*i.originalPrice) - i.qty*i.finalPrice,0)

    let price = `
    <div>Price (${totalItem} items)</div>
    <div>₹ ${totalPrice.toLocaleString()}</div>
    `
    getPriceElement.innerHTML = price;
    getDiscountElement.innerHTML = `- ${totalDiscount.toLocaleString()}`;
    getAmountElement.innerHTML = `₹ ${(totalPrice - totalDiscount).toLocaleString()}`;
    totalAmountSaveElement.innerHTML = `You'll save ${totalDiscount.toLocaleString()} on this order.`
}

function updateQty(i){
    let getItem = document.querySelectorAll("#quantity__input")[i];
    cart[i].qty = parseInt(getItem.value);
    updatePrice(cart)
}