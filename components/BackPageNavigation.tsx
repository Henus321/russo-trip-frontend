import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";

export default function BackPageNavigation() {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return (
    <button className="flex items-center underline" onClick={() => onClick()}>
      <FaArrowLeft className="mr-2" /> Назад
    </button>
  );
}
