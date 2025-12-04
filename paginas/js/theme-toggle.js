// theme-toggle.js - alterna entre light/dark e persiste em localStorage
(function(){
  const STORAGE_KEY = 'adex-theme';
  const btn = document.getElementById('theme-toggle');

  function applyTheme(theme){
    if(theme === 'dark') document.documentElement.setAttribute('data-theme','dark');
    else document.documentElement.removeAttribute('data-theme');
  }

  function toggleTheme(){
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try{ localStorage.setItem(STORAGE_KEY, next); }catch(e){}
  }

  // Init on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function(){
    try{
      const saved = localStorage.getItem(STORAGE_KEY);
      if(saved) applyTheme(saved);
      else {
        // optional: use prefers-color-scheme to set default
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if(prefersDark) applyTheme('dark');
      }
    }catch(e){}

    if(btn) btn.addEventListener('click', toggleTheme);
  });

})();
