import type { Metadata } from "next";
import Header from '../components/Header'
import Footer from '../components/Footer'
import "../styles/global.css";

export const metadata: Metadata = {
  title: "Ruth Abebe | Personal Website",
  description: "The portfolio of Ruth Abebe, built with Next.js.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          {/* Main content area, which will be filled by the page.tsx files */}
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
