// web-check-live/hooks/useTranslation.ts

import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/i18n';

export const useTranslation = () => {
  const { currentLang } = useLanguage();
  
  // 翻译函数，使用当前语言
  const translate = (key: string) => {
    return t(key, currentLang);
  };

  return {
    t: translate,
    currentLang
  };
};