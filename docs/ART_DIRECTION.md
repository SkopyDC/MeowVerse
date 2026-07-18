# MeowVerse – Art Direction

## Výtvarná vize

MeowVerse je ručně ilustrovaný, hřejivý fantasy svět koček. Siluety jsou měkké a čitelné, postavy mají výrazné oči a každá obrazovka kombinuje malovanou hloubku s čistým mobilním UI. Vizuál nesmí působit jako dashboard, neonové sci-fi ani směs cizích stylů.

## Barevná paleta

- Inkoustová: `#29233F` – text a nejhlubší stíny.
- Krémová: `#FFF8E8` – hlavní plochy a světlo.
- Fialová: `#6953C6` – značka, magie a aktivní navigace.
- Korálová: `#F17B68` – primární akce a teplé akcenty.
- Zlatá: `#F6C75B` – odměny a legendární prvky.
- Nebeská: `#79CDE1` – voda a klidné plochy.
- Listová: `#69AD68` – ostrov a příroda.
- Švestková: `#3B315C` – aréna a večerní kontrast.

Barvy elementů: Oheň `#EF6A52`, Voda `#4AAFD3`, Příroda `#68AB69`. Barva nikdy není jediným nositelem významu; doplňuje ji ikona a text.

## Typografie

Používá se systémová rodina `ui-rounded`, `SF Pro Rounded`, `Nunito`, `system-ui`. Nadpisy mají vysokou váhu, mírně utažené mezery a nejvýše dva řádky. Herní obrazovky nepoužívají dlouhé bloky textu.

## Stíny a hloubka

- UI: dva měkké stíny, krátký kontaktní a široký ambientní.
- Ilustrace: barevný ambientní stín, nikoliv čistě černý.
- Interaktivní objekt se při stisku posune o 2 px a zmenší na 97 %.
- Sklo se používá pouze pro kompaktní horní lištu a informační panely.

## Zaoblení

- Primární tlačítko: 18–22 px.
- Panely: 24–30 px.
- Karty koček: 26 px s vlastní siluetou rámu.
- Malé čipy: plné pilulky.

## Dotykové cíle a tlačítka

Minimální cíl je 44 × 44 px. Primární tlačítko má výšku nejméně 52 px, jasný slovesný popisek a jeden dominantní gradient. Zakázaná tlačítka zůstávají čitelná.

## Ikony

Vlastní SVG ikony mají kulaté konce, tloušťku 2–2,5 px a optickou velikost 24 px. Emoji ani textové symboly nejsou hlavní grafikou.

## Karty a rarity

- Běžná: krémový matný rám, jeden světelný bod.
- Vzácná: modrostříbrný dvojitý rám a jemná aura.
- Epická: fialový rám, šikmý pohyblivý lesk a částice.
- Legendární: zlatý pohyblivý okraj, malované sluneční pozadí a aura.
- Mýtická: vícevrstvý perleťový rám, hluboké hvězdné pozadí a plovoucí částice.
- Shiny: samostatná holografická vrstva, třpyt a značka `SHINY`; nikdy pouze změna barvy rámu.

## Animace

Všechny běžné přechody trvají 160–320 ms. Používají hlavně `transform` a `opacity`. Ambientní animace jsou pomalé (3–14 s). Odhalení balíčku může trvat déle, ale po prvním zhlédnutí je zkrátitelné. Při `prefers-reduced-motion` se pohyb odstraní a stav se sdělí staticky.

## Haptika a zvuk

Krátká haptika doprovází výběr a sběr, silnější pouze dopad schránky a legendární odhalení. `navigator.vibrate` má vždy fallback. Zvuk se aktivuje až po dotyku uživatele; používá krátké lokální efekty a musí jít ztlumit.

## iPhone safe areas

Horní shell používá `env(safe-area-inset-top)`, spodní navigace `env(safe-area-inset-bottom)`. Důležitá akce nikdy neleží blíže než 12 px od safe area. Výchozí návrhový viewport je 390 × 844 px, kontrolní 393 × 852 px a 430 × 932 px.

## Assety

Všechny obrázky se načítají přes `src/data/assetManifest.ts`. Klíčové assety se preloadují před zobrazením aplikace. SVG jsou připravená na libovolné DPI; budoucí rastrové náhrady použijí WebP/PNG ve 2× rozlišení.
# Pětisekundový test ostrova

Ostrov musí bez vysvětlování během prvních pěti sekund sdělit tři věci: aréna je hlavní cesta do PvP, balíčkový dům je druhý hlavní cíl a rybník, mlékárna, dílna a auto jsou výrobní zázemí. Hráč má poznat klikatelné budovy podle objemu, stínu, animace a ukazatele – ne podle plovoucího panelu.

Kontrolní otázky pro každý screenshot:

- Je první pohled na arénu a druhý na balíčkový dům?
- Jsou budovy čitelné i bez indikátorů a bez textových popisků?
- Je mezi objekty dost klidného terénu a žádný ukazatel nekoliduje s HUD?
- Reaguje přímo zobrazená budova, nikoli neviditelná plocha mimo ni?
- Zůstávají kočky, dekorace a foreground podpůrné, nikoli dominantní?

Kompozice používá jediný scene graph 1000 × 1600. Souřadnice, pořadí vrstev, hit area i kotvy indikátorů jsou definované v `src/data/islandScene.ts`; CSS neurčuje polohu jednotlivých budov.
