'use strict';
/* ============================================================
   SUBPAGE.JS – Script partagé pour toutes les sous-pages
   Portfolio Ismael RAHALI
   ============================================================ */

// EmailJS init
(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("EXSQxrpXGOTBTsqcO");
  }
})();

// Contact form popup
document.addEventListener('DOMContentLoaded', function () {
  const popup      = document.getElementById('formulairePopup');
  const closeBtn   = document.getElementById('closePopup');
  const contactIcon = document.getElementById('contactIcon');

  if (!popup) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      popup.style.display = 'none';
    });
  }

  if (contactIcon) {
    contactIcon.addEventListener('click', function (e) {
      e.preventDefault();
      popup.style.display = 'block';
    });
  }

  // Drag & drop (souris + tactile mobile)
  const entete = popup.querySelector('.Entete');
  if (entete) {
    let isDragging = false, startX, startY, elX, elY;

    function startDrag(clientX, clientY) {
      isDragging = true;
      const rect = popup.getBoundingClientRect();
      startX = clientX; startY = clientY;
      elX = rect.left;  elY = rect.top;
      popup.style.transform = 'none';
    }

    function moveDrag(clientX, clientY) {
      if (!isDragging) return;
      const newLeft = elX + clientX - startX;
      const newTop  = elY + clientY - startY;
      // Garder dans les limites de l'écran
      const maxLeft = window.innerWidth  - popup.offsetWidth;
      const maxTop  = window.innerHeight - popup.offsetHeight;
      popup.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + 'px';
      popup.style.top  = Math.max(0, Math.min(newTop,  maxTop))  + 'px';
    }

    function stopDrag() { isDragging = false; }

    // Souris
    entete.addEventListener('mousedown',  function (e) { startDrag(e.clientX, e.clientY); });
    document.addEventListener('mouseup',   stopDrag);
    document.addEventListener('mousemove', function (e) { moveDrag(e.clientX, e.clientY); });

    // Tactile (mobile)
    entete.addEventListener('touchstart', function (e) {
      const t = e.touches[0];
      startDrag(t.clientX, t.clientY);
      e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchend',    stopDrag);
    document.addEventListener('touchcancel', stopDrag);
    document.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      const t = e.touches[0];
      moveDrag(t.clientX, t.clientY);
      e.preventDefault();
    }, { passive: false });
  }

  // Form submit via EmailJS
  const form = popup.querySelector('form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (typeof emailjs === 'undefined') { alert('Service email indisponible.'); return; }
      const btn = form.querySelector('[type="submit"]');
      btn.value = 'Envoi...'; btn.disabled = true;

      // Injecter {{subject}} si absent
      if (!form.querySelector('[name="subject"]')) {
        const s = document.createElement('input');
        s.type = 'hidden'; s.name = 'subject';
        s.value = 'Nouveau message via Portfolio';
        form.appendChild(s);
      }

      // Injecter {{name}} depuis le champ prenom si absent
      if (!form.querySelector('[name="name"]')) {
        const prenomVal = (form.querySelector('[name="prenom"]') || {}).value || '';
        const n = document.createElement('input');
        n.type = 'hidden'; n.name = 'name';
        n.value = prenomVal;
        form.appendChild(n);
      }

      emailjs.sendForm('service_dih28c9', 'template_hec9uo8', form)
        .then(function () {
          alert('Message envoyé avec succès !');
          popup.style.display = 'none';
          form.reset();
        })
        .catch(function (err) {
          console.error('EmailJS error:', err);
          alert("Erreur lors de l'envoi. Veuillez réessayer.");
          btn.value = 'Envoyer le message'; btn.disabled = false;
        });
    });
  }

  // AOS init
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, duration: 700, offset: 50 });
  }
});
