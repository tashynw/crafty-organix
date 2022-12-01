window.onload = async function (){
    if (!localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify({}));
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) {
        return (window.location.href = "login.html");
    }
    const tableBody = document.getElementById("table-body");
    const request = await fetch("php/getproofs.php");
    const proofs = await request.json();
    for(let proof of proofs){
        //find total etc
        const cart = JSON.parse(proof[1]);
        let cartText = "";
        let total=0;
        for(let item of cart) {
            cartText+= `
                ${item.quantity} ${item.name},\n
            `
            total += parseInt(item.quantity) * parseInt(item.price)
        }
        tableBody.innerHTML += `
            <tr>
                <td>${cartText}</td>
                <td>${proof[2]}</td>
                <td>${total}</td>
                <td><a href="${proof[3]}" target="_blank">Image</a></td>
                <td>${proof[4]}</td>
                <td>${proof[5]}</td>
            </tr>
        `
    }
}