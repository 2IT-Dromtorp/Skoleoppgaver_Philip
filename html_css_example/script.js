const login = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (username === "bruker" && password === "pass"){
        alert("logga inn ass brær");
        window.open("https://youtube.com")
    }
}