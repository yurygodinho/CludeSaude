import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import ptTranslation from './locales/pt/translation.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: enTranslation,
        },
        pt: {
            translation: ptTranslation,
        },
    },
    lng: 'pt', // Idioma inicial para Português
    fallbackLng: 'en', // Idioma padrão caso o idioma escolhido não tenha as traduções
    debug: true, // Ativar para ajudar no desenvolvimento
    interpolation: {
        escapeValue: false, // React já faz escaping
    },
});

export default i18n;
