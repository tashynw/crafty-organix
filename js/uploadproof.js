window.onload = function(){
    if (!localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify({}));
    }
    if(!localStorage.getItem("cart")){
        localStorage.setItem("cart", JSON.stringify([]));
    }
    if(!localStorage.getItem("delivery-info")){
        localStorage.setItem("delivery-info", JSON.stringify({}));
    }
    const deliveryInfo = JSON.parse(localStorage.getItem("delivery-info"));
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) {
        return (window.location.href = "login.html");
    }
    const shoppingCart = JSON.parse(localStorage.getItem("cart")); 
    if(!shoppingCart.length){
        return (window.location.href = "products.html");
    }

    const submitButton = document.getElementById("upload-button");
    submitButton.addEventListener("click", async function (e) {
        e.preventDefault();
        const imageFile = document.getElementById("image-file").files[0];
        if(!imageFile) return (document.getElementById("error-message").innerHTML = `Upload an image`);

        //upload pic to cdn
        const imageData = new FormData();
        imageData.append("file", imageFile);
        imageData.append("upload_preset", "rmyrj61e");
        const imageUploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/dsxanirxq/image/upload`,
        {
            method: "POST",
            body: imageData,
        }
        );
        if (!imageUploadResponse.ok)
        return (document.getElementById(
            "error-message"
        ).innerHTML = `Image upload failed`);

        const responseData = await imageUploadResponse.json();

        //send to php to create db item
        const request = await fetch("php/uploadproof.php", {
            method: "POST",
            body: JSON.stringify({
              cart: JSON.stringify(shoppingCart),
              buyeremail: user?.email,
              imageLocation: responseData?.url,
              proofstatus: "Pending",
              deliveryinfo: deliveryInfo.text,
            }),
          });
        if (!request.ok) {
            return (document.getElementById(
            "error-message"
            ).innerHTML = `Upload failed`);
        } else {
            //clear cart and push to homepage
            localStorage.setItem("cart", JSON.stringify([]));
            localStorage.setItem("delivery-info", JSON.stringify({}));
            window.location.href = "index.html";
        }
})
}
