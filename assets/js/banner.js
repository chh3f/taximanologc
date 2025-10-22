// === Banner de Política de Privacidad ===
document.addEventListener("DOMContentLoaded", function () {
  // Si el usuario ya aceptó o rechazó, no mostramos el banner
  const accepted = localStorage.getItem("cookiesAccepted");
  const rejected = localStorage.getItem("cookiesRejected");
  if (accepted || rejected) return;

  // Crear el banner dinámicamente
  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.innerHTML = `
    <p>
      Al continuar aceptas nuestra política de privacidad.
      Puedes leer más <a href="privacidad.html" target="_blank">aquí</a>.
    </p>
    <div class="cookie-buttons">
      <button id="acceptCookies">Aceptar</button>
      <button id="rejectCookies">Rechazar</button>
    </div>
  `;
  document.body.appendChild(banner);

  // Mostrar el banner
  banner.style.display = "flex";

  // Botones
  banner.querySelector("#acceptCookies").addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    banner.style.display = "none";
  });

  banner.querySelector("#rejectCookies").addEventListener("click", () => {
    localStorage.setItem("cookiesRejected", "true");
    banner.style.display = "none";
  });
});
