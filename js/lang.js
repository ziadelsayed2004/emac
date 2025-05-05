const resources = {
    en: {
      translation: {
        home: "Home",
        about: "About",
        services: "Services",
        project: "Projects",
        pages: "Pages",
        blog_page: "Blog",
        single_page: "Single Blog",
        contact: "Contact",
        menu: "EMAC",
      }
    },
    ar: {
      translation: {
        home: "الرئيسية",
        about: "حول",
        services: "الخدمات",
        project: "المشاريع",
        pages: "الصفحات",
        blog_page: "المدونة",
        single_page: "مدونة فردية",
        contact: "التواصل",
        menu: "ايماك",
      }
    }
  };
  
  let currentLang = 'en';
  
  i18next.init({
    lng: currentLang,
    resources
  }, function(err, t) {
    updateContent();
    updateDirection();
  });
  
  function changeLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    i18next.changeLanguage(currentLang, () => {
      updateContent();
      updateToggleButton();
      updateDirection();
    });
  }
  
  function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.innerHTML = i18next.t(key);
    });
  }
  
  function updateToggleButton() {
    const btn = document.getElementById('langToggle');
    btn.querySelector('.lang-text').textContent = currentLang.toUpperCase();
  }
  
  function updateDirection() {
    document.body.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';
  }
  
  document.getElementById('langToggle').addEventListener('click', changeLanguage);  