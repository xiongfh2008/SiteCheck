import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入翻译资源
import enTranslation from '../locales/en.json';
import zhTranslation from '../locales/zh.json';
import esTranslation from '../locales/es.json';
import frTranslation from '../locales/fr.json';
import deTranslation from '../locales/de.json';
import jaTranslation from '../locales/ja.json';
import koTranslation from '../locales/ko.json';
import ruTranslation from '../locales/ru.json';
import arTranslation from '../locales/ar.json';
import hiTranslation from '../locales/hi.json';

// 创建 locales 目录（如果不存在）
try {
  await new Promise((resolve, reject) => {
    const fs = require('fs');
    const localesDir = './src/locales';
    if (!fs.existsSync(localesDir)) {
      fs.mkdirSync(localesDir, { recursive: true });
      console.log('Created locales directory');
    }
    resolve();
  });
} catch (e) {
  // 在浏览器环境中这会失败，这是正常的
}

i18n
  .use(LanguageDetector) // 自动检测用户语言
  .use(initReactI18next) // 将 i18n 实例连接到 React
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
      es: {
        translation: esTranslation,
      },
      fr: {
        translation: frTranslation,
      },
      de: {
        translation: deTranslation,
      },
      ja: {
        translation: jaTranslation,
      },
      ko: {
        translation: koTranslation,
      },
      ru: {
        translation: ruTranslation,
      },
      ar: {
        translation: arTranslation,
      },
      hi: {
        translation: hiTranslation,
      },
    },
    fallbackLng: 'en', // 默认语言
    debug: true,
    
    interpolation: {
      escapeValue: false, // React 已经安全地转义
    },
    
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;