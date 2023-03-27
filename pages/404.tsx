import HomePageNavigation from "@/components/HomePageNavigation";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";

export default function NotFoundPage() {
  return (
    <Layout title="Russo Trip | Страница не найдена">
      <HomePageNavigation />
      <PageTitle>Страница не найдена</PageTitle>
      <div className="text-center my-40">
        <h2 className="text-8xl mb-2">404</h2>
        <span className="underline">
          К сожалению, запрашиваемая вами страница не найдена...
        </span>
      </div>
    </Layout>
  );
}
