import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RMark } from "@/components/RMark";
import { LoginForm } from "@/components/login/LoginForm";

export const metadata: Metadata = {
  title: "Sign In — RVNW Studios",
  description: "Sign in to the RVNW Studios Client Portal.",
};

export default function LoginPage() {
  return (
    <>
      <Nav />
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-ink px-6 pt-[104px] pb-20 sm:px-8 sm:pt-[128px] md:min-h-[calc(100vh-68px)] md:px-12 lg:px-20">
        <div className="w-full max-w-[440px]">
          <div className="mb-10 flex flex-col items-center text-center">
            <RMark size={32} className="mb-6 h-8 w-8" />
            <span className="mb-3 block font-mono text-xs tracking-[0.15em] text-grid uppercase">
              Client Portal
            </span>
            <h1 className="font-display text-2xl font-semibold text-paper sm:text-[28px]">
              Sign In to Your Account
            </h1>
          </div>

          <div className="border border-[#2A2A28] bg-[#111110] p-8 sm:p-10">
            <LoginForm />
          </div>

          <p className="mt-8 text-center font-body text-sm text-grid">
            Don&apos;t have an account?{" "}
            <Link href="/start-a-project" className="text-paper underline underline-offset-4">
              Start a project
            </Link>{" "}
            to get one.
          </p>
        </div>
      </main>
      <Footer showAvailableBadge={false} />
    </>
  );
}
