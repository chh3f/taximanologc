// === FORMULARIO WHATSAPP CON VALIDACIÓN Y ANTI-SPAM ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("whatsappForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = form.nombre.value.trim();
      const telefono = form.telefono.value.trim();
      const origen = form.origen.value.trim();
      const destino = form.destino.value.trim();
      const fecha = form.fecha.value;
      const pasajeros = form.pasajeros.value;
      const notas = form.notas.value.trim();
      const empresa = form.empresa.value.trim(); // honeypot

      // --- ANTI-SPAM ---
      if (empresa !== "") {
        alert("Error: envío no válido (spam detectado).");
        return;
      }

      // --- VALIDACIÓN DE TELÉFONO ---
      const telefonoValido = /^[0-9]{8,15}$/.test(telefono);
      if (!telefonoValido) {
        alert("Por favor, introduce un número de teléfono válido (solo números, sin espacios ni guiones).");
        form.telefono.focus();
        return;
      }

      // --- Construcción del mensaje ---
      let mensaje = `🚖 *Nueva solicitud de reserva*%0A%0A`;
      mensaje += `👤 *Nombre:* ${encodeURIComponent(nombre)}%0A`;
      mensaje += `📞 *Teléfono:* ${encodeURIComponent(telefono)}%0A`;
      mensaje += `📍 *Origen:* ${encodeURIComponent(origen)}%0A`;
      mensaje += `🏁 *Destino:* ${encodeURIComponent(destino)}%0A`;
      mensaje += `🗓️ *Fecha y hora:* ${encodeURIComponent(fecha)}%0A`;
      mensaje += `👥 *Pasajeros:* ${encodeURIComponent(pasajeros)}%0A`;
      if (notas) mensaje += `%0A📝 *Notas:* ${encodeURIComponent(notas)}%0A`;
      mensaje += `%0AEnviado desde la web de TaxiManoloGC.`;

      const url = `https://wa.me/34606576272?text=${mensaje}`;
      window.open(url, "_blank");
    });
  }

  // === MENÚ RESPONSIVE ===
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-list");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.classList.toggle("open");
    });
  }

  // Cierra el menú al pulsar un enlace
  document.querySelectorAll(".nav-list a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("open");
    });
  });

  // === BLOQUEO ANTI-COPIA (básico) ===
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener("keydown", (e) => {
    const forbidden = ["u", "s", "c", "j"];
    if (e.ctrlKey && forbidden.includes(e.key.toLowerCase())) e.preventDefault();
    if (e.key === "F12") e.preventDefault();
  });

  // === MICRO ANIMACIONES AL SCROLL ===
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("inview");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document
    .querySelectorAll("section, .card, .service, .route")
    .forEach((el) => observer.observe(el));
});
