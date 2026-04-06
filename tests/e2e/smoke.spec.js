import { expect, test } from "@playwright/test";

const APP_ACCESS_STORAGE_KEY = "topdance-app-access";

async function grantAccess(page, role = "admin") {
  await page.addInitScript(
    ({ key, value }) => {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    {
      key: APP_ACCESS_STORAGE_KEY,
      value: {
        mode: "login",
        grantedAt: "2026-04-05T02:30:00.000Z",
        userId: "USR-QA-1",
        role,
        displayName: "QA User",
        identifier: "qa@topdance.app"
      }
    }
  );
}

test("smoke: welcome открывается для неавторизованного пользователя", async ({ page }) => {
  await page.goto("/home");
  await expect(page).toHaveURL(/\/welcome$/);
  await expect(page.getByRole("button", { name: /Log In/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Create Account/i })).toBeVisible();
});

test("smoke: create account открывает экран регистрации", async ({ page }) => {
  await page.goto("/welcome");
  await page.getByRole("button", { name: /Create Account/i }).click();
  await expect(page.getByRole("heading", { name: /Create Account/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Welcome to TOP\.DANCE/i })).toBeVisible();
  await expect(page.getByLabel(/First Name/i)).toBeVisible();
  await expect(page.getByLabel(/Last Name/i)).toBeVisible();
  await expect(page.getByLabel(/Phone Number/i)).toBeVisible();
  await expect(page.getByLabel(/Club Code/i)).toBeVisible();
});

test("smoke: log in открывает экран авторизации", async ({ page }) => {
  await page.goto("/welcome");
  await page.getByRole("button", { name: /^Log In$/i }).click();
  await expect(page.getByRole("heading", { name: /^Log In$/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Welcome Back/i })).toBeVisible();
  await expect(page.getByLabel(/First Name/i)).toBeVisible();
  await expect(page.getByLabel(/Last Name/i)).toBeVisible();
  await expect(page.getByLabel(/Phone Number/i)).toBeVisible();
  await expect(page.getByLabel(/Club Code/i)).toBeVisible();
  await expect(page.getByText(/Don't have an account\?/i)).toBeVisible();
  await expect(page.locator("form").getByRole("button", { name: /Create Account/i })).toBeVisible();
});

test("smoke: главная открывается после авторизации", async ({ page }) => {
  await grantAccess(page);
  await page.goto("/home");
  await expect(page).toHaveURL(/\/home$/);
  await expect(
    page.getByRole("button", { name: /ПОДРОБНЕЕ О РУКОВОДИТЕЛЕ|MEHR ÜBER DIE LEITUNG/i })
  ).toBeVisible();
});

test("smoke: CRM открывается после авторизации", async ({ page }) => {
  await grantAccess(page);
  await page.goto("/crm");
  await expect(page).toHaveURL(/\/crm$/);
  await expect(page.getByText(/Page not found/i)).toHaveCount(0);
  await expect(page.getByText(/CRM-платформа|CRM-Plattform/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: /Дашборд|Dashboard/i })).toBeVisible();
});

test("smoke: выход из профиля возвращает на welcome", async ({ page }) => {
  await grantAccess(page);
  await page.goto("/profile");
  await expect(page).toHaveURL(/\/profile$/);
  await page.getByRole("button", { name: /Выйти|Abmelden/i }).click();
  await expect(page).toHaveURL(/\/welcome$/);
  await expect(page.getByRole("button", { name: /Log In/i })).toBeVisible();
});

test("smoke: student не может открыть admin вкладку", async ({ page }) => {
  await grantAccess(page, "student");
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/home$/);
});
