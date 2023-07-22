import "@evan/tokens/css/text.css";
import "@evan/tokens/css/theme.css";
import "@evan/tokens/css/lightTheme.css";
import "@evan/ui/css/tailwind.css";
import "@evan/ui/css/global.css";
// import localFont from "next/font/local";

// import { Inter } from "next/font/google";
import { Sidebar } from "./components/Sidebar/Sidebar";

// const fakeReceipt = localFont({
//   src: "./FakeReceipt-Regular.woff2",
//   display: "swap",
//   variable: "--font-fake-receipt",
// });

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-inter",
// });

export const metadata = {
  title: "fff Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setInitialTheme = `
    function getUserPreference() {
      return window?.localStorage.getItem("es_theme") ?? "dark";
    }
    document.documentElement.classList.add(getUserPreference())
    setTimeout(() => document.documentElement.classList.add('theme-transition'), 1000)
  `;
  return (
    <>
      <head>
        <noscript suppressHydrationWarning>
          <style>
            {`.no-script {
                  opacity: 1 !important;
                }
              `}
          </style>
        </noscript>
        <link
          rel="preload"
          href="./FakeReceipt-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* suppressHydrationWarning b/c the script adds a `class` attr and i get a warning i dont care about */}
      <html lang="en" className="" suppressHydrationWarning>
        <body className={`flex`}>
          <script async dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
          <Sidebar />
          {children}
        </body>
      </html>
    </>
  );
}
