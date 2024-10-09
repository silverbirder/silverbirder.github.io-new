import { NotebookLayout } from "@/components/notebook-layout";
import { Link } from "next-view-transitions";
import { User, Code, Briefcase } from "lucide-react";

type TOCSubItem = {
  page: number;
  title: string;
  path: string;
};

type TOCItem = {
  title: string;
  icon: React.ElementType;
  subItems: TOCSubItem[];
};

const tocItems: TOCItem[] = [
  {
    title: "初めての方",
    icon: User,
    subItems: [{ page: 1, title: "自己紹介", path: "/me" }],
  },
  {
    title: "エンジニアの方",
    icon: Code,
    subItems: [{ page: 2, title: "技術ブログ", path: "/blog" }],
  },
  {
    title: "採用担当の方",
    icon: Briefcase,
    subItems: [{ page: 3, title: "ポートフォリオ", path: "/portfolio" }],
  },
];

const TableOfContents = () => {
  return (
    <div className="max-w-2xl">
      <div className="space-y-8">
        {tocItems.map((item, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <item.icon className="w-8 h-8 mr-2" />
              {item.title}
            </h2>
            <div>
              {item.subItems.map((subItem, subIndex) => (
                <div key={subIndex} className="mb-4 flex items-center">
                  <div className="leading-4">
                    <Link
                      href={subItem.path}
                      className="text-primary hover:underline leading-4"
                    >
                      {subItem.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <NotebookLayout title={"ジブンノート"} pathname={"/"}>
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="leading-4 text-foreground">
            ようこそ！私は@silverbirderです。ウェブ開発に関わるソフトウェアエンジニアです。
          </p>
        </div>
        <TableOfContents />
      </div>
    </NotebookLayout>
  );
}
