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
    for (let product of products){
        container.innerHTML += `
            <div class="content">        
                <img src="${product[4]}" width="300" height="300">
                
                <div class="product-body">
                    <h3 class = "name">${product[1]}</h3>
                    <p class = "description1">${product[2]}</p>
                    <h6 class = "price">${product[3]}</h6>
                    <button class="buy-1">Buy Now</button>
                </div>
            </div>
        `
    }
}