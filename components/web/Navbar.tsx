"use client";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Next <span className="text-blue-500">Pro</span>
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <Link className={buttonVariants({ variant: "ghost" })} href="/">
            Home
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/blog">
            Blog
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/create">
            Create
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2 ">
        <Link className={buttonVariants()} href="/auth/sign-up">
          Sign up
        </Link>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="/auth/login"
        >
          Login
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};
