"use client";

import { useRef, useState, type FormEvent } from "react";
import { SubmitButton } from "../motion/SubmitButton";
import { BUDGET_RANGES, DISCIPLINES, TIMELINES, VERTICALS } from "@/lib/inquiry";

type FormState = {
  name: string;
  email: string;
  projectDetails: string;
  company: string;
  vertical: string;
  disciplines: string[];
  budget: string;
  timeline: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  projectDetails: "",
  company: "",
  vertical: "",
  disciplines: [],
  budget: "",
  timeline: "",
};

type RequiredField = "name" | "email" | "projectDetails";
type FieldErrors = Partial<Record<RequiredField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field: RequiredField, value: string): string | undefined {
  const trimmed = value.trim();
  if (field === "name" && !trimmed) return "Enter your name.";
  if (field === "email") {
    if (!trimmed) return "Enter your email.";
    if (!EMAIL_PATTERN.test(trimmed)) return "Enter a valid email address.";
  }
  if (field === "projectDetails" && !trimmed) return "Tell us what you're building.";
  return undefined;
}

const inputClass =
  "w-full rounded-[2px] border border-[#2A2A28] bg-[#0A0A0A] px-4 py-3 font-body text-[15px] text-paper placeholder:text-[#5A5A56] outline-none transition-colors focus:border-hero focus-visible:ring-2 focus-visible:ring-hero/40";

const labelClass = "mb-2 block font-display text-[13px] font-semibold tracking-[0.02em] text-paper";
const optionalTag = <span className="font-body text-[13px] font-normal text-grid"> (optional)</span>;
const errorClass = "mt-2 font-body text-sm text-[#FF2D2D]";

export function InquiryForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const containerRef = useRef<HTMLFormElement>(null);
  const [minHeight, setMinHeight] = useState<number>();

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleBlur(field: RequiredField) {
    setErrors((e) => ({ ...e, [field]: validateField(field, values[field]) }));
  }

  function toggleDiscipline(d: string) {
    setValues((v) => ({
      ...v,
      disciplines: v.disciplines.includes(d)
        ? v.disciplines.filter((x) => x !== d)
        : [...v.disciplines, d],
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const nextErrors: FieldErrors = {
      name: validateField("name", values.name),
      email: validateField("email", values.email),
      projectDetails: validateField("projectDetails", values.projectDetails),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus("submitting");
    setSubmitError(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setSubmitError(
          data?.error ?? "Something went wrong sending that. Try again, or email hello@rvnwstudios.com directly.",
        );
        setStatus("error");
        return;
      }

      setMinHeight(containerRef.current?.offsetHeight);
      setStatus("success");
    } catch {
      setSubmitError("Something went wrong sending that. Try again, or email hello@rvnwstudios.com directly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ minHeight }} className="border border-[#2A2A28] bg-[#0A0A0A] p-8">
        <h3 className="mb-3 font-display text-2xl font-semibold text-paper">Got It.</h3>
        <p className="font-body text-base leading-relaxed text-grid">
          Check your inbox for a confirmation. Expect a reply within two business days.
        </p>
      </div>
    );
  }

  return (
    <form ref={containerRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          className={inputClass}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className={errorClass}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          className={inputClass}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className={errorClass}>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Company / brand{optionalTag}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={(e) => update("company", e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="vertical" className={labelClass}>
            Vertical{optionalTag}
          </label>
          <select
            id="vertical"
            name="vertical"
            value={values.vertical}
            onChange={(e) => update("vertical", e.target.value)}
            className={inputClass}
          >
            <option value="">Select one</option>
            {VERTICALS.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget range{optionalTag}
          </label>
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={(e) => update("budget", e.target.value)}
            className={inputClass}
          >
            <option value="">Select a range</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="timeline" className={labelClass}>
          Timeline{optionalTag}
        </label>
        <select
          id="timeline"
          name="timeline"
          value={values.timeline}
          onChange={(e) => update("timeline", e.target.value)}
          className={inputClass}
        >
          <option value="">Select one</option>
          {TIMELINES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className={labelClass}>Disciplines needed{optionalTag}</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {DISCIPLINES.map((d) => (
            <label
              key={d}
              className="flex min-h-[44px] cursor-pointer items-center gap-3 border border-[#2A2A28] px-4 py-2 font-body text-sm text-paper"
            >
              <input
                type="checkbox"
                checked={values.disciplines.includes(d)}
                onChange={() => toggleDiscipline(d)}
                className="h-4 w-4 accent-hero"
              />
              {d}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="projectDetails" className={labelClass}>
          Project details
        </label>
        <textarea
          id="projectDetails"
          name="projectDetails"
          rows={5}
          value={values.projectDetails}
          onChange={(e) => update("projectDetails", e.target.value)}
          onBlur={() => handleBlur("projectDetails")}
          placeholder="What are you building, and what's the goal?"
          className={`${inputClass} resize-y`}
          aria-invalid={Boolean(errors.projectDetails)}
          aria-describedby={errors.projectDetails ? "projectDetails-error" : undefined}
        />
        {errors.projectDetails && (
          <p id="projectDetails-error" className={errorClass}>
            {errors.projectDetails}
          </p>
        )}
      </div>

      {submitError && <p className={errorClass}>{submitError}</p>}

      <SubmitButton
        type="submit"
        disabled={status === "submitting"}
        className="btn-hero flex min-h-[44px] items-center justify-center rounded-full px-8 py-4 font-mono text-[15px] font-semibold tracking-[0.03em] text-ink disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Inquiry"}
      </SubmitButton>
    </form>
  );
}
