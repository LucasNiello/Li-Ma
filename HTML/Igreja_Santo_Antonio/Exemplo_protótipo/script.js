// Menu mobile
const btnMenu = document.getElementById("btnMenu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", () => {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
});

// Mensagem de envio de formulários
document.getElementById("formMatricula").addEventListener("submit", function(e){
    e.preventDefault();
    document.getElementById("msgMatricula").textContent = "Inscrição enviada com sucesso!";
});

document.getElementById("formMensagem").addEventListener("submit", function(e){
    e.preventDefault();
    document.getElementById("msgMensagem").textContent = "Mensagem enviada com sucesso!";
});