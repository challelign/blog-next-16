import { buttonVariants } from "@/components/ui/button";
import { Navbar } from "@/components/web/Navbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-sm md:max-w-md space-y-4">
        <Link
          href="/"
          className={buttonVariants({
            variant: "ghost",
            className: "w-fit -ml-2 hover:bg-transparent hover:text-primary",
          })}
        >
          <ArrowLeft className="mr-2 size-4" />
          Go back
        </Link>
        {children}
      </div>
    </div>
  );
}
