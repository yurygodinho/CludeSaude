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
    lng: 'pt', // Idioma inicial para Portugu�s
    fallbackLng: 'en', // Idioma padr�o caso o idioma escolhido n�o tenha as tradu��es
    debug: true, // Ativar para ajudar no desenvolvimento
    interpolation: {
        escapeValue: false, // React j� faz escaping
    },
});

export default i18n;
