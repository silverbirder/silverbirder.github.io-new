import { NotebookLayout } from "@/components/notebook-layout";

export const metadata = {
  title: "自己紹介",
  description: "@silverbirderについて紹介します",
};

export default function Page() {
  return (
    <NotebookLayout title={"自己紹介"} pathname={"/me"}>
      こんにちは
    </NotebookLayout>
  );
}
