import { NotebookLayout } from "@/components/notebook-layout";

export default function Page() {
  return (
    <NotebookLayout title={"ジブンノート"} pathname={"/"}>
      <p className="leading-4 text-foreground mb-4">
        ようこそ！私は@silverbirderです。ウェブ開発と甘味が大好きなWebエンジニアです。
      </p>
    </NotebookLayout>
  );
}
