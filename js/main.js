/* =========================================================
   CONFIGURACIÓN — cambiá acá el número de WhatsApp
   Formato internacional sin "+", espacios ni guiones.
   Ej. Argentina, Mar del Plata: 549223XXXXXXX
   ========================================================= */
const WHATSAPP_NUMBER = "5492230000000";
const WHATSAPP_MESSAGE = "¡Hola Arvo! Quiero info sobre los entrenamientos de surf 🏄";

// Todos los botones con .js-whatsapp abren el chat
const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
document.querySelectorAll(".js-whatsapp").forEach((el) => {
  el.href = waUrl;
  el.target = "_blank";
  el.rel = "noopener";
});

// Header con fondo al hacer scroll
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Menú mobile
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const setMenu = (open) => {
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
};
burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

// Animaciones al aparecer
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
  }),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Formulario de contacto: arma el mensaje y lo abre en WhatsApp
// (el sitio es estático, no hay servidor que reciba el formulario)
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const lines = [
      `¡Hola Arvo! Soy ${data.get("nombre")}.`,
      `Me interesa: ${data.get("interes")}.`,
      `Nivel: ${data.get("nivel")}.`,
      data.get("mensaje") && `\n${data.get("mensaje")}`,
    ].filter(Boolean);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  });
}
