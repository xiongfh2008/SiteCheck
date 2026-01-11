// web-check-live/components/misc/LanguageHandler.tsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageHandler = () => {
  const { currentLang, setCurrentLang } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    // 检查 URL 中的语言参数
    const urlParams = new URLSearchParams(location.search);
    const langFromUrl = urlParams.get('lang') || 'en';
    
    // 如果 URL 中的语言与当前语言不同，则更新
    if (langFromUrl !== currentLang) {
      setCurrentLang(langFromUrl);
    }
  }, [location, currentLang, setCurrentLang]);

  return null; // 这个组件不渲染任何内容，只处理逻辑
};

export default LanguageHandler;