# EduTicTac · Simulador LEGO SPIKE

Fork de [alexandrehardy/lego-spike-simulator](https://github.com/alexandrehardy/lego-spike-simulator)
mantingut per la Comunitat EduTicTac. Afig la interfície i els blocs en
**català, valencià i castellà** (a més de l'anglès original).

- Versió publicada: <https://pages.edutictac.es/Edutictac/lego-spike-simulator/>
- Idioma: paràmetre `?lang=ca|va|es|en`, selector a la barra superior o idioma del navegador.
- Traduccions: `src/lib/i18n/` (claus = text original en anglès; `va.ts` només conté les diferències amb `ca.ts`).
- Publicació: `npm run build` i copiar `dist/` a la branca `pages` (vegeu `AGENTS.md`).

Llicència GPL-2.0, igual que l'original (vegeu `COPYING.md`).

---

Welcome to the lego-spike-simulator project. The aim is to provide
an environment where LEGO spike robots can be simulated and the
code tested before uploading to a real LEGO spike robot.

The environment currently only supports the blockly based programming
language.

The simulator allows lego format llsp3 programs to be loaded and saved,
and can load robots in the ldraw format (ldr and mpd extensions).
Port connectivity can be specified, and saved into a robot to be loaded
again at a later time. A basic scene can be setup using images for a base
map and ldraw objects for obstacles in the scene.

There is very limited physics at the moment, focussed on moving a
wheel base with a specific gearing.

The system is currently available at http://spike.ahardy.za.net/.
However, the system can be built locally and executed directly
from files, so no webserver is required. The software can run completely
from the web browser.

# Screenshots

![Start screen](./website/start.png)

![Code loaded](./website/code.png)

![Preparing to open a robot](./website/open_robot.png)

![Robot view](./website/robot_view.png)

![Port connector](./website/port_connector.png)

![Opening a scene](./website/load_scene.png)

![Running simulator](./website/running.png)

# Robots

[Driving base 3](http://ahfiles.s3-website.us-east-1.amazonaws.com/robots/DrivingBase3.mpd)

# Scenes

[WRO In house 2025 Level 1](http://ahfiles.s3-website.us-east-1.amazonaws.com/scenes/WRO-InHouse-Level1.spk)
