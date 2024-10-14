import { NotebookLayout } from "@/components/notebook-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EnhancedImage } from "@/components/enhanced-image";
import {
  Github,
  Twitter,
  Coffee,
  Code,
  Car,
  Candy,
  ExternalLink,
  Info,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  topSkills,
  skillCategories,
  workExperiences,
  artifacts,
  notableContent,
  skillLevelDescriptions,
} from "./data";

export const metadata = {
  title: "ポートフォリオ",
  description: "@silverbirderのポートフォリオを紹介します",
};

export default function Page() {
  return (
    <NotebookLayout title={"ポートフォリオ"} pathname={"/portfolio"}>
      <div className="relative mx-auto p-6">
        <SweetIcon
          icon={Coffee}
          color="text-brown-500"
          style={{ top: "5%", left: "5%", transform: "rotate(15deg)" }}
        />
        <SweetIcon
          icon={Candy}
          color="text-pink-500"
          style={{ top: "15%", right: "10%", transform: "rotate(-10deg)" }}
        />
        <SweetIcon
          icon={Code}
          color="text-blue-300"
          style={{ bottom: "20%", left: "8%", transform: "rotate(5deg)" }}
        />
        <SweetIcon
          icon={Car}
          color="text-yellow-500"
          style={{ bottom: "10%", right: "5%", transform: "rotate(-20deg)" }}
        />
        <div className="space-y-6">
          <section className="flex flex-col space-y-6 pb-6">
            <div className="flex items-center space-x-6">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/favicon.svg" alt="@silverbirder" />
                <AvatarFallback>SB</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl leading-[3rem] font-bold">
                  @silverbirder
                </h2>
                <p className="text-xs text-muted leading-6">
                  Webソフトウェアエンジニア
                </p>
              </div>
            </div>
            <div>
              <p className="text-base leading-6">
                大学でWebアプリ開発に出会い、アウトプットの喜びを知る。個人開発も積極的に。
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-xl leading-[3rem] font-bold">
              使い慣れた、好みのライブラリ/フレームワーク
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {topSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-blue-200 flex flex-col items-center justify-center h-24 w-24"
                >
                  <skill.icon className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-xs font-medium text-center">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
          <section>
            <div className="flex justify-start items-center mb-4 gap-2">
              <h2 className="text-xl leading-[3rem] font-bold">
                ハードスキル詳細
              </h2>
              <Popover>
                <PopoverTrigger>
                  <Info className="w-5 h-5 text-gray-500 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4 bg-white rounded-lg shadow-xl border border-gray-200">
                  <h4 className="font-bold text-lg mb-2">スキルレベルの説明</h4>
                  <ul className="space-y-2">
                    <li>
                      <span className="font-semibold">初級者:</span>{" "}
                      {skillLevelDescriptions.beginner}
                    </li>
                    <li>
                      <span className="font-semibold">中級者:</span>{" "}
                      {skillLevelDescriptions.intermediate}
                    </li>
                    <li>
                      <span className="font-semibold">上級者:</span>{" "}
                      {skillLevelDescriptions.advanced}
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="skills">
                <AccordionTrigger className="text-lg font-semibold">
                  スキル一覧を表示
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    {skillCategories.map((category, categoryIndex) => (
                      <div key={categoryIndex}>
                        <h3 className="text-lg font-semibold mb-2">
                          {category.name}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {category.skills.map((skill, skillIndex) => (
                            <div
                              key={skillIndex}
                              className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                            >
                              <skill.icon className="w-8 h-8 text-gray-700" />
                              <div className="flex-grow">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium">{skill.name}</h4>
                                  <SkillLevelBadge level={skill.level} />
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {skill.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          <section>
            <h2 className="text-xl leading-[3rem] font-bold">職歴</h2>
            <div className="relative border-l-2 border-gray-200 ml-3">
              {workExperiences.map((exp, index) => (
                <div key={index} className="mb-8 ml-6">
                  <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white">
                    <svg
                      aria-hidden="true"
                      className="w-3 h-3 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                    {exp.company}
                  </h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                    {exp.period}
                  </time>
                  <p className="mb-4 text-base font-normal text-gray-500">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-xl leading-[3rem] font-bold">成果物</h2>
            <h3 className="text-lg leading-[3rem] font-semibold">書籍</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {artifacts.books.map((book, index) => (
                <a
                  key={index}
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-75 transition-opacity"
                >
                  <EnhancedImage
                    src={book.image}
                    alt={book.title}
                    width={150}
                    height={200}
                    className="w-full h-auto object-cover rounded"
                  />
                  <p className="mt-2 text-sm font-medium text-center">
                    {book.title}
                  </p>
                </a>
              ))}
            </div>
            <h3 className="text-lg leading-[3rem] font-semibold">
              Webサービス
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {artifacts.webServices.map((service, index) => (
                <a
                  key={index}
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <EnhancedImage
                    src={service.image}
                    alt={service.title}
                    width={100}
                    height={100}
                    className="w-16 h-16 object-cover rounded mb-2"
                  />
                  <h4 className="font-medium">{service.title}</h4>
                  <p className="text-sm  text-gray-600">
                    {service.description}
                  </p>
                </a>
              ))}
            </div>
            <h3 className="text-lg leading-[3rem] font-semibold">
              GitHubプロジェクト
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {artifacts.githubProjects.map((project, index) => (
                <li key={index}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {project.name}
                  </a>
                  <span className="text-sm text-gray-600 ml-2">
                    - {project.description}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-xl leading-[3rem] font-bold">
              注目のコンテンツ
            </h2>
            <div className="space-y-4">
              {notableContent.map((content, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <h3 className="text-xl leading-[3rem] font-semibold">
                    {content.title}
                  </h3>
                  <Badge variant="secondary" className="mb-2">
                    {content.type}
                  </Badge>
                  <p className="text-sm text-gray-600 mb-2">
                    {content.description}
                  </p>
                  <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    詳細を見る
                    <ExternalLink className="ml-1 w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-xl leading-[3rem] font-bold">
              技術支援・メンタリング
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Lightbulb className="w-8 h-8 text-yellow-500 mr-3" />
                <p className="text-xl font-semibold">
                  技術的なサポートが必要ですか？
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                Web開発、フロントエンド技術、テスト戦略などについて、個別指導やメンタリングを提供しています。MENTAを通じて、あなたの技術的な成長をサポートします。
              </p>
              <div className="flex justify-center">
                <Button variant="default" className="mt-2">
                  <a
                    href="https://menta.work/user/6835"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    MENTAでサポートを受ける
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </section>
          <section className="text-center">
            <h2 className="text-xl leading-[3rem] font-bold">コンタクト</h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex justify-center space-x-4">
                <a
                  href="https://github.com/silverbirder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Github className="w-8 h-8" />
                </a>
                <a
                  href="https://twitter.com/silverbirder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Twitter className="w-8 h-8" />
                </a>
              </div>
              <Button variant="outline" className="mt-4">
                <a
                  href="mailto:contact@example.com"
                  className="flex items-center"
                >
                  お仕事の依頼はこちら
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </NotebookLayout>
  );
}

const SweetIcon = ({ icon: Icon, color, style }) => (
  <div className={`absolute ${color}`} style={style}>
    <Icon className="w-6 h-6 opacity-30" />
  </div>
);

const SkillLevelBadge = ({ level }) => {
  const badgeStyles = {
    beginner: "bg-gradient-to-r from-green-200 to-green-300 text-green-800",
    intermediate: "bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800",
    advanced: "bg-gradient-to-r from-purple-200 to-purple-300 text-purple-800",
  };

  const levelText = {
    beginner: "初級",
    intermediate: "中級",
    advanced: "上級",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeStyles[level]}`}
    >
      {levelText[level]}
    </span>
  );
};
