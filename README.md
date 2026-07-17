# MeowVerse

Mobilní sběratelská PWA optimalizovaná pro iPhone. Hráč spravuje kočičí ostrov, sbírá kočky, sestavuje balíček 20 karet a bojuje v elementárních duelech proti počítači.

## Lokální spuštění

```powershell
npm.cmd run dev
```

Vite vypíše lokální adresu, obvykle `http://localhost:5173`.

## Testy

```powershell
npm.cmd test
npm.cmd run check
npm.cmd run build
```

## Struktura

- `src/data` – katalog koček,
- `src/core` – ekonomika, ukládání, balíček a duel,
- `src/config.ts` – centrální herní hodnoty,
- `test` – automatické testy,
- `public/legacy` – původní technický prototyp dostupný jako easter egg,
- `GAME_DESIGN.md` – zdroj pravdy pro herní pravidla.

## Nasazení

```powershell
vercel.cmd --prod --yes
```

Tajné údaje patří pouze do bezpečného úložiště poskytovatele, nikdy do repozitáře.
