import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import Search from "./Search";

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
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Search />
      <main className="container mx-auto my-7">{children}</main>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Russo Trip",
  description: "Travel blog about Russia",
  keywords: "travel, blog, russia, trip",
};
