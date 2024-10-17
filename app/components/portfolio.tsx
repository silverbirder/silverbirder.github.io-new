"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Github,
  Twitter,
  Coffee,
  Code,
  Car,
  Candy,
  ExternalLink,
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
import { TechIcon } from "@/components/tech-icon";
import {
  topSkills,
  skillCategories,
  workExperiences,
  artifacts,
  notableContent,
} from "@/data/portfolio.data";

export const Portfolio = () => {
  return (
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
      <div className="flex flex-col gap-6">
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
              大学でWebアプリ開発に出会い、価値提供の喜びを知る。個人開発を積極的に。
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-xl leading-[3rem] font-bold">お気に入りの技術</h2>
          <div className="flex flex-row gap-6 flex-wrap">
            {topSkills.map((skill, index) => (
              <TechIcon key={index} skill={skill} />
            ))}
          </div>
        </section>
        <section>
          <div className="flex justify-start items-center">
            <h2 className="text-xl leading-[3rem] font-bold">経験のある技術</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="skills">
              <AccordionTrigger className="text-lg leading-[3rem] font-semibold py-0">
                経験技術一覧を表示
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-6">
                  {skillCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <h3 className="text-base">{category.name}</h3>
                      <div className="flex flex-wrap gap-6">
                        {category.skills.map((skill, skillIndex) => (
                          <TechIcon key={skillIndex} skill={skill} />
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
          <div className="flex items-center space-x-6 mb-6 ml-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm leading-6">正社員</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm leading-6">業務委託</span>
            </div>
          </div>
          <div className="relative mt-12">
            {workExperiences.map((exp, index) => (
              <div key={index} className="mb-6 ml-6 relative">
                <div
                  className={`absolute -left-[9px] top-0 bottom-0 w-0.5 ${
                    exp.type === "fulltime" ? "bg-blue-500" : "bg-yellow-500"
                  }`}
                ></div>
                <span
                  className={`flex absolute -left-5 -top-6 justify-center items-center w-6 h-6 ${
                    exp.type === "fulltime" ? "bg-blue-200" : "bg-yellow-200"
                  } rounded-full ring-8 ring-transparent`}
                >
                  <svg
                    aria-hidden="true"
                    className={`w-3 h-3 ${
                      exp.type === "fulltime"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
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
                <div className="relative -top-6 left-6">
                  <h3 className="flex items-center text-base font-semibold text-gray-900">
                    {exp.company}
                  </h3>
                  <p className="text-base text-gray-500">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl leading-[3rem] font-bold">成果物</h2>
          <h3 className="text-lg leading-[3rem] font-semibold">書籍</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {artifacts.books.map((book, index) => (
              <a
                key={index}
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="h-48 block select-none border border-gray-200 rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-36 max-h-full w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm font-medium text-center leading-6">
                  {book.title}
                </p>
              </a>
            ))}
          </div>
          <h3 className="text-lg leading-[3rem] font-semibold">Webサービス</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {artifacts.webServices.map((service, index) => (
              <a
                key={index}
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                className="h-48 block select-none border border-gray-200 rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow"
              >
                <div className="h-24 flex items-center justify-center p-2">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="max-h-full max-w-full w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-medium mb-2">{service.title}</h4>
                  <p className="text-xs text-gray-600 line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
          <h3 className="text-lg leading-[3rem] font-semibold">
            GitHubプロジェクト
          </h3>
          <ul className="list-disc pl-6">
            {artifacts.githubProjects.map((project, index) => (
              <li key={index} className="ml-6">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-base font-medium"
                >
                  {project.name}
                </a>
                <ul className="list-disc ml-6">
                  <li className="text-sm text-gray-600 leading-6">
                    {project.description}
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl leading-[3rem] font-bold">注目のコンテンツ</h2>
          <div className="flex flex-col gap-6">
            {notableContent.map((content, index) => (
              <div
                key={index}
                className="bg-yellow-100 flex flex-col p-6 rounded-lg"
              >
                <h3 className="text-xl leading-[3rem] font-semibold">
                  {content.title}
                </h3>
                <Badge
                  variant="secondary"
                  className="mb-6 w-fit h-6 leading-6 py-0"
                >
                  {content.type}
                </Badge>
                <p className="text-sm text-gray-600 mb-6 leading-6">
                  {content.description}
                </p>
                <a
                  href={content.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-blue-600 hover:underline flex items-center"
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
            <div className="flex items-center mb-6">
              <Lightbulb className="w-8 h-8 text-yellow-500 mr-3" />
              <p className="text-xl font-semibold leading-[3rem]">
                技術的なサポートが必要ですか？
              </p>
            </div>
            <p className="text-gray-700 mb-6 text-base">
              Web開発、フロントエンド技術、テスト戦略などについて、個別指導やメンタリングを提供しています。MENTAを通じて、あなたの技術的な成長をサポートします。
            </p>
            <div className="flex justify-center">
              <Button variant="default" className="h-12 mt-6 py-0">
                <a
                  href="https://menta.work/user/6835"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-base"
                >
                  MENTAでサポートを受ける
                  <ExternalLink className="ml-2 w-6 h-6" />
                </a>
              </Button>
            </div>
          </div>
        </section>
        <section className="text-center">
          <h2 className="text-xl leading-[3rem] font-bold">コンタクト</h2>
          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/silverbirder"
              target="_blank"
              rel="noopener noreferrer"
              className="leading-6 text-yellow-500 hover:text-yellow-600"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/silverbirder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-600"
            >
              <Twitter className="leading-6 w-6 h-6" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

const SweetIcon = ({ icon: Icon, color, style }) => (
  <div className={`absolute ${color}`} style={style}>
    <Icon className="w-6 h-6 opacity-30" />
  </div>
);
