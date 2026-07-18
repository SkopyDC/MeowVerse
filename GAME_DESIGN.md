# MeowVerse – herní design

> **Autoritativní směr prototypu (18. 7. 2026):** MeowVerse je karetní PvP hra o sbírání koček a rozvoji kočičí základny. Hráč sestavuje balíček přesně 20 koček. Na začátku zápasu se balíček zamíchá a hráč si lízne pět koček. V každém tahu zahraje jednu kočku a poté si dolízne jednu další, pokud v balíčku ještě nějaká zbývá. Každá kočka má právě jeden element, sílu od 1 do 100 a může mít nejvýše jednu jednoduchou pasivní schopnost. Kočky nemají levely. Postupují pouze hráč a základna.

> PvP je hlavní obsah hry. Základna, ekonomika, výroba a sbírání existují proto, aby hráči rozšiřovaly možnosti přípravy do PvP. MeowVerse se vrací ke karetnímu souboji, ale nemá napodobovat klasickou komplexní karetní hru s manou, kouzly, reakcemi, dlouhými texty a složitými řetězci efektů.

> Ostrov je fullscreen vesnice v perspektivě 3/4 shora. Rybník, aréna, centrum, cesty a budoucí parcely jsou součástí jednoho ilustrovaného prostředí bez viditelného geometrického okraje. Budovy se vybírají přímo ve scéně a jejich hlavní akce se zobrazují v jednoduchém mobilním panelu.

## Vize hry

MeowVerse je dlouhodobá kompetitivní hra o sbírání koček, stavbě balíčků a rozvoji kočičí základny. Hlavním důvodem, proč hráč rozšiřuje sbírku a vrací se na ostrov, je získávání nových možností pro krátké PvP zápasy.

Základna není samostatná farma bez cíle. Je to hospodářské a přípravné zázemí pro PvP. PvP není vedlejší minihra; je hlavním místem, kde se projeví kvalita balíčku, znalost koček, práce s náhodně dobranou rukou a rozhodnutí během zápasu.

Hra stojí na čtyřech pilířích:

1. **Sbírání koček** – získávání nových elementů, sil a jednoduchých pasivek.
2. **Stavba balíčku** – výběr přesně 20 koček a hledání spolehlivých kombinací.
3. **Krátké karetní PvP** – čitelné tahy, práce s rukou a rychlá rozhodnutí.
4. **Rozvoj základny** – výroba, objednávky a vylepšení podporující další PvP hraní.

---

## 1. Hlavní gameplay loop

Základní smyčka jednoho herního sezení:

1. Hráč se vrátí na základnu a vyzvedne dokončenou výrobu.
2. Zkontroluje objednávky, denní cíle a dostupné odměny.
3. Použije získané prostředky na rozvoj základny nebo získávání koček.
4. Upraví jeden ze svých balíčků o přesně 20 kočkách.
5. Odehraje jeden nebo několik krátkých PvP zápasů.
6. Získá hodnocení, odměny a postup hráče.
7. Před odchodem zadá výrobu nebo vylepšení základny.

Každá vedlejší aktivita musí podporovat návrat do PvP. Hráč musí mít možnost přejít do zápasu rychle a PvP nesmí být blokováno jediným časovačem, nedostatkem energie ani povinným seznamem úkonů.

**Možné slabiny:** Základna se může změnit v povinnou rutinu. Vyzvedávání a základní správa proto nesmí zabrat déle než několik desítek sekund.

---

## 2. Základna

Základna je domovská obrazovka, osobní prostor a centrum dlouhodobého postupu. Hráč rozvíjí budovy, vyrábí zdroje, plní objednávky a připravuje se na další PvP zápasy.

Základna má dvě hlavní vrstvy rozvoje:

- **Level hráče** vyjadřuje zkušenost účtu a odemyká širší obsah.
- **Level základny a budov** zlepšuje výrobu, kapacitu, pohodlí a možnosti přípravy.

Kočky nemají levely, zkušenosti ani zvyšování bojových statistik. Žádné vylepšení základny nesmí během hodnoceného zápasu přímo zvýšit sílu konkrétní kočky nad hodnotu uvedenou na její kartě.

Základnu lze navštěvovat, ale ostatní hráči ji přímo neničí ani nekradou její zásoby. PvP netrestá hráče za spánek nebo nepřítomnost.

**Možné slabiny:** Příliš mnoho budov vytvoří chaos. Každá budova musí mít jasnou vazbu na hlavní smyčku a nové úrovně nemají přidávat zbytečné klikání.

---

## 3. Budovy

### Velitelský strom

Centrum základny. Jeho úroveň odemyká další budovy, funkce, ligy a maximální úroveň ostatních staveb. Vylepšení představuje významný milník.

### Rybník

Produkuje rybky, základní měnu. Vyšší úroveň zvyšuje kapacitu a rychlost tak, aby hráč nemusel hru kontrolovat častěji.

### Kuchyně

Zpracovává suroviny pro objednávky a ekonomický rozvoj. Její produkty nesmí dočasně zvyšovat sílu koček v hodnoceném PvP.

### Dílna

Vyrábí materiály a předměty pro rozvoj základny, kosmetiku a další nebo pohodlnější přípravu. Nevyrábí bojové spotřební předměty, které by obcházely pravidla dvacetikaretního balíčku.

### Mlékárna

Produkuje mléko. Přiřazená sytá kočka je viditelná přímo u budovy a pracuje; hladová kočka výrobu zpomalí a velmi hladová sedí vedle budovy a čeká na kočičí svačinu.

### Objednávkové auto

Přijíždí na ostrov s objednávkou výrobků. Po splnění kočky naloží bedny, auto odjede a získané měny animovaně přiletí do horní lišty.

### Kočičí domek

Spravuje sbírku koček, oblíbené položky, kosmetické varianty a sestavené balíčky. Neslouží k levelování ani tréninku bojových statistik koček.

### Cvičiště

Umožňuje testovat balíčky bez změny hodnocení, učí pravidla ruky, dobírání, elementů a pasivek a nabízí řízené tréninkové situace.

### Tržiště

Nabízí rotující objednávky a transparentní výměny surovin. Nesmí být jedinou cestou k exkluzivní bojové síle.

### Expediční molo

Posílá kočky mimo aktivní balíčky na časově omezené výpravy. Odměňuje šíři sbírky, ale nesmí dlouhodobě zamknout kočku potřebnou pro PvP.

**Možné slabiny:** Pokud dvě budovy řeší stejný problém, mají se sloučit. Vylepšení mají zvyšovat možnosti a pohodlí, ne pouze prodlužovat časovače.

---

## 4. Výroba

Výroba má tři časové kategorie:

- krátká výroba pro aktivní sezení,
- střední výroba mezi zápasy,
- dlouhá výroba přes noc nebo pracovní den.

Hráč volí obsah omezených front. Vyšší úroveň budovy zvyšuje kapacitu, pohodlí a pestrost. Hotové výrobky zůstávají bezpečně uložené.

Výroba podporuje ekonomiku, získávání koček, kosmetiku a rozvoj základny. Nevytváří povinné dočasné bonusy síly do PvP a nebrání hráči odehrát zápas bez předchozí přípravy.

**Možné slabiny:** Čekání může působit jako umělá překážka. PvP proto zůstává kdykoliv dostupné bez spotřeby vyráběné energie nebo vstupenek.

---

## 5. Crafting

Crafting spojuje produkty různých budov do předmětů pro ekonomiku, kosmetiku a pohodlí. Recepty mají být jednoduché a čitelné.

Příklady kategorií:

- kosmetické úpravy základny,
- kosmetické doplňky koček a karet,
- materiály pro budovy,
- předměty pro objednávky,
- pohodlí výrobních front.

První závazné recepty:

- mléko → sýr,
- ryby → rybí sendvič,
- mléko + ryby → kočičí svačina.

Kočičí svačina se používá ke krmení pracovních koček. Hlad ovlivňuje pouze práci na základně, nikdy sílu karty v PvP.

Crafting nesmí přidávat další karty mimo balíček, měnit sílu kočky během hodnoceného zápasu ani vytvářet placenou či časově omezenou bojovou výhodu.

**Možné slabiny:** Pokud crafting nemá jasnou vazbu na hlavní smyčku, bude působit jako výplň. Jeho odměny proto musí být užitečné, ale nesmí narušovat férovost PvP.

---

## 6. Objednávky

Objednávky dávají výrobě krátkodobý směr. Hráč dostane několik nabídek a sám volí, které přijme. První objednávka požaduje 3 mléka, 2 ryby a 1 sýr. Odměňuje rybkami, XP hráče, PvP medailí a malou transparentně uvedenou šancí na diamant.

Nevhodnou objednávku lze po čekací době bezplatně vyměnit. Vzácné objednávky mohou požadovat širší kombinaci výrobků, ale nikdy placenou měnu.

**Možné slabiny:** Náhodné objednávky mohou blokovat postup. Hráč proto vždy musí mít více možností a ochranu proti opakovaně nevhodným požadavkům.

---

## 7. Ekonomika

Ekonomika má být pochopitelná bez kalkulačky. Každý zdroj má jasný účel:

- rybky pro běžný rozvoj a běžné balíčky,
- výrobní suroviny pro recepty a budovy,
- sbírkové materiály pro nenáhodné získávání koček,
- diamanty pro kosmetiku a omezené pohodlí,
- sezónní body pouze pro aktuální sezónu.

Hlavní odtoky rybek jsou vylepšení budov, běžné balíčky, crafting a objednávky. Ve hře nejsou tréninkové materiály ani měna pro zvyšování levelu koček.

**Možné slabiny:** Příliš mnoho měn znepřehlední rozhodování. Nový zdroj se přidá pouze tehdy, když vytváří skutečně nový druh volby.

---

## 8. Rybky

Rybky jsou hlavní běžná měna. Hráč je získává z rybníku, objednávek, PvP, denních aktivit a událostí.

Používají se na:

- vylepšení budov,
- běžné balíčky,
- crafting,
- změnu některých výrobních plánů,
- další běžné ekonomické aktivity.

Rybky se nepoužívají na zvyšování síly ani levelu koček. Hráč má garantovaný příjem i bez vítězné série; PvP však může být nejrychlejším zdrojem pro aktivního a úspěšného hráče.

---

## 9. Diamanty

Diamanty jsou prémiová měna získatelná placením i pravidelným hraním. Používají se hlavně na:

- kosmetické úpravy základny, koček a karet,
- profilové prvky,
- omezené pohodlí výrobních front,
- bezpečné zkrácení čekání,
- prémiovou větev battle passu.

Diamanty nesmí kupovat exkluzivní bojové schopnosti, vyšší sílu koček ani neomezenou výhodu v získávání soutěžně důležitých koček.

---

## 10. Kočky

Každá kočka je samostatná sběratelská a herní karta s těmito bojovými údaji:

- právě jeden element,
- síla v rozsahu 1 až 100,
- nejvýše jedna jednoduchá pasivní schopnost.

Kočka nemá level. Její síla se hraním, tréninkem, duplicitami ani vylepšením základny nezvyšuje. Stejná kočka má v hodnoceném PvP stejné bojové vlastnosti pro všechny hráče.

Pasivka musí být pochopitelná z krátkého textu, mít jednoznačný okamžik vyhodnocení a nesmí vytvářet dlouhé řetězce reakcí. Kočka bez pasivky může být relevantní díky elementu, síle a roli v křivce balíčku.

Nové kočky mají rozšiřovat možnosti deckbuildingu, ne automaticky nahrazovat starší karty vyššími čísly.

**Otevřené pravidlo:** Konkrétní seznam elementů, jejich vzájemné vztahy a přesné vyhodnocení síly budou stanoveny až při návrhu bojového prototypu.

---

## 11. Získávání koček

Kočky se získávají několika způsoby:

- startovní a příběhové odměny,
- balíčky,
- sezónní cesta,
- dlouhodobé skládání fragmentů nebo cílených žetonů,
- události,
- achievementy a expedice.

Každá herně významná kočka musí být časem dostupná bez placení. První získání odemkne kartu do sbírky a balíčků. Duplicity nesmí zvyšovat sílu ani level kočky; mohou se převést na sbírkový materiál nebo kosmetický postup.

Hra potřebuje garantované milníky, cílenou cestu k vybrané kočce a ochranu proti dlouhé smůle.

---

## 12. Balíčky odměn

Balíček odměn obsahuje kočku, fragmenty nebo doplňkové materiály. Tento pojem je odlišný od dvacetikaretního PvP balíčku. Uživatelské rozhraní musí oba významy jasně rozlišit, například názvy **odměnový balíček** a **bojový balíček**.

Před otevřením odměnový balíček vždy ukazuje přesné šance a pravidlo garantované odměny. Po určitém počtu otevření bez vysoké rarity se aktivuje viditelná ochrana proti smůle.

Balíčky nesmí používat falešné slevy, skryté šance ani tlak na rychlý nákup. Vždy musí existovat nenáhodná cesta ke klíčovým kočkám.

---

## 13. Rarity a shiny systém

Rarita vyjadřuje výjimečnost, sběratelskou hodnotu a případně neobvyklost jednoduché pasivky. Sama o sobě negarantuje vyšší sílu ani bojovou převahu.

Shiny kočka je vzácná kosmetická varianta existující kočky. Má odlišný vzhled, profilový záznam a kosmetické efekty, ale v PvP používá stejný element, sílu a pasivku jako běžná varianta.

Shiny lze získat náhodně, dlouhodobým mistrovstvím používání konkrétní kočky nebo během tematické události. Mistrovství je kosmetický a prestižní postup, nikoliv level kočky.

---

## 14. Bojový balíček

Hráč sestavuje bojový balíček ze své sbírky. Platí tato pevná pravidla:

1. Balíček obsahuje přesně 20 koček.
2. Každá karta v balíčku představuje kočku.
3. Před zápasem se pořadí balíčku náhodně zamíchá.
4. Editor balíčku musí jasně ukazovat počet 20/20, zastoupení elementů, rozložení síly a přítomné pasivky.

Každá kopie kočky v balíčku musí odpovídat skutečně vlastněné kopii ve sbírce. Jedna konkrétní karta se po zahrání přesune do odhazovací hromádky a v témže zápase se znovu neobjeví. Stejná identita kočky se může objevit vícekrát pouze tehdy, když hráč vlastní a do balíčku vložil více jejích kopií.

Hráč si může uložit více balíčků pro různé strategie. Doporučené balíčky a jednoduché filtry pomáhají novým hráčům, ale nikdy nebrání ruční tvorbě.

**Možné slabiny:** Pokud samotná vysoká síla vždy převáží synergii a práci s rukou, vznikne jediná optimální skladba. Síla, elementy a jednoduché pasivky proto musí vytvářet více životaschopných archetypů bez složitých pravidel.

---

## 15. PvP zápas

PvP je hlavní obsah hry. Zápas má být krátký, čitelný a vhodný pro mobilní ovládání jedním prstem.

Pevně stanovený průběh:

1. Oba hráči vstoupí do zápasu s platným balíčkem přesně 20 koček.
2. Každý balíček se samostatně zamíchá.
3. Každý hráč si náhodně lízne úvodní ruku pěti koček.
4. Hráč ve svém tahu vybere a zahraje jednu kočku z ruky.
5. Po zahrání si dolízne jednu kočku, pokud v jeho balíčku ještě nějaká zbývá.
6. Pokud je dobírací balíček prázdný, hráč už další kartu nelíže a pokračuje se zbývající rukou podle pravidel zápasu.

Hráč během zápasu pracuje pouze s kočkami ve svém bojovém balíčku. Neexistuje mana, samostatné karty kouzel, vybavení přidávané mimo balíček ani reakční řetězce typické pro komplexní karetní hry.

Jednoduché pasivky se vyhodnocují automaticky v jasně daném okamžiku. UI musí vždy ukázat, proč se síla nebo výsledek tahu změnily.

Náhodné dobírání vytváří variabilitu, ale rozhodnutí hráče musí zůstat významné. Úvodní ruka, další dobírání a pořadí karet nesmí předem určit většinu výsledků bez možnosti rozumné volby.

**Otevřená pravidla pro bojový prototyp:**

- způsob porovnání zahraných koček,
- význam a vztahy elementů,
- výsledek remízy síly,
- podmínka vítězství v kole a v celém zápasu,
- maximální počet kol nebo tahů,
- střídání a časování tahů,
- pravidlo pro situaci, kdy hráč nemůže zahrát kartu.

Tato pravidla musí být rozhodnuta a zapsána do této sekce a do `src/config.ts` před jejich implementací. Nesmí se převzít ze starší verze prototypu bez nového potvrzení.

---

## 16. Matchmaking

Matchmaking primárně zohledňuje hodnocení a zkušenost hráče. Level koček ani vylepšení jejich statistik neexistují, proto do párování nevstupují.

Systém může při ochraně nových hráčů zohlednit level hráče, velikost sbírky a dosavadní počet zápasů. Nesmí manipulovat pořadím karet, úvodní rukou ani výsledkem dobírání podle síly soupeře nebo nákupního chování.

V nižších ligách mohou pomoci féroví systémoví soupeři, jasně označení jako tréninkoví.

---

## 17. Postup hráče

Leveluje se hráč a základna, nikoliv kočky.

Level hráče může odemykat:

- nové funkce základny,
- další sloty pro uložené balíčky,
- herní režimy a ligy,
- pohodlnější správu sbírky,
- kosmetické a profilové odměny.

Level hráče nesmí přímo zvyšovat sílu karet v hodnoceném PvP. Zkušenosti se získávají především hraním PvP a doplňkově hlavními aktivitami základny.

---

## 18. Dlouhodobá motivace

Dlouhodobý postup stojí na souběžných cílech:

- rozšiřování sbírky koček,
- tvorba a ladění více PvP balíčků,
- level hráče a základny,
- hodnocení a liga v PvP,
- kosmetické mistrovství oblíbených koček,
- shiny varianty,
- sezónní kosmetické odměny,
- achievementy a sociální prestiž.

Hráč má vždy vidět blízký cíl na dnešek, střední cíl na tento týden a dlouhý cíl na sezónu. Milníky mají rozšiřovat možnosti a prezentaci, ne zvyšovat statistiky vlastněných koček.

---

## 19. Battle pass a sezóny

Battle pass postupuje především běžným hraním PvP. Bezplatná větev obsahuje měny, materiály, garantovaný sbírkový postup a kosmetiku. Prémiová větev obsahuje hlavně více kosmetiky, diamanty a omezené pohodlí.

Prémiová větev nesmí obsahovat exkluzivní kočky nebo pasivky, které nejsou dostupné hraním, ani vylepšení síly karet.

Sezóna přináší:

- částečný reset PvP hodnocení,
- tematické kosmetické odměny,
- sezónní výzvy,
- opatrnou změnu metagame,
- případně nový obsah sbírky s férovou nenáhodnou cestou.

Základní pravidla dvacetikaretního balíčku, pěti karet v úvodní ruce a dobírání po zahrání se nemají měnit každou sezónu.

---

## 20. Denní úkoly

Denní úkoly jsou krátká nabídka, ne povinný seznam. Hráč dostane více úkolů, než musí splnit, a sám si vybere.

Úkoly mohou podporovat hlavní smyčku:

- vyzvednout výrobu,
- dokončit objednávku,
- odehrát PvP zápas,
- zahrát několik koček určitého elementu,
- upravit nebo vyzkoušet bojový balíček,
- zahájit dlouhou výrobu.

Úkoly nemají vyžadovat konkrétní vzácnou kočku, vítěznou sérii ani neoptimální tahy v hodnoceném PvP.

---

## 21. Jak zabránit pay-to-win

Základní pravidla:

- všechny bojové kočky a pasivky jsou dostupné hraním,
- kočky nemají levely ani placená zvýšení síly,
- shiny a jiné varianty jsou kosmetické,
- duplicity neposkytují vyšší bojové statistiky,
- placené předměty nemají exkluzivní bojový účinek,
- matchmaking nemanipuluje dobírání ani pořadí balíčku,
- nové kočky nejsou záměrně přehnaně silné,
- šance a ceny odměnových balíčků jsou vždy viditelné,
- existuje nenáhodná cesta k herně významným kočkám.

Monetizace stojí na kosmetice, battle passu a omezeném pohodlí. Je nutné sledovat výsledky platících a neplatících hráčů ve stejných ligách a dostupnost klíčových karet.

---

## 22. První den hráče

První den musí během několika minut představit hlavní karetní PvP smyčku:

1. Hráč získá připravenou startovní sbírku dostatečnou pro první balíček.
2. V krátkém tutorialu pozná balíček 20 koček, zamíchání a úvodní ruku pěti karet.
3. Zahraje kočku, sleduje vyhodnocení elementu, síly a případné jednoduché pasivky a dolízne další kartu.
4. Dokončí první tréninkový zápas.
5. Upraví několik karet ve vlastním bojovém balíčku.
6. Odehraje první bezpečný PvP zápas.
7. Otevře garantovaný úvodní odměnový balíček s viditelnými šancemi.
8. Pozná základnu, opraví rybník a zahájí první výrobu nebo vylepšení.

Pořadí je záměrné: nejdříve musí hráč pochopit a zažít hlavní PvP, teprve potom se rozšiřuje základna.

---

## 23. Hráč po měsíci

Po měsíci má hráč:

- širší sbírku koček bez nutnosti levelovat jednotlivé karty,
- několik životaschopných dvacetikaretních balíčků,
- zkušenost s prací s úvodní rukou a náhodným dobíráním,
- rozvinutou základnu se zvolenou specializací,
- jasnou ligovou ambici,
- rozpracovanou sezónní cestu,
- důvod reagovat deckbuildingem na aktuální metagame.

Jeho hlavní otázka už není „co mám zmáčknout“, ale „kterých 20 koček mi dá spolehlivý plán i při různém pořadí dobírání“.

---

## 24. Hráč po roce

Po roce má hráč:

- výrazně personalizovanou základnu,
- širokou sbírku a prestižní shiny varianty,
- několik oblíbených balíčkových archetypů,
- kosmetické mistrovství oblíbených koček,
- historii sezónních výsledků,
- sociální identitu v klanu nebo komunitě,
- dlouhodobé kosmetické a achievementové cíle.

Veteránský obsah tvoří vysoce kompetitivní ligy, turnaje, klanové cíle a opatrné sezónní změny mety. Starší kočky zůstávají relevantní díky elementům, síle, jednoduchým pasivkám a kombinacím, nikoliv nekonečnému růstu statistik.

---

## Co odstranit nebo nepřenášet ze starších návrhů

1. Aktivní souboj kočičích jednotek v prostorové aréně jako hlavní PvP systém.
2. Ovládání pohybu, nasazování jednotek na mapu a boj o prostorové objektivy.
3. Levely, zkušenosti, trénink a zvyšování síly jednotlivých koček.
4. Dočasné jídlo, vybavení nebo spotřební předměty zvyšující bojovou sílu v hodnoceném PvP.
5. Karty kouzel, samostatné podpůrné karty, mana a složité reakční řetězce.
6. Dlouhé texty schopností a více aktivních či pasivních schopností na jedné kočce.
7. Shiny schopnosti nebo jiné kosmetické varianty poskytující bojovou výhodu.
8. Základnu jako statickou nabídku několika tlačítek nebo jako aktivitu bez vazby na PvP.
9. Výrobu rybek jako jedinou smysluplnou aktivitu základny.
10. Duel proti náhodně sestavenému počítačovému balíčku jako hlavní náhradu skutečného PvP.
11. Staré neověřené podmínky vítězství, pravidla elementů a remíz, dokud nebudou znovu výslovně potvrzeny.
12. Jakoukoliv ekonomiku, která umožní zaplatit za vyšší sílu stejné kočky.

## První otázka pro nový prototyp

Nejdříve je nutné ověřit jedinou věc: **Je krátký souboj s dvacetikaretním balíčkem, náhodnou rukou pěti koček a jednou zahranou kočkou na tah zábavný díky rozhodování mezi elementem, silou a jednoduchou pasivkou?**

První bojový prototyp má ověřit právě tuto smyčku bez ekonomiky, čekání, odměnových balíčků a dlouhodobého postupu. Teprve po potvrzení základního souboje se na něj mají bezpečně napojovat další systémy základny.
