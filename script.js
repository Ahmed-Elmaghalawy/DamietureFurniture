document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Mode ---
  // Unconditionally apply dark mode since the brand theme is black and red
  document.documentElement.classList.add('dark');

  // --- Language Toggle ---
  const langToggle = document.getElementById('langToggle');
  const langFlag = document.getElementById('langFlag');
  
  // Default to English
  let currentLang = localStorage.getItem('lang') || 'en';
  
  const updateLanguage = (lang) => {
    // Flag logic: if current is English, show UAE flag (to switch to Arabic), and vice versa.
    // Or we can show the current language flag. Let's show the flag of the language we can switch to.
    if (lang === 'en') {
      document.body.setAttribute('dir', 'ltr');
      langFlag.textContent = '🇦🇪'; // Click to switch to Arabic
      document.body.style.fontFamily = ''; // Default
    } else {
      document.body.setAttribute('dir', 'rtl');
      langFlag.textContent = '🇬🇧'; // Click to switch to English
      document.body.style.fontFamily = 'Tahoma, Arial, sans-serif'; // Better for Arabic
    }
    
    document.body.setAttribute('data-lang', lang);

    // Apply translations
    const elements = document.querySelectorAll('[data-en][data-ar]');
    elements.forEach(el => {
      // Add animation classes for smooth transition
      el.classList.add('lang-switch-out');
      
      setTimeout(() => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = el.getAttribute(`data-${lang}`);
        } else {
          // If the element has a specific structure inside, we might need to be careful,
          // but most of our data-en/data-ar elements just contain text.
          el.textContent = el.getAttribute(`data-${lang}`);
        }
        
        el.classList.remove('lang-switch-out');
        el.classList.add('lang-switch-in');
        
        setTimeout(() => {
          el.classList.remove('lang-switch-in');
        }, 400);
      }, 300);
    });
  };

  // Initialize language
  updateLanguage(currentLang);

  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', currentLang);
    updateLanguage(currentLang);
  });

  // --- Mobile Menu Toggle ---
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
});
