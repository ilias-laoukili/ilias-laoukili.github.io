document.addEventListener('DOMContentLoaded', () => {
  const storageKey = 'darkMode';
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const isQuartoPage = Boolean(document.getElementById('quarto-document-content'));

  const createFloatingToggle = () => {
    if (document.querySelector('[data-theme-toggle]') || document.querySelector('.quarto-color-scheme-toggle')) {
      return;
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-theme-toggle', '');
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-label', 'Toggle color theme');
    button.className = 'quarto-color-scheme-toggle p-2 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition';
    button.style.position = 'fixed';
    button.style.bottom = '1rem';
    button.style.right = '1rem';
    button.style.zIndex = '50';
    button.innerHTML = `
      <span class="sr-only">Toggle color theme</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 dark:hidden" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hidden dark:block" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8 8 0 1010.586 10.586z" />
      </svg>
    `;
    document.body.appendChild(button);
  };

  if (!isQuartoPage) {
    createFloatingToggle();
  }

  const toggleButtons = document.querySelectorAll('[data-theme-toggle]');

  if (!isQuartoPage) {
    const setTheme = (isDark, persist = false) => {
      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
      if (persist) {
        try {
          localStorage.setItem(storageKey, String(isDark));
        } catch (error) {
          // Ignore storage errors (e.g., Safari private browsing)
        }
      }
      if (themeMeta) {
        themeMeta.setAttribute('content', isDark ? '#0f172a' : '#f8fafc');
      }
      toggleButtons.forEach((button) => {
        button.setAttribute('aria-pressed', String(isDark));
      });
    };

    const getStoredPreference = () => {
      try {
        return localStorage.getItem(storageKey);
      } catch (error) {
        return null;
      }
    };

    const initializeTheme = () => {
      const stored = getStoredPreference();
      const shouldUseDark = stored === 'true' || (stored === null && mediaQuery.matches);
      setTheme(shouldUseDark);
    };

    initializeTheme();

    toggleButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const isDark = !document.documentElement.classList.contains('dark');
        setTheme(isDark, true);
      });
    });

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', (event) => {
        if (getStoredPreference() === null) {
          setTheme(event.matches);
        }
      });
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener((event) => {
        if (getStoredPreference() === null) {
          setTheme(event.matches);
        }
      });
    }
  } else {
    const isCurrentlyDark =
      document.body.classList.contains('quarto-dark') || document.documentElement.classList.contains('dark');
    document.documentElement.style.colorScheme = isCurrentlyDark ? 'dark' : 'light';
    if (themeMeta) {
      themeMeta.setAttribute('content', isCurrentlyDark ? '#0f172a' : '#f8fafc');
    }
  }

  const navToggleButton = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.getElementById('mobile-nav');
  if (navToggleButton && mobileNav) {
    const toggleMenu = () => {
      mobileNav.classList.toggle('hidden');
      const isExpanded = !mobileNav.classList.contains('hidden');
      navToggleButton.setAttribute('aria-expanded', String(isExpanded));
    };
    navToggleButton.addEventListener('click', toggleMenu);
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (!mobileNav.classList.contains('hidden')) {
          toggleMenu();
        }
      });
    });
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !mobileNav.classList.contains('hidden')) {
        toggleMenu();
      }
    });
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch((error) => {
        // Registration failures should not break the page.
        console.error('Service worker registration failed:', error);
      });
    });
  }
});
