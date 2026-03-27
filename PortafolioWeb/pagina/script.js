/**
 * 1. CONFIGURACIÓN DE PARTICLES.JS
 * Crea la red de puntos conectados del fondo.
 */
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.2,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffbf00",
      "opacity": 0.08,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 0.6,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 200,
        "line_linked": {
          "opacity": 0.3
        }
      }
    }
  },
  "retina_detect": true
});

/**
 * 2. EFECTO DE BRILLO E INCLINACIÓN EN TARJETAS (GLARE & TILT)
 */
const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
});

/**
 * 3. NAVBAR DINÁMICA
 * Cambia el estilo al hacer scroll.
 */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav-container');
  if (nav) {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(10, 15, 25, 0.9)';
      nav.style.padding = '5px 25px';
    } else {
      nav.style.background = 'rgba(10, 15, 25, 0.7)';
      nav.style.padding = '8px 30px';
    }
  }
});

/**
 * 4. SISTEMA DE ENVÍO DE FORMULARIO (EmailJS)
 * Unificado para evitar errores de duplicidad.
 */
const PUBLIC_KEY = "3doNC_Vve3iyigp5v";
const SERVICE_ID = "service_51qyrdw";
const TEMPLATE_ID = "template_99s6q83";

// Inicializar EmailJS una sola vez
emailjs.init(PUBLIC_KEY);

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const form = this;
    const btn = form.querySelector('button');
    const card = document.querySelector('.contact-card');
    const originalBtnText = btn.innerHTML;

    // Feedback visual inmediato
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ENVIANDO...';

    // Envío real con tus IDs
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
      .then(() => {
        // ÉXITO: Animación y mensaje visual
        form.style.transition = 'opacity 0.5s ease';
        form.style.opacity = '0';

        setTimeout(() => {
          card.innerHTML = `
                        <div class="success-message" style="text-align:center; animation: fadeInUp 0.8s ease forwards; padding: 20px;">
                            <i class="fa-solid fa-circle-check" style="font-size: 4rem; background: linear-gradient(135deg, #bf953f 0%, #fcf6ba 50%, #b38728 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 10px rgba(251,213,146,0.3));"></i>
                            <h3 style="color: white; font-family: 'Outfit', sans-serif; font-size: 1.8rem; margin-top: 20px;">¡Mensaje Recibido!</h3>
                            <p style="color: #888; margin-bottom: 25px;">Gracias por contactar, Alons te responderá lo antes posible.</p>
                            <button class="btn-metallic" onclick="location.reload()">ENVIAR OTRO</button>
                        </div>
                    `;
        }, 500);
      }, (err) => {
        // ERROR: Restaurar botón para reintentar
        btn.disabled = false;
        btn.innerHTML = originalBtnText;
        alert("Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.");
        console.error("EmailJS Error:", err);
      });
  });
}

/**
 * 5. SISTEMA DE TRADUCCIÓN (DICCIONARIO)
 */
const texts = {
  "es": {
    "nav-about": "Sobre mí",
    "nav-edu": "Estudios",
    "nav-stack": "Lenguajes",
    "nav-contact": "Contacto",
    "hero-label": "DESARROLLADOR WEB Y DE SCRIPTS",
    "hero-name": "Mi nombre es Alons",
    "hero-spec": "Me especializo en hacer:",
    "feat-1": "Optimización total para un rendimiento máximo.",
    "feat-2": "Código limpio bajo estándares modernos.",
    "feat-3": "Interfaces de alto impacto con estética minimalista.",
    "edu-tag": "FORMACIÓN",
    "edu-title": "Datos Académicos",
    "edu-med-h3": "Ciclo Grado Medio",
    "edu-med-p": "Sistemas Microinformáticos y Redes (SMR).",
    "badge-med": "MEDIO",
    "edu-sup-h3": "Técnico Superior (DAW)",
    "edu-sup-p": "Sistemas de desarrollo y gestión de aplicaciones.",
    "badge-sup": "SUPERIOR",
    "stack-tag": "STACK TECNOLÓGICO",
    "stack-title": "Tecnologías & Herramientas",
    "contact-title": "¿Tienes un Proyecto?",
    "form-name": "Nombre",
    "form-msg": "Mensaje",
    "form-send": "Enviar Mensaje",
    "footer-copy": "Todos los derechos reservados."
  },
  "en": {
    "nav-about": "About me",
    "nav-edu": "Education",
    "nav-stack": "Stack",
    "nav-contact": "Contact",
    "hero-label": "WEB & SCRIPTS DEVELOPER",
    "hero-name": "My name is Alons",
    "hero-spec": "I specialize in:",
    "feat-1": "Total optimization for maximum performance.",
    "feat-2": "Clean code under modern standards.",
    "feat-3": "High-impact interfaces with minimalist aesthetics.",
    "edu-tag": "EDUCATION",
    "edu-title": "Academic Background",
    "edu-med-h3": "Intermediate Degree",
    "edu-med-p": "Computer Systems and Networks (SMR).",
    "badge-med": "INTERMEDIATE",
    "edu-sup-h3": "Higher Technician (DAW)",
    "edu-sup-p": "Web Application Development and Management.",
    "badge-sup": "ADVANCED",
    "stack-tag": "TECH STACK",
    "stack-title": "Technologies & Tools",
    "contact-title": "Have a Project?",
    "form-name": "Name",
    "form-msg": "Message",
    "form-send": "Send Message",
    "footer-copy": "All rights reserved."
  }
};

const langBtn = document.getElementById('lang-btn');
let currentLang = 'es';

langBtn.addEventListener('click', () => {
  // Cambiar idioma
  currentLang = currentLang === 'es' ? 'en' : 'es';

  // Cambiar texto del botón (muestra el idioma al que puedes cambiar)
  langBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';

  // Traducir todos los elementos con data-key
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (texts[currentLang][key]) {
      // Buscamos si dentro hay un <strong> o etiquetas para no borrarlas
      const hasStrong = el.querySelector('strong');
      if (hasStrong) {
        // Si tiene un strong, dividimos la traducción por el punto para mantener la negrita
        // (O simplemente traducimos todo el HTML si confías en el diccionario)
        el.innerHTML = texts[currentLang][key].replace(
          /Total optimization|Clean code|High-impact interfaces|Optimización total|Código limpio|Interfaces de alto impacto/g,
          match => `<strong>${match}</strong>`
        );
      } else {
        el.textContent = texts[currentLang][key];
      }
    }
  });
});

console.log("Portfolio de Alons cargado correctamente. Estilo: Lujo Moderno.");