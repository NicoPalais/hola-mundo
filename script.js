(function () {
  var examples = {
    html: '<!DOCTYPE html>\n<html lang="es">\n  <body>\n    <h1>¡Hola, mundo!</h1>\n    <p>Creada por Nico</p>\n  </body>\n</html>',
    js: 'console.log("¡Hola, mundo!");\nconsole.log("Creada por Nico");',
    py: 'print("¡Hola, mundo!")\nprint("Creada por Nico")',
    c: '#include <stdio.h>\n\nint main(void) {\n  printf("¡Hola, mundo!\\n");\n  printf("Creada por Nico\\n");\n  return 0;\n}'
  };
  var tabs = Array.from(document.querySelectorAll('.lang-tab'));
  var code = document.getElementById('code-content');
  var output = document.getElementById('console-text');
  var copy = document.getElementById('copy-btn');
  var copyLabel = document.getElementById('copy-label');
  var theme = document.getElementById('theme-toggle');
  var timer;

  function selectTab(tab) {
    tabs.forEach(function (item) {
      var active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    code.textContent = examples[tab.dataset.lang];
  }
  tabs.forEach(function (tab, index) {
    tab.tabIndex = index === 0 ? 0 : -1;
    tab.addEventListener('click', function () { selectTab(tab); });
    tab.addEventListener('keydown', function (event) {
      var next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectTab(tabs[next]);
      tabs[next].focus();
    });
  });

  copy.addEventListener('click', async function () {
    try {
      await navigator.clipboard.writeText(code.textContent);
      copyLabel.textContent = '¡Copiado!';
      copy.classList.add('is-copied');
    } catch (error) {
      copyLabel.textContent = 'No se pudo copiar';
    }
    clearTimeout(timer);
    timer = setTimeout(function () {
      copyLabel.textContent = 'Copiar';
      copy.classList.remove('is-copied');
    }, 2000);
  });

  document.getElementById('run-btn').addEventListener('click', function () {
    output.textContent = '¡Hola, mundo! — Creada por Nico';
  });
  theme.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('hola-mundo-theme', next); } catch (error) {}
  });
})();
