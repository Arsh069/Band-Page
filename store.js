if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready);
}
else{
    ready();
}


function ready(){

    var removeCartItemButtons=document.getElementsByClassName('btn-danger');
    for(var i=0;i<removeCartItemButtons.length;i++){
        var button=removeCartItemButtons[i];
        button.addEventListener('click',removeCartItems);
    }

    var quantityInputs=document.getElementsByClassName('cart-quantity-input');
    for(var i=0;i<quantityInputs.length;i++){
        var input=quantityInputs[i];
        input.addEventListener('change',quantityChanged);
    }

    var addToCartButtons=document.getElementsByClassName('shop-item-btn');
    for(var i=0;i<addToCartButtons.length;i++){
        var button=addToCartButtons[i];
        button.addEventListener('click',addToCartClicked);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked);

}


function purchaseClicked(event){
    alert('ThankYou For Your Purchase');
    var cartItemsPurchased=document.getElementsByClassName('cart-items')[0]
    while(cartItemsPurchased.hasChildNodes()){
        cartItemsPurchased.removeChild(cartItemsPurchased.firstChild)
    }
    updateCartTotal();
}

function removeCartItems(event){
    var clickedButton=event.target
    clickedButton.parentElement.parentElement.remove()
    updateCartTotal();
}


function quantityChanged(event){
    var input=event.target
    if(isNaN(input.value) || input.value<=0){
        input.value=1;
    }
    updateCartTotal();
}

function addToCartClicked(event){
    var button=event.target
    var shopItem=button.parentElement.parentElement;
    var title=shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price=shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc=shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title,price,imageSrc);
    updateCartTotal()

}


function addItemToCart(title,price,imageSrc){
    var cartRow=document.createElement('div')
   
    cartRow.classList.add('cart-row')
    var CartItems=document.getElementsByClassName('cart-items')[0]
    var cartItemNames=document.getElementsByClassName('cart-item-title')
    for(var i=0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerText==title){
            alert('Item is Already in the Cart')
            return;
        }
        
    } 
    var cartRowContents=`
        <div class="cart-item  cart-column">
            <img class="cart-item-image" src="${imageSrc}">
            <span class="cart-item-title"> ${title}</span>
        </div>


        <span class="cart-price cart-column"> ${price}</span>
        <div class="cart-item cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" role="button">REMOVE</button>
        </div>
        `    
    
    cartRow.innerHTML=cartRowContents
    CartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItems)
    cartRow.getElementsByClassName('cart-quantity-input')[0],addEventListener('change',quantityChanged)
}


function updateCartTotal(){
    var cartItemContainer=document.getElementsByClassName('cart-items')[0]
    var cartRows=cartItemContainer.getElementsByClassName('cart-row');
    var total=0;
    for(var i=0;i<cartRows.length;i++){
        var CartRow=cartRows[i];
        var CartPrice=CartRow.getElementsByClassName('cart-price')[0]
        var ItemQuantity=CartRow.getElementsByClassName('cart-quantity-input')[0]
        var price=parseFloat(CartPrice.innerText.replace('$',''))
        var quantity=ItemQuantity.value;
        total+=(price*quantity);
    }
    total=Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText='&'+total;
}