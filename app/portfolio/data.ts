import {
  SiReact,
  SiJest,
  SiStorybook,
  SiJavascript,
  SiTypescript,
  SiWebcomponentsdotorg,
  SiNodedotjs,
  SiPython,
  SiGooglecloud,
  SiDocker,
  SiGooglebigquery,
  SiMysql,
  SiGit,
} from "react-icons/si";

export const topSkills = [
  {
    name: "React",
    icon: SiReact,
    description: "メインの開発ライブラリとして使用",
  },
  {
    name: "Jest",
    icon: SiJest,
    description: "ユニットテストに活用",
  },
  {
    name: "Storybook",
    icon: SiStorybook,
    description: "UIコンポーネント開発に利用",
  },
];

export const skillCategories = [
  {
    name: "フロントエンド",
    skills: [
      {
        name: "JavaScript",
        icon: SiJavascript,
        level: "advanced",
        years: 7,
        description: "ES6+, async/await, フロントエンド開発",
      },
      {
        name: "React",
        icon: SiReact,
        level: "intermediate",
        years: 4,
        description: "Hooks, Context API, カスタムフック作成",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        level: "intermediate",
        years: 3,
        description: "型安全性、インターフェース、ジェネリクス",
      },
      {
        name: "Web Components",
        icon: SiWebcomponentsdotorg,
        level: "intermediate",
        years: 2,
        description: "カスタム要素、Shadow DOM、HTML Templates",
      },
    ],
  },
  {
    name: "バックエンド",
    skills: [
      {
        name: "Node.js",
        icon: SiNodedotjs,
        level: "advanced",
        years: 6,
        description: "Express, RESTful API設計, 非同期処理",
      },
      {
        name: "Python",
        icon: SiPython,
        level: "beginner",
        years: 1,
        description: "データ処理、スクリプティング",
      },
    ],
  },
  {
    name: "インフラ",
    skills: [
      {
        name: "Google Cloud Platform",
        icon: SiGooglecloud,
        level: "beginner",
        years: 2,
        description: "Cloud Functions, App Engine, Cloud Storage",
      },
      {
        name: "Docker",
        icon: SiDocker,
        level: "beginner",
        years: 2,
        description: "コンテナ化、開発環境構築",
      },
    ],
  },
  {
    name: "データ",
    skills: [
      {
        name: "BigQuery",
        icon: SiGooglebigquery,
        level: "beginner",
        years: 1,
        description: "データ分析、大規模データセットのクエリ",
      },
      {
        name: "SQL",
        icon: SiMysql,
        level: "intermediate",
        years: 4,
        description: "データベース設計、複雑なクエリ作成",
      },
    ],
  },
  {
    name: "その他",
    skills: [
      {
        name: "Testing",
        icon: SiJest,
        level: "intermediate",
        years: 3,
        description: "Jest, React Testing Library, E2Eテスト",
      },
      {
        name: "Git",
        icon: SiGit,
        level: "advanced",
        years: 7,
        description: "バージョン管理、ブランチ戦略",
      },
    ],
  },
];

export const workExperiences = [
  {
    period: "2016/04 - 2018/07",
    company: "System Integration",
    description:
      "新卒でWebアプリ開発・保守・運用に従事。上流から下流工程まで経験。",
  },
  {
    period: "2018/08 - 2021/12",
    company: "E-Commerce",
    description:
      "フルスタックエンジニアとして、大規模アプリのアーキテクチャとモダナイゼーションに貢献。",
  },
  {
    period: "2022/01 - 2023/06",
    company: "Fintech",
    description:
      "フロントエンドエンジニアとして、プロダクト改修と新規開発に携わる。",
  },
  {
    period: "2023/07 - 2023/11",
    company: "Restaurant",
    description:
      "業務委託で飲食店向けSaaSプロダクトのクロスプラットフォーム開発を担当。",
  },
  {
    period: "2023/12 - 2024/01",
    company: "Food Delivery",
    description:
      "フルスタックエンジニアとして、宅食サービスのプロダクト開発を担当。",
  },
];

export const artifacts = {
  books: [
    {
      title: "はじめてのWeb Components入門",
      image:
        "https://res.cloudinary.com/silverbirder/image/upload/v1696334257/silver-birder.github.io/artifacts/Introduction-to-webcomponents-for-beginners.jpg",
      link: "https://www.amazon.co.jp/gp/product/B08CY2QCFV/",
    },
  ],
  webServices: [
    {
      title: "ぼちぼち",
      description: "『どこの食材が一番安い？』そんな悩みを解決するWebサービス",
      image:
        "https://res.cloudinary.com/silverbirder/image/upload/v1707629480/silver-birder.github.io/artifacts/bochi-bochi.png",
      link: "https://bochi-bochi.vercel.app",
    },
    {
      title: "こつこつ",
      description: "何でもこつこつ記録して可視化できるWebサービス",
      image:
        "https://res.cloudinary.com/silverbirder/image/upload/v1716716859/silver-birder.github.io/artifacts/kotsu-kotsu.png",
      link: "https://kotsu-kotsu.vercel.app",
    },
  ],
  githubProjects: [
    {
      name: "o-embed",
      description: "Web Components for oEmbed",
      link: "https://www.webcomponents.org/element/silverbirder/o-embed",
    },
    {
      name: "ogp-me",
      description: "WebComponent for Open Graph Protocol",
      link: "https://www.webcomponents.org/element/silverbirder/ogp-me",
    },
    {
      name: "Google Account Photo API",
      description: "API for Google account photos",
      link: "https://github.com/silverbirder/Google-Account-Photo-API",
    },
  ],
};

export const notableContent = [
  {
    title: "マイクロフロントエンドアーキテクチャ",
    type: "Blog",
    link: "https://silverbirder.github.io/blog/contents/microfrontends",
    description: "マイクロフロントエンドの概念と実装方法について解説",
  },
  {
    title: "Web Componentsで作るUIライブラリ",
    type: "Presentation",
    link: "https://speakerdeck.com/silverbirder/web-componentsdetukuruuiraiburari",
    description: "Web Componentsを使ったUIライブラリの設計と実装について",
  },
  {
    title: "Googleが提唱するMobile Firstの本質",
    type: "Blog",
    link: "https://silverbirder.github.io/blog/contents/mobile-first",
    description: "モバイルファーストアプローチの重要性と実践方法",
  },
];

export const skillLevelDescriptions = {
  beginner: "基本的な概念を理解し、簡単なタスクを遂行できる",
  intermediate: "中程度の複雑さのプロジェクトを独力で遂行できる",
  advanced: "複雑なプロジェクトをリードし、他者に指導できる",
};
