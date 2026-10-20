# AGENTS.md

Fork d'EduTicTac del simulador LEGO SPIKE (Svelte 4 + Vite + Blockly), traduït a ca/va/es.

## Ordres

- `npm ci` — instal·la dependències.
- `npm run build` — genera `dist/` (un únic `index.html` amb tot inclòs + `static/`).
- `npm run check` — svelte-check (ha de donar 0 errors).
- `npx prettier --write <fitxers>` — format del projecte (4 espais, cometes simples).

## Traduccions

- `src/lib/i18n/index.ts`: detecció d'idioma (`?lang=` → `localStorage['spike-lang']` → navegador), `t()`, `localizeBlocks()`, `localizeToolbox()`.
- `src/lib/i18n/{ca,va,es}.ts`: claus = text original en anglès. `va.ts` només porta les formes que difereixen del català central.
- Els blocs es tradueixen en registrar-los: només `messageN` i l'etiqueta de text de les opcions dels desplegables. Els valors interns no es toquen, per mantindre la compatibilitat amb fitxers `.llsp3`.
- Un text nou de la interfície s'escriu en anglès i s'embolica amb `t('...')`; després s'afig la clau als tres diccionaris.

## Publicació (EduTicTac Pages)

Es publica a `https://pages.edutictac.es/Edutictac/lego-spike-simulator/` des de la branca `pages` del repositori de Forgejo `git.edutictac.es/Edutictac/lego-spike-simulator`:

1. `npm run build`
2. Copiar el contingut de `dist/` a l'arrel d'un worktree de la branca `pages`, fer commit i push a `forgejo`.

## Remots

- `forgejo`: `git.edutictac.es/Edutictac/lego-spike-simulator` (principal, alimenta Pages).
- `origin`: `github.com/Edutictac/lego-spike-simulator`.
- `upstream`: `github.com/alexandrehardy/lego-spike-simulator` (només lectura; de moment no s'hi proposen canvis).
