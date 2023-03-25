import Image from "next/image";
import spinner from "../assets/spinner.png";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen z-10 bg-slate-900/40">
      <Image
        className="animate-spin"
        src={spinner}
        alt="Loading..."
        width={100}
        height={100}
        priority
      />
    </div>
  );
}
