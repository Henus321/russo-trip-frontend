import Image from "next/image";
import spinner from "../assets/spinner.png";

interface Props {
  className?: string;
}

export default function Spinner({ className = "" }: Props) {
  return (
    <Image
      className={`animate-spin ${className}`}
      src={spinner}
      alt="Loading..."
      width={100}
      height={100}
      priority
    />
  );
}
