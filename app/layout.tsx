import { Metadata } from "next";
import "./styles/global.css";
import Header from "./components/\bHeader/Header";
export const metadata: Metadata = {
  title: {
    template: "%s | joflix",
    default: "joflix",
  },
  description: "Cloncoding Netflix",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Header />
        {children}
      </body>
    </html>
  );
}
