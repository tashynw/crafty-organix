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
    let i=0;
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
        tableBody.innerHTML += proof[4]=="Pending" ? `
            <tr>
                <td>${cartText}</td>
                <td>${proof[2]}</td>
                <td>${total}</td>
                <td><a href="${proof[3]}" target="_blank">Image</a></td>
                <td>${proof[4]}</td>
                <td>${proof[5]}</td>
                <td><button class="btn btn-primary" id="accept-${i}">Accept</button><br/><br/><button class="btn btn-primary" id="reject-${i}">Reject</button></td>
            </tr>
        ` : `
            <tr>
                <td>${cartText}</td>
                <td>${proof[2]}</td>
                <td>${total}</td>
                <td><a href="${proof[3]}" target="_blank">Image</a></td>
                <td>${proof[4]}</td>
                <td>${proof[5]}</td>
                <td>Already reviewed</td>
            </tr>
        `
        i++;
    }
    let x=0;
    for(let proof of proofs){ 
        if(proof[4]==="Pending"){
            const acceptButton = document.getElementById(`accept-${x}`)
            const rejectButton = document.getElementById(`reject-${x}`)
            acceptButton.addEventListener("click", async function(){
                const proofId = proof[0];
                //Update Status call
                const request = await fetch("php/editproof.php", {
                    method: "POST",
                    body: JSON.stringify({
                        productid: proofId,
                        newstatus: "Accepted",
                    }),
                  });
                  console.log(request)
                window.location.reload();
                
            })
            rejectButton.addEventListener("click", async function(){
                const proofId = proof[0];
                //Update Status call
                const request = await fetch("php/editproof.php", {
                    method: "POST",
                    body: JSON.stringify({
                        productid: proofId,
                        newstatus: "Rejected",
                    }),
                });
                console.log(request)
                window.location.reload();
            })
        }
        x++;
    }

}