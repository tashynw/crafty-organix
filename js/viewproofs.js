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
        tableBody.innerHTML += `
            <tr>
                <td>${proof[1]}</td>
                <td>${proof[2]}</td>
                <td>0.00</td>
                <td><a>${proof[3]}</a></td>
                <td>${proof[4]}</td>
            </tr>
        `
    }
}