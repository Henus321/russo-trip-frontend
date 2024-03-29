import { useRouter } from "next/router";
import CityNavigationItem from "./CityNavigationItem";

interface Props {
  cities: string[];
}

export default function CityNavigation({ cities }: Props) {
  const router = useRouter();

  const curCity = router.query && router.query.city ? router.query.city : null;

  const isActive = (city?: string) => {
    if (!city && !curCity && cities.length !== 0) return true;
    return curCity === city;
  };

  return (
    <div className="w-full px-4 text-center bg-white whitespace-nowrap lg:text-start lg:whitespace-normal lg:px-10 lg:py-6 lg:shadow-md lg:bg-secondary-color">
      <h2 className="text-2xl font-bold mb-1 underline sm:mb-2">
        Поиск по городам
      </h2>
      <ul className="flex flex-row flex-wrap justify-center text-sm md:text-xl lg:flex-col">
        <CityNavigationItem city="Все" href="/blog" isActive={isActive()} />
        {cities.map((city) => (
          <CityNavigationItem
            key={city}
            city={city}
            href={`/blog?city=${city.toLowerCase()}`}
            isActive={isActive(city)}
          />
        ))}
      </ul>
    </div>
  );
}
