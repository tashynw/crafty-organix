window.onload = async function() {
    if(!localStorage.getItem("user")){
        localStorage.setItem("user",JSON.stringify({}))
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user?.email){   
        return window.location.href = "login.html"
    }
    if(!localStorage.getItem("cart")){
        localStorage.setItem("cart", JSON.stringify([]));
    }
    const signOutButton = document.getElementById("sign-out-button");
    signOutButton.addEventListener("click", function(){
        localStorage.setItem("user", JSON.stringify({}))
        return window.location.href = "login.html"
    })
    const container = document.getElementById("products-container");
    const request = await fetch("php/getproducts.php");
    const products = await request.json();
    let i=0;
    for (let product of products){
        container.innerHTML += !ifAdded(product) ? `
            <div class="content">        
                <img src="${product[4]}" width="300" height="300">
                
                <div class="product-body">
                    <h3 class = "name">${product[1]}</h3>
                    <p class = "description1">${product[2]}</p>
                    <h6 class = "price">${product[3]}<br/>Qtny: <input type="number" id="quantity-${i}" style="width: 25px;"/></h6>
                    <button class="buy-1" id="purchase-${i}" style="margin-top: 10px;">Buy Now</button>
                </div>
            </div>
        ` :
        `
            <div class="content">        
                <img src="${product[4]}" width="300" height="300">
                
                <div class="product-body">
                    <h3 class = "name">${product[1]}</h3>
                    <p class = "description1">${product[2]}</p>
                    <h6 class = "price">${product[3]}</h6>
                    <button class="buy-1" id="remove-${i}" style="margin-top: 10px;">Remove Cart</button>
                </div>
            </div>
        ` 
        i++;
    }

    let x=0;
    for(let product of products){
        if(!ifAdded(product)){
            console.log(document.getElementById(`quantity-${x}`))
            const buyButton = document.getElementById(`purchase-${x}`);
            const quantity = document.getElementById(`quantity-${x}`);
            buyButton.addEventListener("click", function(){
                const shoppingCart = JSON.parse(localStorage.getItem("cart"));
                shoppingCart.push({
                    name: product[1],
                    price: product[3],
                    quantity: quantity.value || 0
                }) 
                localStorage.setItem("cart", JSON.stringify(shoppingCart));
                window.location.reload();
            }) 
        } else {
            const removeButton = document.getElementById(`remove-${x}`);
            removeButton.addEventListener("click", function(){
                let shoppingCart = JSON.parse(localStorage.getItem("cart"));
                shoppingCart = shoppingCart.filter((item)=>product[1]!==item.name)
                localStorage.setItem("cart", JSON.stringify(shoppingCart));
                window.location.reload();
            }) 
        }
        x++;
    }

    function ifAdded(product){
        const cart = JSON.parse(localStorage.getItem("cart"));
        for(let item of cart){
            if(item.name==product[1]) return true;
        }
        return false;
    }
}