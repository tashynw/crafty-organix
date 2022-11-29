window.onload = function() {
    if(!localStorage.getItem("user")){
        localStorage.setItem("user",JSON.stringify({}))
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user?.email){   
        return window.location.href = "login.html"
    }
}