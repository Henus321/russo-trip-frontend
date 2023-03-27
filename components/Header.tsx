import Link from "next/link";
import { observer } from "mobx-react-lite";
import { useStores } from "@/store";

import Search from "./Search";

function Header() {
  const { authStore } = useStores();
  const { user } = authStore;

  return (
    <header className="bg-primary-color text-white shadow w-full">
      <div className="container mx-auto flex flex-row p-5 items-center justify-between">
        <div className="flex items-center justify-between">
          <Link className="flex items-center mr-8" href="/">
            <h2 className="mb-1 text-4xl font-robotoSlab tracking-wide whitespace-nowrap hover:text-secondary-color-alt">
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
