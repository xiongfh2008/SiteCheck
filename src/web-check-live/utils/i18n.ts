// web-check-live/utils/i18n.ts

// 导入翻译文件
import en from '../../locales/en.json';
import zh from '../../locales/zh.json';
import es from '../../locales/es.json';
import fr from '../../locales/fr.json';
import de from '../../locales/de.json';
import ja from '../../locales/ja.json';
import ko from '../../locales/ko.json';
import ru from '../../locales/ru.json';
import ar from '../../locales/ar.json';
import hi from '../../locales/hi.json';

// 定义支持的语言
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

// 翻译资源
const translations: Record<string, any> = {
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

// 获取嵌套值的辅助函数
function getNestedValue(obj: any, path: string) {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

// 翻译函数
export function t(key: string, lang: string = 'en'): string {
  const langTrans = translations[lang] || translations['en'];
  const value = getNestedValue(langTrans, key);
  if (value !== undefined) return value;

  const enValue = getNestedValue(translations['en'], key);
  if (enValue !== undefined) return enValue;

  return key;
}

// 获取支持的语言列表
export function getSupportedLanguages(): string[] {
  return Object.keys(SUPPORTED_LANGUAGES);
}

// 获取语言名称
export function getLanguageName(lang: string): string {
  return SUPPORTED_LANGUAGES[lang] || SUPPORTED_LANGUAGES['en'];
}