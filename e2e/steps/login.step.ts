import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";

//
// 🔹 ADMIN LOGIN
//
Given("el admin está en la página de login", async function (this: CustomWorld) {
  await this.page.goto("http://localhost:4200/login");
  await this.page.waitForLoadState("networkidle");
});

When("introduce sus credenciales válidas", async function (this: CustomWorld) {
  await this.page.fill("#email", "admin@example.com");
  await this.page.fill("#password", "admin123");
  await this.page.click("button[type='submit']");
});

Then("debería ver el panel principal", async function (this: CustomWorld) {
  // Espera a que se muestre el mat-card con el título "Listado de Mascotas"
  const listadoMascotas = this.page.locator("mat-card-title", { hasText: "Listado de Mascotas" });
  await expect(listadoMascotas).toBeVisible({ timeout: 10000 });
});


//
// 🔹 USER LOGIN
//
Given("el usuario está en la página de login", async function (this: CustomWorld) {
  await this.page.goto("http://localhost:4200/login");
  await this.page.waitForLoadState("networkidle"); // opcional
});

When("introduce sus credenciales de usuario válidas", async function (this: CustomWorld) {
  await this.page.fill("#email", "leonelcappiellao@gmail.com");
  await this.page.fill("#password", "testPassword");
  await this.page.click("button[type='submit']");
});

Then("debería ver el panel principal de usuario", async function (this: CustomWorld) {
  // Espera a que se muestre el mat-card con el título "Agregar Mascota"
  const agregarMascota = this.page.locator("mat-card-title", { hasText: "Agregar Mascota" });
  // await expect(agregarMascota).toBeVisible();
  await expect(agregarMascota).toBeVisible({ timeout: 3000 });
});

//
// 🔹 CAMPOS VACÍOS
//
When("intenta enviar el formulario sin email", async function (this: CustomWorld) {
  await this.page.fill("#email", "a");
  await this.page.fill("#email", "");
  await this.page.fill("#password", "testPassword");
});

Then("debería ver un mensaje de error por email requerido", async function (this: CustomWorld) {
  // Buscar cualquier <mat-error> que contenga el texto "El email es obligatorio"
  const emailError = this.page.locator("mat-error", { hasText: "El email es obligatorio" });
  // await expect(emailError).toBeVisible();
  await expect(emailError).toBeVisible({ timeout: 3000 });
});

When("intenta enviar el formulario sin contraseña", async function (this: CustomWorld) {
  await this.page.fill("#email", "leonelcappiellao@gmail.com");
  await this.page.fill("#password", "a");
  await this.page.fill("#password", "");
  await this.page.click("#email");
  await this.page.setDefaultTimeout(2000);
});

Then("debería ver un mensaje de error por contraseña requerida", async function (this: CustomWorld) {
  // Buscar cualquier <mat-error> que contenga el texto "El email es obligatorio"
  const emailError = this.page.locator("mat-error", { hasText: "La contraseña es obligatoria" });
  // await expect(emailError).toBeVisible();
  await expect(emailError).toBeVisible({ timeout: 3000 });
});
