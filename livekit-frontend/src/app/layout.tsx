"use client";
import React, {useState, useEffect, useMemo} from "react";
import { usePathname } from 'next/navigation';
import routes from "@/layouts/helpers/routes";
import Navbar from '@/layouts/components/Navbar';
import config from "@/config/config.json";
import theme from "@/config/theme.json";
import TwSizeIndicator from "@/layouts/helpers/TwSizeIndicator";
import Footer from "@/layouts/partials/Footer";
import Header from "@/layouts/partials/Header";
import Providers from "@/layouts/partials/Providers";
import {
  getActiveNavbar,
  getActiveRoute,
} from '@/lib/navigation';
import "@/styles/main.scss";
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;

  const renderNavbar = () => {
    switch (true) {
      case pathname === '/dashboard':
        return (
          <Navbar
            onOpenSidenav={() => setOpen(!open)}
            brandText={getActiveRoute(routes, pathname)}
            secondary={getActiveNavbar(routes, pathname)}
          />
        );
      case pathname.startsWith('/room'):
        return null;
      case pathname.startsWith('/preview'):
        return null;
      default:
        return <Header />;
    }
  };

  const renderFooter = () => {
    switch (true) {
      case pathname !== '/':
        return null;
      case pathname.startsWith('/room'):
        return null;
      case pathname.startsWith('/preview'):
        return null;
      default:
        return <Footer />;
    }
  };

  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* favicon */}
        <link rel="shortcut icon" href={config.site.favicon} />
        {/* theme meta */}
        <meta name="theme-name" content="nextplate" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />

        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? "&family=" + sf : ""
          }&display=swap`}
          rel="stylesheet"
        />
      </head>

      <body suppressHydrationWarning={true}>
        <TwSizeIndicator />
        <Providers>
          {renderNavbar()}
          <main>{children}</main>
            {renderFooter()}
        </Providers>
      </body>
    </html>
  );
}
