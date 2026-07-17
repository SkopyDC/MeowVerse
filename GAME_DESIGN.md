# MeowVerse – herní design

Tento dokument je zdrojem pravdy pro první hratelný vertical slice. Novější pravidla v této verzi nahrazují původní návrh tříčlenného týmu.

## Hlavní herní smyčka

1. Hráč vyzvedává rybky z budov na ostrově a získává odměny z duelů.
2. Za rybky otevírá transparentní běžné balíčky a rozšiřuje sbírku.
3. Ze skutečně vlastněných kopií sestavuje bojový balíček přesně 20 karet a volí jednu veřejnou nasazenou kočku.
4. V aréně hraje karty z ruky proti počítači podle elementů, levelů a přesně popsaných pasivek.
5. Za výsledek získává rybky, zkušenosti a vybrané jednorázové diamantové odměny.

## Měny a férovost

### Rybky

Běžná měna z produkce, duelů a budoucích úkolů, expedic a událostí. Běžný balíček stojí 50 rybek. Zůstatek nikdy nesmí být záporný.

### Diamanty

Vzácná měna dostupná i bez placení. Pro prototyp hráč začíná s 10 diamanty a získá 2 za nový level, 5 za první výhru a 1 za splnění tří denních úkolů. Testovací diamantový balíček stojí 25 diamantů, garantuje minimálně vzácnou kočku a má zvýšenou shiny šanci; žádná bojová kočka není exkluzivní.

Hra nebude používat pay-to-win, falešné časovače, matoucí ceny ani skryté šance. Skutečné platby nejsou součástí prototypu.

## Sbírka a varianty

Sbírka eviduje počet běžných a shiny kopií každé kočky. Kočka má element, raritu, základní sílu, level 1–10, zkušenosti a přesně definovanou pasivku. Každý level nad 1 přidává 2 body síly.

Shiny je varianta existující kočky, nikoliv samostatný druh. Základní shiny šance je 1 % a vyhodnocuje se odděleně od rarity. Shiny nepřidává plošně vyšší statistiky; přidává vizuální a strategickou pasivku.

První verze podporuje nejméně tyto shiny pasivky:

- **Rozšířená ruka:** pokud je shiny kočka nasazená, maximální ruka je 6; efekt se nesčítá.
- **Pán remíz:** při shodné finální síle použije přesné rozhodování popsané níže.
- **První tah:** zahraná shiny kočka získá v prvním kole malý, centrálně nastavený bonus.

## Bojový balíček

Bojový balíček obsahuje přesně 20 karet. Kopie musí hráč skutečně vlastnit. Limity jsou konfigurovatelné:

- běžná a vzácná: nejvýše 3 kopie,
- epická: nejvýše 2 kopie,
- legendární a mýtická: nejvýše 1 kopie.

Začátečník se třemi kočkami dostane dočasný výukový balíček. Editor ukazuje validitu, elementy, rarity, průměrnou sílu, shiny počet a umožňuje vybrat nasazenou kočku. Pro prototyp se ukládá jedna konfigurace.

## Nasazená kočka

Nasazená kočka je vlastněná kočka zvolená před duelem. Nemusí být v balíčku. Je veřejná, není součástí ruky a lze ji zahrát jednou za duel. UI ukazuje její jméno, element, raritu, level, pasivku a stav použití.

## Duel

Oba hráči používají balíček 20 karet, zamíchaný injektovaným generátorem náhodnosti. Úvodní ruka má 5 karet, případně 6 díky Rozšířené ruce. Zahraná karta jde do odhazovací hromádky a po kole se ruka doplní do maxima. Odhazovací hromádka se znovu nemíchá.

Vyhrává první hráč se třemi vítěznými koly. Duel má nejvýše sedm kol. Po sedmém kole vyhrává vyšší počet vyhraných kol; při shodě končí duel remízou.

### Výpočet síly

Výpočet je deterministický a používá toto pořadí:

1. základní síla,
2. levelový bonus `2 × (level − 1)`,
3. elementární bonus 25 % **základní síly**,
4. běžná pasivka zahrané kočky,
5. shiny pasivka,
6. dočasné efekty.

Po sečtení se výsledek jednou zaokrouhlí standardním matematickým zaokrouhlením na celé číslo (`Math.round`). UI zobrazí všechny položky výpočtu.

### Remíza kola

Po výpočtu finální síly:

1. bez aktivního Pána remíz zůstává kolo remízou,
2. s Pánem remíz pouze na jedné straně tato strana vyhrává,
3. s Pánem remíz na obou stranách vyhrává vyšší level právě zahrané kočky,
4. při stejném levelu zůstává skutečná remíza.

## Počítačový soupeř

AI používá stejný stav a pravidla jako hráč. Smí znát jen svou ruku a nasazenou kočku, veřejnou nasazenou kočku hráče, zahrané karty a historii kol. Zvažuje element veřejné kočky, průběh duelu a šetření nasazené kočky; nikdy nečte hráčovu ruku ani pořadí jeho balíčku.

## Ukládání

`localStorage` uchovává rybky, diamanty, level hráče, zkušenosti, kočky včetně levelů a shiny kopií, bojový balíček, nasazenou kočku, výhry/prohry/remízy, tutorial a čas produkce. Rozpracovaný duel může ukládat balíček, ruku a odhazovací hromádku. Načtení neplatných nebo starších dat proběhne přes validovanou migraci a bezpečné výchozí hodnoty.

## UI arény

Nahoře je soupeř, skóre, jeho veřejná nasazená kočka a pouze počty skrytých karet. Uprostřed probíhá současné odhalení a přesný výpočet. Dole je hráčova ruka, vlastní nasazená kočka, dobírací a odhazovací hromádka a potvrzení výběru. Detail karty je dostupný podržením.

## Ochrany

- nákup je atomický a během animace uzamčený,
- rybky ani diamanty nesmí klesnout pod nulu,
- šance jsou viditelné před nákupem,
- náhodnost je injektovatelná a testovatelná,
- UI respektuje iPhone safe areas a `prefers-reduced-motion`,
- původní první minihra zůstává jako easter egg po pěti poklepáních na logo.
