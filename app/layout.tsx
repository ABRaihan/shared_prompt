import { Navbar, Provider } from "@components";
import "@styles/globals.css";
import { Session } from "next-auth";
import { AppProps } from "next/app";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

type RootLayoutProps = {
  children: React.ReactNode;
  session: Session;
} & AppProps;

const RootLayout = ({ children, session }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};
export default RootLayout;
