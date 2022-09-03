//CLIENTE
const socket = io();

socket.on("msg", (data) => {
  alert("msg del server " + data);
});

socket.on("array-msg", (data) => {
  console.log("llego algo");

  let html = "";
  for (let i = 0; i < data.length; i++) {
    html = data[i] + "<br/>" + html;
  }

  document.getElementById("divmsgs").innerHTML = html;
});

function enviar() {
  const txt =
    document.getElementById("nombre").value +
    ": " +
    document.getElementById("caja").value;
  socket.emit("msg", txt);
  document.getElementById("caja").value = "";
}
