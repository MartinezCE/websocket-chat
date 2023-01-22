const socket = io();


//ATRAPAN MSGS QUE ENVIE EL SERVER
socket.on("connect", () => {
    console.log("me conecte!");
});

socket.on("data-generica", (data) => {
    console.log(data, 'data-generica');
});

socket.on("arr-chat", (data) => {
    const html = data.reduce(
        (html, item) =>
            '<div class="chat-text">' + item.nombre + " : <br>" + item.msg + "</div>" + html,
        ""
    );
    document.getElementById("div-chats").innerHTML = html;
    styleByIdConect()
});

const enviar = () => {
    let nombre = document.getElementById("caja-nombre").value;
    let msg = document.getElementById("caja-msg").value;
    (nombre.length === 0) && (nombre = 'Anónimo');
    socket.emit("data-generica", { nombre: nombre, msg: `${msg}` } /* ` ${nombre} :<br> ${msg}` */);
    return false;
}

const styleByIdConect = () => {
    const divs = document.querySelectorAll('.chat-text')
    divs.forEach(div => {
        if (div.innerHTML.includes('Se', "unio", 'al', 'chat') && div.innerHTML.length === 42) {
            div.style.textAlign = "center";
            div.style.color = 'rgb(178, 181, 183)'
        }
    })

}