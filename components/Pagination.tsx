import { useRouter } from "next/router";

interface Props {
  currentPage: number;
  numberOfPages: number;
  path: string;
  className?: string;
}

export default function Pagination({
  currentPage,
  numberOfPages,
  path,
  className = "",
}: Props) {
  const isPageFirst = currentPage === 1;
  const isPageLast = currentPage === numberOfPages;

  const router = useRouter();

  const onPageClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    link: string
  ) => {
    const firstPage = e.currentTarget.innerHTML === "1";

    router.push(firstPage ? path : link);
  };

  const onPrevClick = (link: string) => {
    const secondPage = currentPage - 1 + "" === "1";

    router.push(secondPage ? path : link);
  };

  const isPageCurrent = (page: number) => page === currentPage;

  const getButtonColors = (page: number) =>
    isPageCurrent(page)
      ? "bg-primary-color text-secondary-color"
      : "bg-secondary-color-alt text-primary-color";

  return (
    <div className={className}>
      <ul className="flex list-none">
        <li>
          <button
            disabled={isPageFirst}
            className="py-2 px-4 mr-1 bg-secondary-color-alt text-primary-color disabled:bg-slate-200/50 disabled:text-slate-500/40"
            onClick={() => onPrevClick(`${path}/page/${currentPage - 1}`)}
          >
            &#60;
          </button>
        </li>
        {Array.from({ length: numberOfPages }, (_, i) => (
          <li key={i + 1}>
            <button
              disabled={isPageCurrent(i + 1)}
              className={`py-2 px-4 mx-1 ${getButtonColors(i + 1)}`}
              onClick={(e) => onPageClick(e, `${path}/page/${i + 1}`)}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={isPageLast}
            className="py-2 px-4 ml-1 bg-secondary-color-alt text-primary-color disabled:bg-slate-200/50 disabled:text-slate-500/40"
            onClick={(e) => onPageClick(e, `${path}/page/${currentPage + 1}`)}
          >
            &#62;
          </button>
        </li>
      </ul>
    </div>
  );
}
