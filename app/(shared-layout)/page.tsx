"use client";
import { useQuery } from "convex/react";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { task } from "better-auth/react";

export default function Home() {
  // const tasks = useQuery(api.tasks.get);

  // console.log("tasks", tasks);
  return (
    <div className="flex  bg-emerald-200 font-sans">
      <main className="flex w-full max-w-3xl flex-col items-center justify-between dark:bg-black py-32 px-16 sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        {/* {tasks?.map(({ _id, text }) => (
          <div key={_id}>{text}</div>
        ))} */}
      </main>
    </div>
  );
}
