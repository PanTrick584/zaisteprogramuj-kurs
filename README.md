This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

##### QUESTS

## PAGINATION FOR SSG & SSR

paginacja może być częściowo generowna w SSG, żeby użytkownik miał wrażenie szybkiego działania aplikacji gdy wchodzi w produkty najbardziej popularne
natomiat reszta może być doczytywana przez SSR na bieżąco, gdzy może tracimy trochę na samym performansie ale ogólne wrażenie jest dobre. SSG głownie do produktów mniej popularnych, żadziej wyszukiwanych

##### MY README

#### ENVIROMENT INSTALL

## SETUP NEXT.JS WITH TYPESCRIPT

yarn create-next-app --typescript

## ENTER APP

yarn dev

## tsconfig

strict: true

## TAILWINDCSS

yarn add --dev tailwindcss postcss autoprefixer

## TAILWIND CONFIG FILES

yarn tailwind init -p

## tailwind.config.js

module.exports = {
content: [
"./pages/**/*.{ts,tsx}",
"./components/**/*.{ts,tsx}"
],
theme: {
extend: {},
},
plugins: [],
}

// remember! no spacebar in {ts,tsx}, won't work

## global.css

styles/global.css

insert:
@tailwind base;
@tailwind components;
@tailwind utilities;

in \_app.tsx:
import '../styles/globals.css'

## fakestoreapi.com

https://fakestoreapi.com/

## NEXT-SEO

yarn add next-seo

## MDX REMOTE

yarn add next-mdx-remote

## SSG

Static/Server Side Generating:

sposób budowania strony, gdzie cały kontent jest tworzony w momencie buildowania strony
zapytania do API również wykonywane są podczas budowania i na serwer trafia gotowa, wyrenderowania strona
która pozostaje już taka sama

## SSR

Server Side Rendering:

przy każdym zapytaniu użytkownika o podany adres serwer buduje stronę
internetową, wysyła potrzebne zapytania i tak stworzoną na bieżąco stronę wysyła do uzytkownika

## ISR

Incremental Static Regenetation

tworzy gotową stronę jak w przypadku SSG, lecz co jakiś czas wywołuje zapytanie czy dane do wyświetlenia się nie zmieniły

## CSR

Client Side Rendering:

użytkowik wysyła zapytanie i dostaje odpowiedź w postaci niemal pustego pliku html i pliku JS
który dopiero w przeglądarce buduje stronę i wysyła potrzebne żądania zewnętrzne (do innych serwisów czy bazy danych)

## CSR API FETCH

yarn add react-query

biblioteka dodająca hook do requestów do API
trzeba pamiętać o providerze na całej apce takim jak np do reduxa

## APOLLO FOR GRAPHQL

yarn add @apollo/client graphql

## GRAPHQL TYPE PACKAGE FOR TYPESCRIPT

yarn add --dev @graphql-codegen/cli

yarn graphql-codegen init

## REACT-HOOK-FORM

npm install react-hook-form

## YUP FORM VALIDATION
