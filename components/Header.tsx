import Link from "next/link";
import { observer } from "mobx-react-lite";
import { FaMountain } from "react-icons/fa";
import { useStores } from "@/store";

import Search from "./Search";

function Header() {
  const { authStore } = useStores();
  const { user } = authStore;

  return (
    <header className="bg-primary-color text-white shadow w-full">
      <div className="container mx-auto flex flex-row p-5 items-center justify-between">
        <div className="flex items-center">
          <Link className="flex items-center mr-8" href="/">
            <h2 className="text-4xl">RT</h2>
            <FaMountain className="text-3xl" />
          </Link>
          <nav>
            <ul className="flex flex-row space-x-8">
              <li>
                <Link href="/blog">Экскурсии</Link>
              </li>
              <li>
                <Link href="/about">О нас</Link>
              </li>
              {user ? (
                <li>
                  <Link href="/account/profile">Профиль</Link>
                </li>
              ) : (
                <li>
                  <Link href="/account/login">Вход</Link>
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
