import { capitalizeText } from "@/helpers";
import Link from "next/link";

interface Props {
  city: string;
  href: string;
  isActive: boolean;
}

export default function CityNavigationItem({
  city,
  href,
  isActive = false,
}: Props) {
  const formattedCity = capitalizeText(city, true);

  return (
    <li className="hover:text-slate-600 active:text-primary-color-alt">
      <Link
        className={`inline-block px-4 py-2 bg-secondary-color m-1 lg:p-0 lg:m-0 lg:mb-1 ${
          isActive ? "underline" : ""
        }`}
        href={href}
      >
        {formattedCity}
      </Link>
    </li>
  );
}
