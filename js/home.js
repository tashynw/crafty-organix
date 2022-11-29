window.onload = function() {
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
}