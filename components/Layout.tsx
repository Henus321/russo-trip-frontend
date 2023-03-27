import { DEFAULT_KEYWORDS } from "@/constants";
import Head from "next/head";

import Header from "./Header";
import Footer from "./Footer";

interface Props {
  title: string;
  keywords: string;
  description: string;
  children: React.ReactNode;
}

export default function Layout({
  title,
  keywords,
  description,
  children,
}: Props) {
  return (
    <div className="flex flex-col min-h-screen text-primary-color-alt font-roboto">
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto mt-7 mb-10">{children}</main>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Russo Trip",
  description: "Блог о путешествиях по России",
  keywords: DEFAULT_KEYWORDS,
};
