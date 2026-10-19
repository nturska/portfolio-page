import type { TimelineEntry } from "./types";

export const timelineEntries: TimelineEntry[] = [
  {
    id: "ug",
    date: "2020",
    title: "Rozpoczęcie studiów",
    place: "Uniwersytet Gdański",
    description: "Kierunek: Informatyka Praktyczna",
    kind: "education",
  },
  {
    id: "first-project",
    date: "2021",
    title: "Pierwszy projekt w React",
    description:
      "Pierwsza samodzielna aplikacja webowa: komponenty, hooki, zarządzanie stanem w Redux i praca z zewnętrznym API.",
    kind: "project",
  },
  {
    id: "internship",
    date: "2022",
    title: "Rozpoczęcie stażu",
    place: "Grid Dynamics",
    description:
      "Praca w zespole nad frontendem w React, Angular i Vue.js, code review, testowanie, refaktoryzacja kodu, i wdrożenie w środowisko SCRUM.",
    kind: "work",
  },
  {
    id: "poczatek-pracy",
    date: "2023",
    title: "Klient: Platforma e-commerce",
    place: "Grid Dynamics",
    description:
      "Praca nad aplikacją webową dla firmy z e-commerce w Ember.js. Migracja bazy kodu do TypeScript",
    kind: "work",
  },
  {
    id: "kolejny-klient",
    date: "2023",
    title: "Klient: Platforma analityczna",
    place: "Grid Dynamics",
    description:
      "Aplikacja internetowa do analizy danych dla klienta z USA, łącząca dane z różnych źródeł i prezentująca je w sposób przystępny dla użytkownika.",
    kind: "work",
  },
  {
    id: "ug-koniec",
    date: "2024",
    title: "Obrona pracy linencjackiej",
    place: "Uniwersytet Gdański",
    description:
      "Projekt platformy mobilnej i internetowej oferującej usługi związane z opieką nad zwierzętami, wykorzystujących technologię beaconów do śledzenia w czasie rzeczywistym.",
    kind: "education",
  },
  {
    id: "pw",
    date: "2024",
    title: "Rozpoczęcie studiów magisterskich",
    place: "Politechnika Warszawska",
    description:
      "Kierunek: Informatyka Stosowana.\nSpecjalizacja: Informatyka w biznesie",
    kind: "education",
  },
  {
    id: "pw-end",
    date: "2026",
    title: "Praca magisterska",
    place: "Politechnika Warszawska",
    description:
      "Projekt systemu śledzenia wielu obiektów za pomocą wielu kamer w czasie rzeczywistym z integracją mapy przestrzennej.",
    kind: "education",
  },
];
