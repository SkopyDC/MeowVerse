# Changelog

## 2026-07-17 – Fullscreen ostrov a dvě cesty k vítězství

- Ostrov přepracován na souvislou fullscreen kočičí vesnici bez plovoucího oválu a stálých popisků.
- Nový účet dostává šest unikátních startovních koček, dvě od každého živlu, a platnou výchozí sestavu.
- PvP podporuje elementární i specializované vítězství, nejvýše devět kol a deterministický tiebreak.
- Aréna ukazuje postup obou hráčů ikonami živlů a unikátních identit.
- Běžná AI i pokročilý Sensei sledují veřejný postup nových vítězných cest.
- Přidány testy startovního save, čisté vyhodnocovací logiky, AI a mobilního rozvržení.

## 0.4.0 – mobilní UX/UI stabilizace

- Sjednocen AppShell, horní lišta, scrollovatelný obsah a spodní navigace.
- Nahrazeny čtyři konfliktní CSS vrstvy jedním tokenizovaným design systémem.
- Ostrov používá jediný informační panel a kontrolovanou ilustrační vrstvu.
- Sbírka a editor balíčku jsou oddělené režimy; detail kočky je v modalu.
- Pravděpodobnosti schránky jsou skryté pod vedlejší akcí.
- Duel skrývá běžnou navigaci a používá samostatný bezpečný panel akce.
- Přidány Playwright kontroly a screenshoty pro tři mobilní viewporty.

## 0.3.0 – prémiový vizuální vertical slice

- Kompletně přepracována vizuální vrstva bez změny herních mechanik.
- Přidána art direction a centrální manifest assetů.
- Přidány vlastní SVG ilustrace ostrova, budov, koček, schránky a navigačních ikon.
- Přidán preload a loading screen, parallax ostrova a interakce budov.
- Přepracovány rarity, shiny holografie, Kočičí schránka a aréna.
- Přidán detail karty podržením a animace odhalení.

## 0.2.0 – karetní vertical slice

- Přidány dvě měny: rybky a diamanty.
- Původní tým tří koček nahrazen balíčkem 20 karet, rukou 5/6 a nasazenou kočkou.
- Přidán duel na tři vítězství a nejvýše sedm kol.
- Přidány levely koček, shiny varianty a pasivky Rozšířená ruka, Pán remíz a První tah.
- Přidán editor balíčku, limity kopií a validace vlastnictví.
- Přidány běžné a testovací diamantové balíčky s veřejnými pravděpodobnostmi.
- Přidána deterministická AI bez přístupu ke skrytým kartám hráče.
- Rozšířena automatická testovací sada.
- Původní arkáda zachována v `/legacy/` jako easter egg po pěti poklepáních na logo.
