import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";

interface Props {
  home?: boolean;
}

export default function BackPageNavigation({ home = false }: Props) {
  const title = home ? "На главную" : "Назад";

  const router = useRouter();

  const onClick = (isHome: boolean) =>
    isHome ? router.push("/") : router.back();

  return (
    <button
      className="flex items-center underline mt-6 ml-4 sm:mt-0 sm:ml-0"
      onClick={() => onClick(home)}
    >
      <FaArrowLeft className="mr-2" /> {title}
    </button>
  );
}
