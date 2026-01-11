// src/lib/i18n-client.js
// Client-side i18n utility that loads translations dynamically

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
  'hi': 'हिंदी'
};

// Cache for loaded translations
const translationCache = new Map();

async function loadTranslations(lang) {
  if (translationCache.has(lang)) {
    return translationCache.get(lang);
  }

  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load ${lang}.json`);
    }
    const translations = await response.json();
    translationCache.set(lang, translations);
    return translations;
  } catch (error) {
    console.warn(`Failed to load translations for ${lang}:`, error);
    return null;
  }
}

function getNestedValue(obj, path) {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

export async function t(key, lang = 'en') {
  // First try to get from requested language
  const translations = await loadTranslations(lang);

  if (translations) {
    const value = getNestedValue(translations, key);
    if (value) return value;
  }

  // Fallback to English
  const enTranslations = await loadTranslations('en');
  if (enTranslations) {
    const value = getNestedValue(enTranslations, key);
    if (value) return value;
  }

  // Return the key if nothing found
  return key;
}

export function isValidLanguage(lang) {
  return !!SUPPORTED_LANGUAGES[lang];
}

export function getSupportedLanguages() {
  return Object.keys(SUPPORTED_LANGUAGES);
}
