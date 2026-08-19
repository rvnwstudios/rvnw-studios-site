"use client";

import { useState, type FormEvent } from "react";
import { SubmitButton } from "../motion/SubmitButton";

const inputClass =
  "w-full rounded-[2px] border border-[#2A2A28] bg-[#0A0A0A] px-4 py-3 font-body text-[15px] text-paper placeholder:text-[#5A5A56] outline-none transition-colors focus:border-hero focus-visible:ring-2 focus-visible:ring-hero/40";

const labelClass = "mb-2 block font-display text-[13px] font-semibold tracking-[0.02em] text-paper";

export function LoginForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-[#2A2A28] bg-[#0A0A0A] p-8">
        <h3 className="mb-3 font-display text-2xl font-semibold text-paper">Not Live Yet.</h3>
        <p className="font-body text-base leading-relaxed text-grid">
          The Client Portal is still in progress. Reach out and we&apos;ll get you set up as soon
          as it&apos;s ready.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={inputClass}
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="password" className={labelClass}>
            Password
          </label>
          <span className="font-body text-[13px] text-grid">Forgot password?</span>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className={inputClass}
        />
      </div>

      <SubmitButton
        type="submit"
        className="btn-hero flex min-h-[44px] items-center justify-center rounded-full px-8 py-4 font-mono text-[15px] font-semibold tracking-[0.03em] text-ink"
      >
        Sign In
      </SubmitButton>
    </form>
  );
}
