"use client";

import Spiral from "./components/char/spiral";

export default function Page() {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter leading-8">
        わたしの個人サイト
      </h1>
      <div className="mb-4 leading-8 flex items-center">
        <span>こんにちは！</span>
        <Spiral className="h-8" startDelay={0.0} duration={3.0} />
      </div>
    </section>
  );
}
