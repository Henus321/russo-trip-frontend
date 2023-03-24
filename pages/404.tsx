import HomePageNavigation from "@/components/HomePageNavigation";
import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <Layout title="Page Not Found">
      <HomePageNavigation />
      <PageTitle>Страница не найдена</PageTitle>
      <div className="text-center my-20">
        <h2 className="text-8xl ">404</h2>
        <span className="text-2xl">Ошибка!</span>
        <br />
        <span>К сожалению, запрашиваемая вами страница не найдена...</span>
      </div>
    </Layout>
  );
}
