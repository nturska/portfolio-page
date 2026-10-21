import type { TimelineEntry } from "./types";

export const timelineEntries: TimelineEntry[] = [
  {
    id: "ug",
    date: "2020",
    title: { pl: "Rozpoczęcie studiów", en: "Started university" },
    place: { pl: "Uniwersytet Gdański", en: "University of Gdańsk" },
    description: {
      pl: "Kierunek: Informatyka Praktyczna",
      en: "Field of study: Practical Computer Science",
    },
    kind: "education",
  },
  {
    id: "first-project",
    date: "2021",
    title: { pl: "Pierwszy projekt w React", en: "First React project" },
    description: {
      pl: "Pierwsza samodzielna aplikacja webowa: komponenty, hooki, zarządzanie stanem w Redux i praca z zewnętrznym API.",
      en: "First solo web app: components, hooks, Redux state management and working with an external API.",
    },
    kind: "project",
  },
  {
    id: "internship",
    date: "2022",
    title: { pl: "Rozpoczęcie stażu", en: "Started internship" },
    place: { pl: "Grid Dynamics", en: "Grid Dynamics" },
    description: {
      pl: "Praca w zespole nad frontendem w React, Angular i Vue.js, code review, testowanie, refaktoryzacja kodu, i wdrożenie w środowisko SCRUM.",
      en: "Frontend work in React, Angular and Vue.js: code review, testing, refactoring, and working in a Scrum environment.",
    },
    kind: "work",
  },
  {
    id: "poczatek-pracy",
    date: "2023",
    title: {
      pl: "Klient: Platforma e-commerce",
      en: "Client: e-commerce platform",
    },
    place: { pl: "Grid Dynamics", en: "Grid Dynamics" },
    description: {
      pl: "Praca nad aplikacją webową dla firmy z e-commerce w Ember.js. Migracja bazy kodu do TypeScript",
      en: "Work on an Ember.js web app for an e-commerce company. Migrated the codebase to TypeScript.",
    },
    kind: "work",
  },
  {
    id: "kolejny-klient",
    date: "2023",
    title: {
      pl: "Klient: Platforma analityczna",
      en: "Client: analytics platform",
    },
    place: { pl: "Grid Dynamics", en: "Grid Dynamics" },
    description: {
      pl: "Aplikacja internetowa do analizy danych dla klienta z USA, łącząca dane z różnych źródeł i prezentująca je w sposób przystępny dla użytkownika.",
      en: "A data analysis web app for a US client, combining data from multiple sources and presenting it in a user-friendly way.",
    },
    kind: "work",
  },
  {
    id: "ug-koniec",
    date: "2024",
    title: {
      pl: "Obrona pracy linencjackiej",
      en: "Bachelor's thesis defence",
    },
    place: { pl: "Uniwersytet Gdański", en: "University of Gdańsk" },
    description: {
      pl: "Projekt platformy mobilnej i internetowej oferującej usługi związane z opieką nad zwierzętami, wykorzystujących technologię beaconów do śledzenia w czasie rzeczywistym.",
      en: "A mobile and web platform for pet-care services, using beacon technology for real-time tracking.",
    },
    kind: "education",
  },
  {
    id: "pw",
    date: "2024",
    title: {
      pl: "Rozpoczęcie studiów magisterskich",
      en: "Started master's studies",
    },
    place: { pl: "Politechnika Warszawska", en: "Warsaw University of Technology" },
    description: {
      pl: "Kierunek: Informatyka Stosowana.\nSpecjalizacja: Informatyka w biznesie",
      en: "Field of study: Applied Computer Science.\nSpecialisation: IT in business",
    },
    kind: "education",
  },
  {
    id: "pw-end",
    date: "2026",
    title: { pl: "Praca magisterska", en: "Master's thesis" },
    place: { pl: "Politechnika Warszawska", en: "Warsaw University of Technology" },
    description: {
      pl: "Projekt systemu śledzenia wielu obiektów za pomocą wielu kamer w czasie rzeczywistym z integracją mapy przestrzennej.",
      en: "A real-time multi-object tracking system using multiple cameras, integrated with a spatial map.",
    },
    kind: "education",
  },
];
