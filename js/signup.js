window.onload = function() {
    if(!localStorage.getItem("user")){
        localStorage.setItem("user",JSON.stringify({}))
    }
    const submitButton = document.getElementById("register-button");
    submitButton.addEventListener("click", async function register(e){
        e.preventDefault();
        const fullname = document.getElementById("full-name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        const request = await fetch("php/register.php",{
            method: "POST",
            body: JSON.stringify({ fullname, email, password })
        });
        //add error handling
        console.log(request)
    })
}