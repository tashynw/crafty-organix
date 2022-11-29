window.onload = function() {
    if(!localStorage.getItem("user")){
        localStorage.setItem("user",JSON.stringify({}))
    }
    const submitButton = document.getElementById("login-button");
    submitButton.addEventListener("click", async function login(e){
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        if(!email || !password){
            return document.getElementById("error-message").innerHTML = `Enter all fields`
        }
        const request = await fetch("php/login.php",{
            method: "POST",
            body: JSON.stringify({ email, password })
        });
        //add error handling
        if(!request.ok){
            //return error
            document.getElementById("error-message").innerHTML = `Login failed - Incorrect credentials`
        } else {
            //store session in local storage, push to home
            document.getElementById("error-message").innerHTML = ""
            localStorage.setItem("user",JSON.stringify({ email }));
            //push
            window.location.href = "index.html";
        }
    })
}