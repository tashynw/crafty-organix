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
        if(!fullname || !email || !password || !confirmPassword){
            return document.getElementById("error-message").innerHTML = `Enter all fields`
        }

        if(password!==confirmPassword){
            return document.getElementById("error-message").innerHTML = `Password mismatch detected`
        }
        const request = await fetch("php/register.php",{
            method: "POST",
            body: JSON.stringify({ fullname, email, password })
        });

        if(!request.ok){
            return document.getElementById("error-message").innerHTML = `Sign Up Failed - Email address may already have been taken`
        } else {
            //store session in local storage, push to home
            document.getElementById("error-message").innerHTML = ""
            localStorage.setItem("user",JSON.stringify({ email }));
            //push
            window.location.href = "index.html";
        }
    })
}