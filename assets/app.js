(function () {
  // smooth page-to-page transitions — fade content out on leave, in on arrive
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest ? e.target.closest('a[href]') : null;
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      if (a.protocol !== 'http:' && a.protocol !== 'https:') return;
      if (a.origin !== location.origin) return;
      if (a.pathname === location.pathname && a.search === location.search && a.hash) return;
      if (a.href === location.href) return;
      e.preventDefault();
      var url = a.href;
      document.documentElement.classList.add('is-leaving');
      setTimeout(function () { window.location.href = url; }, 210);
    });
    window.addEventListener('pageshow', function (ev) {
      if (ev.persisted) document.documentElement.classList.remove('is-leaving');
    });
  }

  // price simulator — nettoyage auto (home + nettoyage-auto.html)
  var estim = document.getElementById('estim');
  if (estim) {
    var out = document.getElementById('estimPrice');
    var calc = function () {
      var v = estim.querySelector('input[name="vehicule"]:checked');
      if (!v) { if (out) out.textContent = '—'; return; }
      var total = Number(v.value);
      Array.prototype.forEach.call(estim.querySelectorAll('input[name="opt"]:checked'), function (c) { total += Number(c.value); });
      if (out) out.textContent = total;
    };
    estim.addEventListener('change', calc);
    calc();

    var estimGroups = Array.prototype.slice.call(estim.querySelectorAll('.estim__group'));
    if (estimGroups.length) {
      var summarizeGroup = function (group) {
        var out2 = group.querySelector('.estim__gsummary');
        if (!out2) return;
        var checked = Array.prototype.slice.call(group.querySelectorAll('input:checked'));
        if (!checked.length) { out2.textContent = ''; return; }
        var labels = checked.map(function (c) {
          var wrap = c.closest('.opt');
          var span = wrap && wrap.querySelector('span');
          return span ? span.textContent.trim() : '';
        });
        out2.textContent = labels.length > 2 ? (labels.slice(0, 2).join(', ') + '…') : labels.join(', ');
      };
      var openGroup = function (target) {
        estimGroups.forEach(function (g) {
          var open = g === target;
          g.classList.toggle('is-open', open);
          var head = g.querySelector('.estim__ghead');
          if (head) head.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
      };
      estimGroups.forEach(function (g, i) {
        summarizeGroup(g);
        var head = g.querySelector('.estim__ghead');
        if (head) {
          var toggle = function () { if (!g.classList.contains('is-open')) openGroup(g); };
          head.addEventListener('click', toggle);
          head.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
          });
        }
        g.addEventListener('change', function (e) {
          summarizeGroup(g);
          if (e.target.type === 'radio' && g.classList.contains('is-open')) {
            var next = estimGroups[i + 1];
            if (next) openGroup(next);
          }
        });
      });
    }

    var estimCta = document.getElementById('estimCta');
    if (estimCta) {
      var optLabel = function (input) {
        var wrap = input && input.closest('.opt');
        var span = wrap && wrap.querySelector('span');
        return span ? span.textContent.trim() : '';
      };
      estimCta.addEventListener('click', function () {
        var v = estim.querySelector('input[name="vehicule"]:checked');
        var opts = Array.prototype.map.call(estim.querySelectorAll('input[name="opt"]:checked'), optLabel).filter(Boolean);
        var vehLabel = optLabel(v);
        var lines = [
          'Bonjour,',
          '',
          'Je souhaite un devis à partir de l’estimation en ligne :',
          '• Véhicule : ' + vehLabel
        ];
        if (opts.length) lines.push('• Options : ' + opts.join(', '));
        lines.push('• Estimation affichée : ' + (out ? out.textContent : '') + ' €');
        lines.push('', 'Merci de me recontacter pour convenir d’un créneau.');
        try {
          sessionStorage.setItem('h2o_devis', JSON.stringify({
            prestation: 'Nettoyage auto — intérieur', vehicule: vehLabel, message: lines.join('\n')
          }));
        } catch (e) {}
      });
    }
  }

  // price simulator — canapé / tapis / matelas (canape-textile.html)
  var estimTextile = document.getElementById('estimTextile');
  if (estimTextile) {
    var outTextile = document.getElementById('estimTextilePrice');
    var sizeGroups = Array.prototype.slice.call(estimTextile.querySelectorAll('.estim__sizes'));
    var calcTextile = function () {
      var visible = estimTextile.querySelector('.estim__sizes.is-active');
      var t = visible ? visible.querySelector('input[name="taille"]:checked') : null;
      if (outTextile) outTextile.textContent = t ? Number(t.value) : '—';
    };

    var typeLabels = { canape: 'Canapé', tapis: 'Tapis', matelas: 'Matelas' };
    estimTextile.querySelectorAll('input[name="type"]').forEach(function (input) {
      input.addEventListener('change', function () {
        sizeGroups.forEach(function (g) {
          var active = g.getAttribute('data-type') === input.value;
          g.classList.toggle('is-active', active);
          g.querySelectorAll('input[name="taille"]').forEach(function (r) { r.checked = false; r.disabled = !active; });
        });
        calcTextile();
      });
    });

    var textileGroups = Array.prototype.slice.call(estimTextile.querySelectorAll('.estim__group'));
    if (textileGroups.length) {
      var summarizeTextileGroup = function (group) {
        var out2 = group.querySelector('.estim__gsummary');
        if (!out2) return;
        var checked = group.querySelector('input:checked');
        if (!checked) { out2.textContent = ''; return; }
        var wrap = checked.closest('.opt');
        var span = wrap && wrap.querySelector('span');
        out2.textContent = span ? span.textContent.trim() : '';
      };
      var openTextileGroup = function (target) {
        textileGroups.forEach(function (g) {
          var open = g === target;
          g.classList.toggle('is-open', open);
          var head = g.querySelector('.estim__ghead');
          if (head) head.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
      };
      textileGroups.forEach(function (g, i) {
        var head = g.querySelector('.estim__ghead');
        if (head) {
          var toggle = function () { if (!g.classList.contains('is-open')) openTextileGroup(g); };
          head.addEventListener('click', toggle);
          head.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
          });
        }
        g.addEventListener('change', function (e) {
          summarizeTextileGroup(g);
          if (e.target.type === 'radio' && g.classList.contains('is-open')) {
            var next = textileGroups[i + 1];
            if (next) openTextileGroup(next);
          }
        });
      });
    }

    estimTextile.addEventListener('change', calcTextile);
    calcTextile();

    var estimTextileCta = document.getElementById('estimTextileCta');
    if (estimTextileCta) {
      estimTextileCta.addEventListener('click', function () {
        var typeInput = estimTextile.querySelector('input[name="type"]:checked');
        var visible = estimTextile.querySelector('.estim__sizes.is-active');
        var sizeInput = visible ? visible.querySelector('input[name="taille"]:checked') : null;
        var sizeWrap = sizeInput && sizeInput.closest('.opt');
        var sizeLabel = sizeWrap ? sizeWrap.querySelector('span').textContent.trim() : '';
        var typeLabel = typeInput ? typeLabels[typeInput.value] : '';
        var lines = [
          'Bonjour,',
          '',
          'Je souhaite un devis à partir de l’estimation en ligne :',
          '• Article : ' + typeLabel,
          '• Taille : ' + sizeLabel,
          '• Estimation affichée : ' + (outTextile ? outTextile.textContent : '') + ' €',
          '', 'Merci de me recontacter pour convenir d’un créneau.'
        ];
        try {
          sessionStorage.setItem('h2o_devis', JSON.stringify({
            prestation: typeLabel, vehicule: (typeLabel + ' — ' + sizeLabel), message: lines.join('\n')
          }));
        } catch (e) {}
      });
    }
  }

  // contact form — posts to Web3Forms once a key is set, otherwise opens the mail app
  var cform = document.getElementById('cform');
  if (cform) {
    var cstatus = document.getElementById('cformStatus');

    try {
      var devis = sessionStorage.getItem('h2o_devis');
      if (devis) {
        sessionStorage.removeItem('h2o_devis');
        var d = JSON.parse(devis);
        var sel = cform.elements['prestation'];
        if (sel && d.prestation) {
          for (var oi = 0; oi < sel.options.length; oi++) {
            if (sel.options[oi].text === d.prestation) { sel.selectedIndex = oi; break; }
          }
        }
        if (cform.elements['objet'] && d.vehicule) cform.elements['objet'].value = d.vehicule;
        if (cform.elements['message'] && d.message) cform.elements['message'].value = d.message;
        if (cstatus) { cstatus.className = 'cform__status is-info'; cstatus.textContent = 'Demande pré-remplie d’après votre estimation — ajoutez votre nom et votre téléphone.'; }
      }
    } catch (e) {}

    var val = function (name) { var el = cform.elements[name]; return el ? String(el.value || '').trim() : ''; };
    var mailtoFallback = function () {
      var body = 'Nom : ' + val('nom') +
        '\nTéléphone : ' + val('telephone') +
        '\nE-mail : ' + val('email') +
        '\nVéhicule / objet : ' + val('objet') +
        '\nPrestation : ' + val('prestation') +
        '\n\n' + val('message');
      window.location.href = 'mailto:contact@h2oufpropre45.fr?subject=' +
        encodeURIComponent('Demande de devis — h2oufpropre45.fr') +
        '&body=' + encodeURIComponent(body);
    };
    cform.addEventListener('submit', function (e) {
      e.preventDefault();
      if (typeof cform.reportValidity === 'function' && !cform.reportValidity()) return;
      var key = val('access_key');
      if (!key || key.indexOf('VOTRE_CLE') !== -1) { mailtoFallback(); return; }
      if (cstatus) { cstatus.className = 'cform__status'; cstatus.textContent = 'Envoi en cours…'; }
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(cform)
      }).then(function (r) { return r.json(); }).then(function (d) {
        if (!d || !d.success) throw new Error('fail');
        cform.reset();
        if (cstatus) { cstatus.className = 'cform__status is-ok'; cstatus.textContent = 'Merci, votre demande est bien partie. On vous recontacte très vite.'; }
      }).catch(function () {
        if (cstatus) { cstatus.className = 'cform__status is-err'; cstatus.textContent = 'L’envoi automatique a échoué — on ouvre votre messagerie pour envoyer la demande.'; }
        setTimeout(mailtoFallback, 1200);
      });
    });
  }

  var bar = document.querySelector('header.bar');
  if (bar) {
    var onScroll = function () { bar.classList.toggle('is-float', window.scrollY > 60); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var b = document.getElementById('burger'), n = document.getElementById('nav');
  if (b && n) {
    var setMenuOpen = function (open) {
      n.classList.toggle('is-open', open);
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      b.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    };
    b.addEventListener('click', function () {
      var open = !n.classList.contains('is-open');
      setMenuOpen(open);
      if (open) {
        var firstLink = n.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });
    n.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { setMenuOpen(false); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && n.classList.contains('is-open')) {
        setMenuOpen(false);
        b.focus();
      }
    });
  }

  var fab = document.querySelector('.call-fab');
  var footerEl = document.querySelector('footer');
  if (fab && footerEl && 'IntersectionObserver' in window) {
    var fabIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { fab.classList.toggle('is-hidden', en.isIntersecting); });
    }, { rootMargin: '0px', threshold: 0 });
    fabIo.observe(footerEl);
  }

  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var showAll = function () { items.forEach(function (el) { el.classList.add('in'); }); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !('IntersectionObserver' in window) || !items.length) { showAll(); return; }

  document.documentElement.classList.add('reveal-on');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
  items.forEach(function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) { el.classList.add('in'); }
    else { io.observe(el); }
  });
  window.addEventListener('load', function () { setTimeout(showAll, 1400); });
})();
