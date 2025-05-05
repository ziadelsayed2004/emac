const resources = {
    en: {
      translation: {
        emac_title: "Emac - Contracting & Supplies",
        home: "Home",
        about: "About",
        services: "Services",
        project: "Projects",
        pages: "Pages",
        blog_page: "Blog",
        single_page: "Single Blog",
        contact: "Contact",
        menu: "EMAC",
        opening_hour: "Opening Hour",
        opening_hour_val: "Sat - Thu, 8:00 - 9:00",
        call_us: "Call Us",
        call_us_val: "201226035184",
        email_us: "Email Us",
        email_us_val: "info@emaccon.com",
        get_a_quote: "Get A Quote",
        welcome_h1: "Welcome to EMAC",
        welcome_p1: "We guarantee the highest quality workmanship in the construction industry. \n Est. 2013",
        welcome_h2: "What is the \"Emac\" ?",
        welcome_p2: "Emac is a company working in the field of contracting since 2013",
        welcome_h3: "What are EMAC's top projects?",
        welcome_p3: "Emac has constructed several successful projects in different industrial fields with top quality and fastest delivery time inside and the Arab Republic of Egypt.",
      }
    },
    ar: {
      translation: {
        emac_title: "ايماك - البناء والامدادات",
        home: "الرئيسية",
        about: "حول",
        services: "الخدمات",
        project: "المشاريع",
        pages: "الصفحات",
        blog_page: "المدونة",
        single_page: "مدونة فردية",
        contact: "التواصل",
        menu: "ايماك",
        opening_hour: "ساعات العمل",
        opening_hour_val: "السبت - الخميس , 8:00 - 9:00",
        call_us: "اتصل بنا",
        call_us_val: "201226035184",
        email_us: "تواصل عبر البريد",
        email_us_val: "info@emaccon.com",
        get_a_quote: "احصل على عرض",
        welcome_h1: "Welcome to EMAC",
        welcome_p1: "We guarantee the highest quality workmanship in the construction industry. \n Est. 2013",
        welcome_h2: "What is the \"Emac\" ?",
        welcome_p2: "Emac is a company working in the field of contracting since 2013",
        welcome_h3: "What are EMAC's top projects?",
        welcome_p3: "Emac has constructed several successful projects in different industrial fields with top quality and fastest delivery time inside and the Arab Republic of Egypt.",
      }
    }
  };

let currentLang = localStorage.getItem('lang') || 'en';

i18next.init({
  lng: currentLang,
  resources
}, function(err, t) {
  updateContent();
  updateDirection();
  updateToggleButton();
});

function changeLanguage() {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  localStorage.setItem('lang', currentLang);
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
  if (btn) btn.querySelector('.lang-text').textContent = currentLang.toUpperCase();
}

function updateDirection() {
  document.body.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';
}

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = i18next.t(key).replace(/\n/g, '<br>');
      el.innerHTML = translated;
    });
  }
  

document.getElementById('langToggle').addEventListener('click', changeLanguage);
