console.log("hi I'm connected to you, HTML!");
window.onload = () => {
    fetch("/display", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            document.getElementById("comments").innerHTML += data[i].name + " says " + data[i].comment + " <br/>";
        }
    });
    

}



const form = document.getElementById("data_form");
console.log(form)
form.onsubmit = event => {
    event.preventDefault();
    // const dataInput = event.target.elements ["input"];
    const name = document.getElementById("name").value;
    const comment = document.getElementById("comment").value;
    console.log(name);

    fetch("/add", {
        method: "POST",
        body: JSON.stringify({name: name, comment: comment}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("no errors");
    });

    
};

