import Spinner from "./Spinner";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen z-10 bg-slate-900/40">
      <Spinner />
    </div>
  );
}
