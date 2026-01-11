import React, { useEffect } from 'react';

const LanguageSwitcher = ({ currentLang = 'en' }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'ru', name: 'Русский' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिन्दी' }
  ];

  useEffect(() => {
    const handleLanguageChange = (event) => {
      const selectedLang = event.target.value;
      const currentPath = window.location.pathname;
      const currentQuery = new URLSearchParams(window.location.search);
      
      // 更新语言参数
      currentQuery.set('lang', selectedLang);
      
      // 重定向到新URL
      window.location.href = `${currentPath}?${currentQuery.toString()}`;
    };

    const selectElement = document.getElementById('language-select');
    if (selectElement) {
      selectElement.addEventListener('change', handleLanguageChange);
      
      return () => {
        selectElement.removeEventListener('change', handleLanguageChange);
      };
    }
  }, []);

  return (
    <div className="language-switcher">
      <select id="language-select" defaultValue={currentLang}>
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <span className="language-icon">🌐</span>
    </div>
  );
};

export default LanguageSwitcher;