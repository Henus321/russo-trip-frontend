import { marked } from "marked";

interface Props {
  markdown: string;
}

export default function Markdown({ markdown }: Props) {
  return (
    <div
      className="markdown flex flex-col w-full mb-4"
      dangerouslySetInnerHTML={{ __html: marked(markdown) }}
    ></div>
  );
}
