import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="flex flex-col text-4xl text-center border-b-4 p-3 mb-3 font-bold md:mb-5 md:p-5 md:text-5xl md:text-start">
      {children}
    </h1>
  );
}
