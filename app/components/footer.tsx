import { Link } from "next-view-transitions";
import NotebookLine from "./notebook-line";

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="notebook-footer mb-24">
      <NotebookLine>&nbsp;</NotebookLine>
      <NotebookLine>
        <ul className="flex flex-col md:flex-row md:space-x-4 text-neutral-600 dark:text-neutral-300">
          <li>
            <Link
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="/rss"
            >
              <ArrowIcon />
              <span className="ml-2">rss</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/silverbirder"
            >
              <ArrowIcon />
              <span className="ml-2">github</span>
            </Link>
          </li>
        </ul>
      </NotebookLine>
      <NotebookLine>&nbsp;</NotebookLine>
      <NotebookLine>
        <p className="text-neutral-600 dark:text-neutral-300">
          © {new Date().getFullYear()} silverbirder
        </p>
      </NotebookLine>
    </footer>
  );
}
