// src/components/Translate.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Translate = ({ children, ns, keyPrefix }) => {
  const { t } = useTranslation(ns, { keyPrefix });

  if (typeof children === 'string') {
    // 如果children是字符串，则直接翻译
    return t(children);
  } else if (React.isValidElement(children)) {
    // 如果是React元素，则递归处理其props和children
    const translateProps = (obj) => {
      if (typeof obj === 'string') {
        return t(obj);
      } else if (Array.isArray(obj)) {
        return obj.map(item => typeof item === 'string' ? t(item) : translateProps(item));
      } else if (typeof obj === 'object' && obj !== null) {
        const translatedObj = {};
        for (const [key, value] of Object.entries(obj)) {
          translatedObj[key] = typeof value === 'string' ? t(value) : translateProps(value);
        }
        return translatedObj;
      }
      return obj;
    };

    return React.cloneElement(children, {
      ...translateProps(children.props),
      children: translateProps(children.props.children)
    });
  } else if (typeof children === 'object' && children !== null) {
    // 如果children是对象，则尝试翻译对象的值
    return Object.fromEntries(
      Object.entries(children).map(([key, value]) => [
        key,
        typeof value === 'string' ? t(value) : value
      ])
    );
  }

  return children;
};

export default Translate;