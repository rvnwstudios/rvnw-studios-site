import { z } from "zod";

// The six locked verticals, plus a catch-all so the dropdown doesn't force
// a bad fit for inquiries outside the roster (added 2026-08-18).
export const VERTICALS = [
  "DTC",
  "E-commerce",
  "Startups",
  "Restaurants & Hospitality",
  "Sports & Fitness",
  "Service-based",
  "Other",
] as const;

export const DISCIPLINES = [
  "Strategy",
  "Creative & Design",
  "Dev/Engineering",
  "Advertising",
  "Digital Experience",
  "Growth & Retention",
] as const;

// Real ranges, not open text — a budget signal is what lets a proposal
// actually match the work instead of guessing (Start A Project Page.md).
export const BUDGET_RANGES = [
  "Under $5k",
  "$5k – $15k",
  "$15k – $40k",
  "$40k – $100k",
  "$100k+",
  "Not sure yet",
] as const;

export const TIMELINES = [
  "ASAP",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "No fixed timeline",
] as const;

const noLineBreaks = (s: string) => !/[\r\n]/.test(s);

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your name.")
    .max(200, "Keep it under 200 characters.")
    .refine(noLineBreaks, "Remove line breaks."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email.")
    .email("Enter a valid email address.")
    .max(320)
    .refine(noLineBreaks, "Remove line breaks."),
  projectDetails: z
    .string()
    .trim()
    .min(1, "Tell us what you're building.")
    .max(5000, "Keep it under 5000 characters."),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  vertical: z.enum(VERTICALS).optional().or(z.literal("")),
  disciplines: z.array(z.enum(DISCIPLINES)).optional().default([]),
  budget: z.enum(BUDGET_RANGES).optional().or(z.literal("")),
  timeline: z.enum(TIMELINES).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const REQUIRED_FIELDS = ["name", "email", "projectDetails"] as const;
