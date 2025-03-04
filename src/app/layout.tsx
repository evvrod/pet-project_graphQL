import { ReactNode } from 'react';

import { Rubik } from 'next/font/google';

import './globals.css';

const rubik = Rubik({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-rubik',
  display: 'swap',
});

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={rubik.variable}>
      <head>
        <title>Graphql client</title>
        <meta
          name="description"
          content="A web application for executing GraphQL queries. It allows you to set the server URL, write queries, add headers and variables to test and debug the API"
        />
        <link rel="icon" type="image/svg+xml" href="icon.svg"></link>
        <link rel="shortcut icon" href="favicon.ico"></link>
      </head>
      <body>{children}</body>
    </html>
  );
}
