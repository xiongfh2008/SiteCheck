import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// 创建语言上下文
const LanguageContext = createContext({
  currentLang: 'en',
  setCurrentLang: (lang: string) => {},
});

// 自定义 Hook 来访问语言上下文
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// 语言提供者组件
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLang, setCurrentLang] = useState('en');
  const location = useLocation();

  // 监听 URL 变化并更新语言
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const langFromUrl = urlParams.get('lang') || 'en';
    
    // 如果 URL 中的语言与当前语言不同，则更新
    if (langFromUrl !== currentLang) {
      setCurrentLang(langFromUrl);
    }
  }, [location, currentLang]);

  // 当语言改变时，更新 URL
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', currentLang);
    window.history.replaceState({}, '', url.toString());
  }, [currentLang]);

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang }}>
      {children}
    </LanguageContext.Provider>
  );
};