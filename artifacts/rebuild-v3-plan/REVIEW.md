# Rebuild v3 – kontrola návrhu

- Aréna je největší objekt a první vizuální čtení; balíčkový dům je jasně druhý.
- Produkční objekty mají samostatné zóny a cesty, indikátory mají vlastní volný prostor.
- V klidovém stavu je pouze jeden indikátor. Priority se řeší výběrem jediného stavu na objekt, ne dynamickým posouváním.
- Rybník se před otevřením sheetu dostane nad jeho horní hranu posunem Phaser kamery. World souřadnice rybníku se nemění.
- Hit areas leží uvnitř vizuálních siluet a vzájemně se nepřekrývají.
- HUD a navigace používají jeden surface, jednu rodinu radiusů a 8px grid.
- Tři kočičí trasy vedou po cestách a neprotínají hit areas budov.

Rozhodnutí: návrh splňuje podmínky pro zahájení implementace vertical slice.
