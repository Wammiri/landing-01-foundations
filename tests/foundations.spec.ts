import { expect, test, type Page } from "@playwright/test";

/**
 * Behavioral verification for Foundations, rung 3 of the verification ladder.
 * The ten assertions are specified in BATCH_PLAN.md under B1.
 */

const trackTransform = (page: Page) =>
  page.evaluate(() => {
    const track = document.querySelector('[data-testid="ticker-track"]');
    return track ? getComputedStyle(track).transform : null;
  });

const readDataLayer = (page: Page) =>
  page.evaluate(() => {
    const layer = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? [];
    return layer.map((entry) => JSON.stringify(Array.from(entry as ArrayLike<unknown>)));
  });

test.describe("Foundations landing page", () => {
  test("1. loads with the spec H1 and an amber `before`", async ({ page }) => {
    await page.goto("/");

    const h1 = page.locator("h1");
    await expect(h1).toHaveText("Understand crypto before you risk a dollar.");

    const amber = h1.locator("span", { hasText: "before" });
    await expect(amber).toHaveText("before");
    await expect(amber).toHaveCSS("color", "rgb(255, 176, 32)");
  });

  test("2. ticker exists and its transform advances", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[data-testid="ticker-track"]')).toBeVisible();

    const first = await trackTransform(page);
    await page.waitForTimeout(900);
    const second = await trackTransform(page);

    expect(first).not.toBeNull();
    expect(second).not.toEqual(first);
  });

  test("3. ticker pauses while the band is hovered", async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-testid="ticker-band"]').hover();
    await page.waitForTimeout(300);

    const first = await trackTransform(page);
    await page.waitForTimeout(900);
    const second = await trackTransform(page);

    expect(second).toEqual(first);
  });

  test("4. counter reaches 12,400 with no layout shift", async ({ page }) => {
    await page.goto("/");

    const counter = page.getByLabel("12,400 careful investors");
    const before = await counter.boundingBox();

    await expect(counter).toHaveText("12,400", { timeout: 5000 });
    const after = await counter.boundingBox();

    expect(before?.width).toBeCloseTo(after?.width ?? -1, 1);
  });

  test("5. an invalid email does not reach the success state", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Email address").fill("not-an-email");
    await page.getByRole("button", { name: "Send me Day 1 free" }).click();

    await expect(page.getByText("Done. Day 1 is on its way.")).toHaveCount(0);
    // Scoped to the form's own error: Next.js ships a route announcer that
    // also carries role="alert".
    await expect(page.locator("#email-error")).toBeVisible();
  });

  test("6. a valid email swaps to the success copy", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Email address").fill("reader@example.com");
    await page.getByRole("button", { name: "Send me Day 1 free" }).click();

    await expect(page.getByText("Done. Day 1 is on its way.")).toBeVisible();
  });

  test("7. dataLayer records cta_click and course_signup", async ({ page }) => {
    await page.goto("/");

    // gtag loads afterInteractive, so wait for it before exercising the CTAs.
    await page.waitForFunction(() => typeof (window as unknown as { gtag?: unknown }).gtag === "function");
    await page.getByRole("link", { name: "Start the free course" }).click();
    await expect
      .poll(async () => (await readDataLayer(page)).some((e) => e.includes("cta_click")))
      .toBe(true);

    await page.getByLabel("Email address").fill("reader@example.com");
    await page.getByRole("button", { name: "Send me Day 1 free" }).click();
    await expect
      .poll(async () => (await readDataLayer(page)).some((e) => e.includes("course_signup")))
      .toBe(true);
  });

  /*
    Reaching dataLayer is not the same as reaching GA4. An earlier build queued
    course_signup and never transmitted it, because a cta_click firing in the
    same tick starved it inside GA4's batching window. This asserts the request
    actually leaves the browser.
  */
  test("7b. course_signup is transmitted to GA4, not just queued", async ({ page }) => {
    const sent: string[] = [];
    page.on("request", (request) => {
      const url = request.url();
      if (url.includes("/g/collect")) {
        const event = new URL(url).searchParams.get("en");
        if (event) sent.push(event);
      }
    });

    await page.goto("/");
    await page.waitForFunction(() => typeof (window as unknown as { gtag?: unknown }).gtag === "function");

    await page.getByLabel("Email address").fill("reader@example.com");
    await page.getByRole("button", { name: "Send me Day 1 free" }).click();

    await expect.poll(() => sent.includes("course_signup"), { timeout: 15000 }).toBe(true);
  });

  test("8. no horizontal overflow at 390px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("9. reduced motion freezes the ticker and the counter", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");

    await expect(page.getByLabel("12,400 careful investors")).toHaveText("12,400");

    const first = await trackTransform(page);
    await page.waitForTimeout(900);
    const second = await trackTransform(page);
    expect(second).toEqual(first);

    await context.close();
  });

  test("10. footer carries the linked concept credit", async ({ page }) => {
    await page.goto("/");

    const credit = page.getByRole("contentinfo");

    // The credit is uppercased by CSS (mono-label), so match case insensitively
    // against the correctly cased source text.
    await expect(credit).toContainText(/concept build/i);
    await expect(credit).toContainText(/designed and built by isaac olorode/i);

    const link = credit.getByRole("link", { name: "isaac.aperio.finance/landing" });
    await expect(link).toHaveAttribute("href", "https://isaac.aperio.finance/landing");

    // It must also stay legible: not restyled into invisibility.
    await expect(credit.locator("p").nth(1)).toBeVisible();
  });
});
