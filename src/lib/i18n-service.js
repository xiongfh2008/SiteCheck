// src/lib/i18n-service.js
import en from '../locales/en.json';
import zh from '../locales/zh.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import de from '../locales/de.json';
import ja from '../locales/ja.json';
import ko from '../locales/ko.json';
import ru from '../locales/ru.json';
import ar from '../locales/ar.json';
import hi from '../locales/hi.json';

export const SUPPORTED_LANGUAGES = {
  'en': 'English',
  'zh': '中文',
  'es': 'Español',
  'fr': 'Français',
  'de': 'Deutsch',
  'ja': '日本語',
  'ko': '한국어',
  'ru': 'Русский',
  'ar': 'العربية',
  'hi': 'हिन्दी'
};

const translations = {
  en,
  zh,
  es,
  fr,
  de,
  ja,
  ko,
  ru,
  ar,
  hi
};

export function getSupportedLanguages() {
  return Object.keys(SUPPORTED_LANGUAGES);
}

export function getLanguageName(lang) {
  return SUPPORTED_LANGUAGES[lang] || SUPPORTED_LANGUAGES['en'];
}

export function isValidLanguage(lang) {
  return !!SUPPORTED_LANGUAGES[lang];
}

function getNestedValue(obj, path) {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

export function t(key, lang = 'en') {
  const langTrans = translations[lang] || translations['en'];
  const value = getNestedValue(langTrans, key);
  if (value !== undefined) return value;

  const enValue = getNestedValue(translations['en'], key);
  if (enValue !== undefined) return enValue;

  return key;
}