// Traducció de la interfície i dels blocs.
// Els diccionaris fan servir el text original en anglès com a clau, de manera
// que el codi original continua escrit en anglès i, si falta una traducció,
// es mostra el text en anglès.
import * as BlocklyEn from 'blockly/msg/en';
import * as BlocklyCa from 'blockly/msg/ca';
import * as BlocklyEs from 'blockly/msg/es';
import { ca } from './ca';
import { va } from './va';
import { es } from './es';

export type Lang = 'ca' | 'va' | 'es' | 'en';

export const languages: { code: Lang; name: string }[] = [
    { code: 'ca', name: 'Català' },
    { code: 'va', name: 'Valencià' },
    { code: 'es', name: 'Castellano' },
    { code: 'en', name: 'English' }
];

const STORAGE_KEY = 'spike-lang';

function isLang(value: unknown): value is Lang {
    return value === 'ca' || value === 'va' || value === 'es' || value === 'en';
}

function detectLang(): Lang {
    try {
        const param = new URLSearchParams(window.location.search).get('lang');
        if (isLang(param)) {
            return param;
        }
    } catch {
        // sense URL vàlida: continuem amb la resta de fonts
    }
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (isLang(saved)) {
            return saved;
        }
    } catch {
        // localStorage pot no estar disponible (iframe, mode privat)
    }
    const nav = (navigator.language || '').toLowerCase();
    if (nav.includes('valencia')) return 'va';
    if (nav.startsWith('es')) return 'es';
    if (nav.startsWith('en')) return 'en';
    return 'ca';
}

export const lang: Lang = detectLang();

function normalize(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
}

// Les claus es normalitzen (espais) perquè coincidisquen amb els textos dels
// blocs, que de vegades porten espais dobles, i amb els nodes de text de Svelte.
function build(...sources: Record<string, string>[]): Map<string, string> {
    const map = new Map<string, string>();
    for (const source of sources) {
        for (const [key, value] of Object.entries(source)) {
            map.set(normalize(key), value);
        }
    }
    return map;
}

const dictionary: Map<string, string> =
    lang === 'ca'
        ? build(ca)
        : lang === 'va'
          ? build(ca, va)
          : lang === 'es'
            ? build(es)
            : new Map();

export function t(text: string): string {
    return dictionary.get(normalize(text)) ?? text;
}

export function blocklyMessages(): Record<string, string> {
    const messages = lang === 'es' ? BlocklyEs : lang === 'en' ? BlocklyEn : BlocklyCa;
    return messages as unknown as Record<string, string>;
}

export function setLang(next: Lang) {
    try {
        localStorage.setItem(STORAGE_KEY, next);
    } catch {
        // ignorat: el paràmetre de la URL ja conserva l'idioma
    }
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.location.replace(url.toString());
}

type JsonObject = Record<string, unknown>;

// Tradueix message0..N i les etiquetes de text dels desplegables d'una
// definició de bloc JSON. Els valors interns (segon element de cada opció) no
// es toquen, de manera que els programes desats continuen sent compatibles.
function localizeBlock(block: JsonObject): JsonObject {
    const result: JsonObject = { ...block };
    for (const key of Object.keys(block)) {
        if (/^message\d+$/.test(key) && typeof block[key] === 'string') {
            result[key] = t(block[key] as string);
        } else if (/^args\d+$/.test(key) && Array.isArray(block[key])) {
            result[key] = (block[key] as JsonObject[]).map((arg) => {
                if (!Array.isArray(arg.options)) {
                    return arg;
                }
                return {
                    ...arg,
                    options: (arg.options as unknown[][]).map((option) =>
                        typeof option[0] === 'string' ? [t(option[0]), ...option.slice(1)] : option
                    )
                };
            });
        }
    }
    return result;
}

export function localizeBlocks<T>(blocks: T[]): T[] {
    if (lang === 'en') return blocks;
    return blocks.map((block) => localizeBlock(block as JsonObject) as T);
}

export function localizeToolbox<T extends { contents: { name?: string }[] }>(toolbox: T): T {
    if (lang === 'en') return toolbox;
    return {
        ...toolbox,
        contents: toolbox.contents.map((entry) =>
            entry.name ? { ...entry, name: t(entry.name) } : entry
        )
    };
}

document.documentElement.lang = lang === 'va' ? 'ca-ES-valencia' : lang;
document.title = t(document.title);
