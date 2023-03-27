import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";

export default function HomePageNavigation() {
  const router = useRouter();

  const onClick = () => {
    router.push("/");
  };

  return (
    <button className="flex items-center underline" onClick={() => onClick()}>
      <FaArrowLeft className="mr-2" /> На главную
    </button>
  );
}
