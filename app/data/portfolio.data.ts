import {
  DeviconGitbook,
  DeviconGithubcodespaces,
  DeviconGitpod,
  DeviconPytest,
} from "@/components/_icons/devicon";
import {
  FileIconsDigdag,
  FileIconsOpenpolicyagent,
} from "@/components/_icons/file";
import { LogosGoogleCloudPlatform } from "@/components/_icons/icon";
import {
  LogosAlgolia,
  LogosAmpIcon,
  LogosAnsible,
  LogosApache,
  LogosArgoIcon,
  LogosAtlassian,
  LogosAtomIcon,
  LogosAws,
  LogosBitbucket,
  LogosBootstrap,
  LogosBrackets,
  LogosCakephpIcon,
  LogosChromaticIcon,
  LogosChromeWebStore,
  LogosCircleci,
  LogosCloudflareWorkersIcon,
  LogosCloudinaryIcon,
  LogosCodecovIcon,
  LogosContentful,
  LogosCucumber,
  LogosDatadog,
  LogosDependabot,
  LogosDiscordIcon,
  LogosDjangoIcon,
  LogosDockerIcon,
  LogosDropbox,
  LogosEclipseIcon,
  LogosElectron,
  LogosExpoIcon,
  LogosExpress,
  LogosFfmpegIcon,
  LogosFigma,
  LogosFlask,
  LogosGithubActions,
  LogosGithubCopilot,
  LogosGithubIcon,
  LogosGo,
  LogosGoogleAnalytics,
  LogosGoogleMaps,
  LogosGoogleTagManager,
  LogosGraphql,
  LogosGravatarIcon,
  LogosGulp,
  LogosHerokuIcon,
  LogosHugo,
  LogosIntellijIdea,
  LogosJavascript,
  LogosJenkins,
  LogosJest,
  LogosJquery,
  LogosKotlinIcon,
  LogosKubernetes,
  LogosLaravel,
  LogosLighthouse,
  LogosLitIcon,
  LogosMadge,
  LogosMaterialUi,
  LogosMemcached,
  LogosMongodbIcon,
  LogosMsw,
  LogosMysqlIcon,
  LogosNetlifyIcon,
  LogosNextjsIcon,
  LogosNginx,
  LogosNodejsIcon,
  LogosObsidianIcon,
  LogosOpenaiIcon,
  LogosPandacssIcon,
  LogosPartytownIcon,
  LogosPhp,
  LogosPlaywright,
  LogosPostmanIcon,
  LogosPuppeteer,
  LogosPwa,
  LogosPython,
  LogosQwikIcon,
  LogosRails,
  LogosReact,
  LogosRocketChatIcon,
  LogosRollbarIcon,
  LogosRust,
  LogosSelenium,
  LogosSentryIcon,
  LogosSlackIcon,
  LogosSnyk,
  LogosSonarqube,
  LogosStorybookIcon,
  LogosSurge,
  LogosSwagger,
  LogosSwr,
  LogosTerraformIcon,
  LogosTestingLibrary,
  LogosTurborepoIcon,
  LogosTypescriptIcon,
  LogosVercel,
  LogosVisualStudioCode,
  LogosVitejs,
  LogosVitest,
  LogosVue,
  LogosWebcomponents,
  LogosWebpack,
} from "@/components/_icons/logos";
import {
  OriginalApacheBeam,
  OriginalBigQuery,
  OriginalUrql,
  OriginalVarnish,
} from "@/components/_icons/original";
import {
  SimpleIconsBackstage,
  SimpleIconsFluentd,
  SimpleIconsGoogleappsscript,
} from "@/components/_icons/simple";
import { SkillIconsEmotionLight } from "@/components/_icons/skillicon";
import { TablerBrandReactNative } from "@/components/_icons/tablericon";

export const topSkills = [
  {
    name: "React",
    icon: LogosReact,
    description: "",
  },
  {
    name: "Jest",
    icon: LogosJest,
    description: "",
  },
  {
    name: "Playwright",
    icon: LogosPlaywright,
    description: "",
  },
  {
    name: "Storybook",
    icon: LogosStorybookIcon,
    description: "",
  },
  {
    name: "Figma",
    icon: LogosFigma,
    description: "",
  },
  {
    name: "BigQuery",
    icon: OriginalBigQuery,
    description: "",
  },
];

export const skillCategories = [
  {
    name: "フロントエンド",
    skills: [
      { name: "Accelerated Mobile Pages (AMP)", icon: LogosAmpIcon },
      { name: "Bootstrap", icon: LogosBootstrap },
      { name: "Electron", icon: LogosElectron },
      { name: "Figma", icon: LogosFigma },
      { name: "Gulp", icon: LogosGulp },
      { name: "Hugo", icon: LogosHugo },
      { name: "jQuery", icon: LogosJquery },
      { name: "JavaScript", icon: LogosJavascript },
      { name: "Lit", icon: LogosLitIcon },
      { name: "Madge", icon: LogosMadge },
      { name: "Material-UI", icon: LogosMaterialUi },
      { name: "Next.js", icon: LogosNextjsIcon },
      { name: "Panda CSS", icon: LogosPandacssIcon },
      { name: "Partytown", icon: LogosPartytownIcon },
      { name: "Progressive Web Apps (PWA)", icon: LogosPwa },
      { name: "Qwik", icon: LogosQwikIcon },
      { name: "React", icon: LogosReact },
      { name: "React Native", icon: TablerBrandReactNative },
      { name: "Storybook", icon: LogosStorybookIcon },
      { name: "SWR", icon: LogosSwr },
      { name: "Turborepo", icon: LogosTurborepoIcon },
      { name: "TypeScript", icon: LogosTypescriptIcon },
      { name: "urql", icon: OriginalUrql },
      { name: "Vite", icon: LogosVitejs },
      { name: "Vue.js", icon: LogosVue },
      { name: "Webpack", icon: LogosWebpack },
      { name: "Web Components", icon: LogosWebcomponents },
      { name: "emotion", icon: SkillIconsEmotionLight },
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    name: "バックエンド",
    skills: [
      { name: "CakePHP", icon: LogosCakephpIcon },
      { name: "Django", icon: LogosDjangoIcon },
      { name: "Express.js", icon: LogosExpress },
      { name: "Flask", icon: LogosFlask },
      { name: "Go", icon: LogosGo },
      { name: "GraphQL", icon: LogosGraphql },
      { name: "Kotlin", icon: LogosKotlinIcon },
      { name: "Laravel", icon: LogosLaravel },
      { name: "Node.js", icon: LogosNodejsIcon },
      { name: "PHP", icon: LogosPhp },
      { name: "Python", icon: LogosPython },
      { name: "Ruby on Rails", icon: LogosRails },
      { name: "Rust", icon: LogosRust },
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    name: "インフラ・ミドルウェア",
    skills: [
      { name: "Ansible", icon: LogosAnsible },
      { name: "Apache HTTP Server", icon: LogosApache },
      { name: "Amazon Web Services (AWS)", icon: LogosAws },
      { name: "Digdag", icon: FileIconsDigdag },
      { name: "Docker", icon: LogosDockerIcon },
      { name: "Fluentd", icon: SimpleIconsFluentd },
      { name: "Google Cloud Platform (GCP)", icon: LogosGoogleCloudPlatform },
      { name: "Kubernetes", icon: LogosKubernetes },
      { name: "Memcached", icon: LogosMemcached },
      { name: "Nginx", icon: LogosNginx },
      { name: "Terraform", icon: LogosTerraformIcon },
      { name: "Varnish Cache", icon: OriginalVarnish },
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    name: "データ",
    skills: [
      { name: "Apache Beam", icon: OriginalApacheBeam },
      { name: "BigQuery", icon: OriginalBigQuery },
      { name: "MongoDB", icon: LogosMongodbIcon },
      { name: "MySQL", icon: LogosMysqlIcon },
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    name: "テスト",
    skills: [
      { name: "Cucumber", icon: LogosCucumber },
      { name: "Jest", icon: LogosJest },
      { name: "Mock Service Worker (MSW)", icon: LogosMsw },
      { name: "Playwright", icon: LogosPlaywright },
      { name: "Puppeteer", icon: LogosPuppeteer },
      { name: "Pytest", icon: DeviconPytest },
      { name: "Selenium", icon: LogosSelenium },
      { name: "SonarQube", icon: LogosSonarqube },
      { name: "Testing Library", icon: LogosTestingLibrary },
      { name: "Vitest", icon: LogosVitest },
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    name: "DevOps",
    skills: [
      { name: "Argo", icon: LogosArgoIcon },
      { name: "Backstage", icon: SimpleIconsBackstage },
      { name: "CircleCI", icon: LogosCircleci },
      { name: "Datadog", icon: LogosDatadog },
      { name: "Dependabot", icon: LogosDependabot },
      { name: "GitHub Actions", icon: LogosGithubActions },
      { name: "Jenkins", icon: LogosJenkins },
      { name: "Lighthouse", icon: LogosLighthouse },
      { name: "Open Policy Agent (OPA)", icon: FileIconsOpenpolicyagent },
      { name: "Rollbar", icon: LogosRollbarIcon },
      { name: "Sentry", icon: LogosSentryIcon },
      { name: "Snyk", icon: LogosSnyk },
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    name: "SaaS",
    skills: [
      { name: "Algolia", icon: LogosAlgolia },
      { name: "GitBook", icon: DeviconGitbook },
      { name: "Chromatic", icon: LogosChromaticIcon },
      { name: "Cloudflare Workers", icon: LogosCloudflareWorkersIcon },
      { name: "Cloudinary", icon: LogosCloudinaryIcon },
      { name: "Codecov", icon: LogosCodecovIcon },
      { name: "Contentful", icon: LogosContentful },
      { name: "Expo", icon: LogosExpoIcon },
      { name: "GitHub Copilot", icon: LogosGithubCopilot },
      { name: "Gravatar", icon: LogosGravatarIcon },
      { name: "Heroku", icon: LogosHerokuIcon },
      { name: "Netlify", icon: LogosNetlifyIcon },
      { name: "Vercel", icon: LogosVercel },
      { name: "OpenAI", icon: LogosOpenaiIcon },
      { name: "Surge", icon: LogosSurge },
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    name: "エディタ",
    skills: [
      { name: "Atom", icon: LogosAtomIcon },
      { name: "Brackets", icon: LogosBrackets },
      { name: "GitHub Codespaces", icon: DeviconGithubcodespaces },
      { name: "Gitpod", icon: DeviconGitpod },
      { name: "Eclipse", icon: LogosEclipseIcon },
      { name: "IntelliJ IDEA", icon: LogosIntellijIdea },
      { name: "Visual Studio Code", icon: LogosVisualStudioCode },
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    name: "開発ツール",
    skills: [
      { name: "FFmpeg", icon: LogosFfmpegIcon },
      { name: "Google Apps Script", icon: SimpleIconsGoogleappsscript },
      { name: "Postman", icon: LogosPostmanIcon },
      { name: "Swagger", icon: LogosSwagger },
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    name: "ビジネス",
    skills: [
      { name: "Atlassian", icon: LogosAtlassian },
      { name: "Bitbucket", icon: LogosBitbucket },
      { name: "Chrome Web Store", icon: LogosChromeWebStore },
      { name: "Discord", icon: LogosDiscordIcon },
      { name: "Dropbox", icon: LogosDropbox },
      { name: "GitHub", icon: LogosGithubIcon },
      { name: "Obsidian", icon: LogosObsidianIcon },
      { name: "Rocket.Chat", icon: LogosRocketChatIcon },
      { name: "Slack", icon: LogosSlackIcon },
      { name: "Google Tag Manager", icon: LogosGoogleTagManager },
      { name: "Google Analytics", icon: LogosGoogleAnalytics },
      { name: "Google Maps", icon: LogosGoogleMaps },
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
];

export const workExperiences = [
  {
    company: "System Integration",
    description:
      "新卒でWebアプリの開発、保守、運用に従事。設計からリリースまで一貫して経験を積む。",
    type: "fulltime",
  },
  {
    company: "E-Commerce",
    description:
      "フルスタックエンジニアとして、大規模アプリケーションのアーキテクチャ設計とモダナイゼーションに貢献。",
    type: "fulltime",
  },
  {
    company: "Fintech",
    description:
      "フロントエンドエンジニアとして、プロダクト改善および新機能の開発に携わる。",
    type: "fulltime",
  },
  {
    company: "Restaurant",
    description:
      "フロントエンドエンジニアとして、SaaSプロダクトのクロスプラットフォーム開発に携わる。",
    type: "contract",
  },
  {
    company: "Food Delivery",
    description:
      "フルスタックエンジニアとして、宅食サービスのプロダクト開発を担当。",
    type: "fulltime",
  },
  {
    company: "Media",
    description:
      "フロントエンドエンジニアとして、メディアサイトの新規開発および改善に携わる。",
    type: "contract",
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
    {
      title: "クチコミ仲間",
      description:
        "クチコミ仲間は、あなたと同じ場所をクチコミした仲間を見つけるためのアプリです。",
      image:
        "https://res.cloudinary.com/silverbirder/image/upload/v1726033783/silver-birder.github.io/artifacts/review-connect",
      link: "https://review-connect.vercel.app",
    },
    {
      title: "元とらなアカン",
      description:
        "商品価格を使用頻度や期間から1日あたりのコストを計算するシンプルな電卓アプリ",
      image:
        "https://res.cloudinary.com/silverbirder/image/upload/v1726487561/silver-birder.github.io/artifacts/%E5%85%83%E3%81%A8%E3%82%89%E3%81%AA%E3%82%A2%E3%82%AB%E3%83%B3",
      link: "https://moto-torana-akan.vercel.app",
    },
    {
      title: "タイアップ検索",
      description:
        "Spotifyで再生中の曲情報を取得し、AIを使ってタイアップ情報を自動で検索します。",
      image:
        "https://res.cloudinary.com/silverbirder/image/upload/v1729167141/silver-birder.github.io/artifacts/%E3%82%BF%E3%82%A4%E3%82%A2%E3%83%83%E3%83%95%E3%82%9A%E6%A4%9C%E7%B4%A2.jpg",
      link: "https://tie-track.vercel.app",
    },
  ],
  githubProjects: [
    {
      name: "o-embed",
      description: "Web Components for oEmbed generated by open-wc",
      link: "https://www.webcomponents.org/element/silverbirder/o-embed",
    },
    {
      name: "ogp-me",
      description:
        "WebComponent that displays Facebook-like information based on Open Graph Protocol (OGP)",
      link: "https://www.webcomponents.org/element/silverbirder/ogp-me",
    },
    {
      name: "Google Account Photo API",
      description: "API that returns the image of your Google account",
      link: "https://github.com/silverbirder/Google-Account-Photo-API",
    },
    {
      name: "CaAT",
      description:
        "Google Apps Script Library to calculate assigned time in Google Calendar",
      link: "https://github.com/silverbirder/CaAT",
    },
    {
      name: "Cotlin",
      description:
        "Tools that collect links in tweets using the Twitter API (Search Tweets)",
      link: "https://github.com/silverbirder/Cotlin",
    },
    {
      name: "rMinc",
      description: "Google Apps Script Library to register mail in Calendar",
      link: "https://github.com/silverbirder/rMinc",
    },
    {
      name: "Tiqav2",
      description: "Platform that provides image search API",
      link: "https://github.com/silverbirder/tiqav2",
    },
    {
      name: "zoom-meeting-creator",
      description: "Google Apps Script for creating Zoom meetings",
      link: "https://github.com/silverbirder/zoom-meeting-creator",
    },
  ],
};

export const notableContent = [
  {
    title: "大規模フロントエンドのクリーンアーキテクチャ化",
    type: "Presentation",
    link: "https://www.slideshare.net/slideshow/ss-150331504/150331504",
    description: "Developers Boost KANSAI (2019.6.15 @Osaka) の発表資料です。",
  },
  {
    title:
      "初めての技術選定を頼まれた時に大事だったのは俯瞰的・相対的な考え方だった",
    type: "Blog",
    link: "https://tech-blog.monotaro.com/entry/2021/06/03/090000",
    description: "ワークフローエンジンの技術選定についてのブログ記事です。",
  },
  {
    title:
      "Webフロントエンド再設計: レイヤードアーキテクチャの導入 ~ 高品質なコードを実現するために ~",
    type: "Blog",
    link: "https://zenn.dev/moneyforward/articles/e97dd1c0412071",
    description:
      "WebフロントエンドにFeature-Sliced Designというレイヤードアーキテクチャを導入した話です。",
  },
  {
    title: "Webフロントエンドにおける網羅的テストパターンガイド",
    type: "Blog",
    link: "https://zenn.dev/silverbirder/articles/c3de04c9e6dd58",
    description:
      "Webフロントエンドにおける機能面、非機能面、そしてUI/UXの視点からのテストパターンガイドを紹介します。",
  },
];
