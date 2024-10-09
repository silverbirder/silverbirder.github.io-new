"use client";

import Spiral from "@/components/char/spiral";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Notebook } from "@/components/notebook";

type Props = {
  title: string;
  pathname: string;
  children: React.ReactNode;
};

export const NotebookLayout = ({ title, pathname, children }: Props) => {
  return (
    <section>
      <div className="mb-4 text-3xl font-semibold tracking-tighter leading-tight flex items-center">
        <Avatar className="w-8 h-8">
          <AvatarImage src={"/favicon.svg"} alt="silverbirder" />
          <AvatarFallback className="bg-background">S</AvatarFallback>
        </Avatar>
        <h1>{title}</h1>
        <Spiral
          className="h-8 ml-4"
          startDelay={0.0}
          duration={3.0}
          strokeColor="stroke-accent"
        />
      </div>
      <Notebook pathname={pathname}>{children}</Notebook>
    </section>
  );
};
