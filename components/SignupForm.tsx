"use client";

import { useState } from "react";
import { track, trackCta } from "@/lib/track";

/*
  One regex, no validation library. Deliberately permissive about the local
  part and strict about the shape that actually matters: something, an @,
  a dotted domain, no whitespace anywhere.
*/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackCta("final");

    const value = email.trim();
    if (!EMAIL.test(value)) {
      setError("Enter a valid email address.");
      return;
    }

    setError(null);
    track("course_signup");

    /*
      In production the address would be posted to an ESP here (Brevo,
      ConvertKit) and the success state would wait on that response. This is a
      concept build: nothing is transmitted, nothing is stored, and the value
      is discarded with the component. See DECISIONS.md D-04.
    */
    setSubmitted(true);
  };

  return (
    <section id="signup" className="border-t border-line">
      <div className="mx-auto max-w-[1080px] px-6 py-16 sm:py-28">
        <p className="mono-label text-[0.72rem] text-amber">Start today</p>
        <h2 className="mt-5 font-display text-3xl font-bold tracking-[-0.02em] sm:text-[2.6rem]">
          Learn the fundamentals first.
        </h2>

        {submitted ? (
          <p
            role="status"
            className="mt-10 font-display text-xl font-medium text-amber sm:text-2xl"
          >
            Done. Day 1 is on its way.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-10 max-w-[34rem]">
            <label htmlFor="email" className="mono-label block text-[0.7rem] text-muted">
              Email address
            </label>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError(null);
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "email-error" : undefined}
                className="min-w-0 flex-1 rounded-[6px] border border-line bg-panel px-4 py-3.5 font-mono text-[0.9rem] text-text placeholder:text-muted/60 focus:border-amber/60"
              />
              <button
                type="submit"
                className="cta-amber shrink-0 rounded-[6px] bg-amber px-6 py-3.5 font-semibold text-bg transition-[transform,filter] duration-150 hover:-translate-y-px hover:brightness-110"
              >
                Send me Day 1 free
              </button>
            </div>

            {error ? (
              <p id="email-error" role="alert" className="mt-3 text-[0.85rem] text-amber">
                {error}
              </p>
            ) : null}

            <p className="mt-5 text-[0.85rem] text-muted">Free forever. Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </section>
  );
}
