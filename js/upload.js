window.onload = function () {
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify({}));
  }
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user?.email) {
    return (window.location.href = "login.html");
  }
  const submitButton = document.getElementById("upload-button");
  submitButton.addEventListener("click", async function (e) {
    e.preventDefault();
    const productName = document.getElementById("product-name").value;
    const description = document.getElementById("description-text").value;
    const price = document.getElementById("price-text").value;
    const imageFile = document.getElementById("image-file").files[0];
    if (!productName || !description || !price || !imageFile)
      return (document.getElementById(
        "error-message"
      ).innerHTML = `Enter all fields`);

    //upload pic to CDN
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
    //send to php to create item
    const request = await fetch("php/upload.php", {
      method: "POST",
      body: JSON.stringify({
        productName,
        description,
        price,
        imageLocation: responseData?.url,
      }),
    });
    if (!request.ok) {
      return (document.getElementById(
        "error-message"
      ).innerHTML = `Upload failed`);
    } else {
      window.location.href = "index.html";
    }
  });
};
