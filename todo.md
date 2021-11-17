# Profesio

## Todo

### Front-end

-styly jsou řešeny knihovnou [styled-components](https://styled-components.com/)

-file system (pro FE mohou nastat nepatrné změny)

-změna pozadí na tmavou a světlou (hotovo)

-Favicon

-dodelat env proměnné

-dodelat komponenty v theme.js, popřípadě přidat kdyby byly potřeba (hotovo, jen se budou přidávat nové pokud bude potřeba)

-   hlavní komponenty, které se budou vyskytovat na většině stránkách:
-   Navbar.jsx (hotovo)
-   ListOfPeople.jsx - zobrazení dat z daného endpointu databáze + vyhledávání hotovo, jen se změní endpoint)
-   Header.jsx (hotovo)

Hlavní stránka: dodělat přihlášení -> podle toho jak se uživatel přihlásí bude mít k tomu příslušný přístup

Stránky:

-   settings (hotovo, ceka se na DB)
    -   změna hesla
    -   informace o uživateli
-   administrator: (hotovo, ceka se na DB)

    -   /schoolSettings
        -   na této stránce administrátor zvolí:
            -   jak dlouho od začátku školního roku si může student upravovat rozvrh
            -   informace o škole
            -   obory
            -   a další informace, o kterých ještě nevíme :D
    -   /AddingPeople.jsx
        -   admin bude mít možnost si nechat vygenerovat uživately ve stylu userStudentXXXXXX (userTeacherXXXXXX) a k nim hesla
        -   přidávání lidí, studentů/pedagogů/administrátorů/pracovnící školy (hotovo)
        -   ke studentům přidat co studují za obor
        -   výskyt komponenty ListOfPeople.jsx
        -   data se budou odesílat do databáze z formuláře, který není zatím funkční a je jen pro vzhled
    -   /ChangingPeople.jsx
        -   seznam s uživateli, může změnit údaje v databázi
    -   /DeletingPeople.jsx
        -   seznam s uživateli, mazání s databáze
    -   /AddingRoom.jsx
        -   administrátor si přidá fakultu/budovu a následně do ní místnosti (\*číslo/nazev, °patro) kde se bude vyučovat => nastaví předmět a čas v prázdněm rozvrhu a uloží
    -   /ChangingRoom.jsx
        -   administrátor si vybere fakultu/budovu (bude moci upravit její parametry) -> místnost, zobrazí se mu rozvrh a bude moci měnit čas a předmět
    -   /DeletingRoom.jsx
        -   administrátor si vybere fakultu/budovu a může odstranit místnosti popř. danou fakultu/budovu v seznamu fakult/budov
    -   /index.jsx
        -   hlavní stránka s NavBar.jsx, Header.jsx a logem aplikace

-   student:

    -   /Timetable.jsx
        -   rozvrh, který si vytvořil
    -   /TimetableCreate.jsx
        -   zde si může vytvořit rozvrh do daného data určené školou
        -   předměty se mu budou zobrazovat z nabídky
        -   možnost si nechat vygenerovat rozvrh
    -   /TimetableChange.jsx
        -   může si upravit rozvrh do daného data určené školou
    -   /index.js
        -   hlavní stránka s NavBar.jsx, Header.jsx a logem aplikace

-   teacher
    -   /Timetable.jsx
        -   rozvrh, který je vytvořen
    -   TimetableChange.jsx
        -   může měnit rozvrh -> zrušení výuky + může uvést důvody ----> studentovi se rozvrh aktualizuje a dostane tyto informace
    -   index.js (hotovo)
        -   hlavní stránka s NavBar.jsx, Header.jsx a logem aplikace


- ikona nastaveni se bude muset dat dolu 
### Backend

| Databázový systém | ORM               | Produkce |
| ----------------- | ----------------- | -------- |
| PostgreSQL        | Sequelize/TypeORM | Docker   |

-   Všechny API endpointy jsou v `/pages/api`
-   Bohužel knihovna `next-auth` ne moc dobře podporuje Credentials login,
    takže bude muset být napsán od nuly
-   Kvůli tomu že se používá api routes od Next.js tak bude potřeba server, pro jednodušší využití bude vytvořen Dockerfile
-   Kdokoliv kdo si bude chtít spustit tuto webovou aplikaci bude muset mít docker nebo node
