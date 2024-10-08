"use client";

import Spiral from "./components/char/spiral";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Notebook } from "./components/notebook";

export default function Page() {
  return (
    <section>
      <div className="mb-8 text-3xl font-semibold tracking-tighter leading-tight flex items-center">
        <Avatar>
          <AvatarImage src={"/favicon.svg"} alt="silverbirder" />
          <AvatarFallback className="bg-background">S</AvatarFallback>
        </Avatar>
        <h1>ジブンノート</h1>
        <Spiral
          className="h-8 ml-4"
          startDelay={0.0}
          duration={3.0}
          strokeColor="stroke-accent"
        />
      </div>
      <Notebook>
        <motion.p
          className="leading-4 text-foreground mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          ようこそ！私は@silverbirderです。ウェブ開発と甘味が大好きなWebエンジニアです。
        </motion.p>
      </Notebook>
    </section>
  );
}
