window.onload = async function(){
    if (!localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify({}));
    }
    if(!localStorage.getItem("cart")){
        localStorage.setItem("cart", JSON.stringify([]));
    }
    if(!localStorage.getItem("delivery-info")){
        localStorage.setItem("delivery-info", JSON.stringify({}));
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) {
        return (window.location.href = "login.html");
    }
    const shoppingCart = JSON.parse(localStorage.getItem("cart")); 
    const signOutButton = document.getElementById("sign-out-button");
    signOutButton.addEventListener("click", function(){
        localStorage.setItem("user", JSON.stringify({}))
        localStorage.setItem("cart", JSON.stringify([]))
        return window.location.href = "login.html"
    })

    const cartTable = document.getElementById("card-table");
    let i=0;
    let total = 0;
    for(let item of shoppingCart){
        cartTable.innerHTML += `
            <td>
                <div class="cart-info">
                    <img src="${item.image}">
                    <div>
                        <p>${item.name}</p>
                        Price: $${item.price} JMD
                        <br>
                        <a href="" id="remove-${i}">Remove</a>
                    </div>
                </div>
            </td>
            <td><input type="number" value="${item.quantity}" disabled></td>
            <td><input type="number" value="${parseFloat(item.quantity) * parseFloat(item.price)}" disabled></td>
            </tr>
            </tr>
        `
        total+=parseFloat(item.quantity) * parseFloat(item.price);
        i++;
    }
    let x=0;
    for(let item of shoppingCart){
        const removeButton = document.getElementById(`remove-${x}`);
        removeButton.addEventListener("click", function(){
            let shoppingCart = JSON.parse(localStorage.getItem("cart"));
            shoppingCart = shoppingCart.filter((cartItem)=>cartItem.name!==item.name)
            localStorage.setItem("cart", JSON.stringify(shoppingCart));
            window.location.reload();
        })
        x++;
    }
    const totalBox = document.getElementById("total-sum");
    totalBox.innerHTML += `
        <td>$${total} JMD</td>
    `
    const checkoutButton = document.getElementById("checkout-button");
    const errorMessage = document.getElementById("error-message");
    checkoutButton.addEventListener("click", async function(){
        const deliveryInput = document.getElementById("delivery-text").value;
        if(!deliveryInput) return errorMessage.innerHTML+="Enter delivery details"
        //add delivery detail to localstorage
        localStorage.setItem("delivery-info", JSON.stringify({text: deliveryInput}))

        //generate invoice
        /*const request = await fetch("https://invoice-generator.com",{
            method: "POST",
            body: JSON.stringify({
                from: "Crafty Organix",
                to: user.email,
                items: shoppingCart
            })
        });*/

        //push to upload proof of payment page
        window.location.href = "uploadproof.html";
    })
}