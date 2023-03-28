import Link from "next/link";
import { observer } from "mobx-react-lite";
import { useStores } from "@/store";

import Search from "./Search";

function Header() {
  const { authStore } = useStores();
  const { user } = authStore;

  return (
    <header className="bg-primary-color text-white shadow w-full">
      <div className="container mx-auto flex flex-col p-3 items-center justify-between lg:flex-row sm:p-5">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <Link className="flex items-center mr-0 sm:mr-8" href="/">
            <h2 className="mb-2 text-4xl font-robotoSlab tracking-wide whitespace-nowrap hover:text-secondary-color-alt sm:mb-1">
              Russo Trip
            </h2>
          </Link>
          <nav>
            <ul className="flex flex-row space-x-8">
              <li>
                <Link className="hover:text-secondary-color-alt" href="/blog">
                  Экскурсии
                </Link>
              </li>
              <li>
                <Link className="hover:text-secondary-color-alt" href="/about">
                  О нас
                </Link>
              </li>
              {user ? (
                <li>
                  <Link
                    className="hover:text-secondary-color-alt"
                    href="/account/profile"
                  >
                    Профиль
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className="hover:text-secondary-color-alt"
                    href="/account/login"
                  >
                    Вход
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <Search />
      </div>
    </header>
  );
}

export default observer(Header);
