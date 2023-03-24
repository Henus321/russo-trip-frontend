import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="flex flex-col text-5xl border-b-4 p-5 mb-5 font-bold">
      {children}
    </h1>
  );
}
