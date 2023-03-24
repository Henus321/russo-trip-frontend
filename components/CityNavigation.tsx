import { capitalizeFirstLetter } from "@/helpers";
import Link from "next/link";
import React from "react";

interface Props {
  cities: string[];
}

export default function CityNavigation({ cities }: Props) {
  return (
    <div className="w-full py-6 px-10 text-xl bg-slate-100 shadow-md">
      <h2 className="text-2xl font-bold mb-2 underline">Поиск по городам</h2>
      <ul className="flex flex-col ">
        <li className="mb-1 hover:text-slate-600 active:text-slate-900">
          <Link href="/blog">Все города</Link>
        </li>
        {cities.map((city) => (
          <li
            className="mb-1 hover:text-slate-600 active:text-slate-900"
            key={city}
          >
            <Link href={`/blog/city/${city.toLowerCase()}`}>
              {capitalizeFirstLetter(city)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
