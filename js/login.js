window.onload = function() {
    if(!localStorage.getItem("user")){
        localStorage.setItem("user",JSON.stringify({}))
    }
    const submitButton = document.getElementById("login-button");
    submitButton.addEventListener("click", async function login(e){
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const request = await fetch("php/login.php",{
            method: "POST",
            body: JSON.stringify({ email, password })
        });
        //add error handling
        if(!request.ok){
            //return error
        } else {
            //store session in local storage, push to home
            localStorage.setItem("user",JSON.stringify({ email }));
            //push
            window.location.href = "index.html";
        }
    })
}