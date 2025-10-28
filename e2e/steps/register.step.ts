import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";

function generateRandom8DigitNumber() {
  const min = 10000000; // Smallest 8-digit number
  const max = 99999999; // Largest 8-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Given("el usuario está en la página de registro", async function (this: CustomWorld) {
    await this.page.goto("http://localhost:4200/login");
    await this.page.click("#hasaccount");
    await this.page.waitForLoadState("networkidle");
});

// Registro exitoso
When("ingresa sus datos válidos y envía el formulario", async function (this: CustomWorld) {
  const unique = Date.now();
  await this.page.fill('[formcontrolname="name"]', 'Leo');
  await this.page.fill('[formcontrolname="surname"]', 'Cappiellao');
  await this.page.fill('[formcontrolname="email"]', `nuevo${unique}@test.com`);
  await this.page.fill('[formcontrolname="password"]', 'Password123');
  await this.page.fill('[formcontrolname="address"]', 'Calle Falsa 123');
  await this.page.fill('[formcontrolname="dni"]', generateRandom8DigitNumber().toString());
  await this.page.fill('[formcontrolname="postalCode"]', '5000');
  await this.page.getByRole('button', { name: 'Registrarse' }).click();
});

Then("debería ver un mensaje de registro exitoso", async function (this: CustomWorld) {
  // Ajustá el selector a cómo mostrás el éxito (snackbar, alert, etc.)
});

// Registro con email existente
When("intenta registrarse con un email existente", async function (this: CustomWorld) {
  await this.page.fill('[formcontrolname="name"]', 'Leo');
  await this.page.fill('[formcontrolname="surname"]', 'Cappiellao');
  await this.page.fill('[formcontrolname="email"]', 'leonelcappiellao@gmail.com'); // existente
  await this.page.fill('[formcontrolname="password"]', 'Password123');
  await this.page.fill('[formcontrolname="address"]', 'Calle Falsa 123');
  await this.page.fill('[formcontrolname="dni"]', '12345678');
  await this.page.fill('[formcontrolname="postalCode"]', '5000');
  await this.page.getByRole('button', { name: 'Registrarse' }).click();
});

Then("debería ver un mensaje de error", async function (this: CustomWorld) {
  const err = this.page.locator('.error', { hasText: 'No pudimos crear tu cuenta. Intenta nuevamente.' });
  await expect(err).toBeVisible({ timeout: 10000 });
});


// import { Given, Then, When } from "@cucumber/cucumber";
// import { expect } from "@playwright/test";
// import { CustomWorld } from "../support/world";

// //
// // 🔹 REGISTRO EXITOSO
// //
// Given("el usuario está en la página de registro", async function (this: CustomWorld) {
//   await this.page.goto("http://localhost:4200/login");
//   await this.page.click("#hasaccount");
//   await this.page.waitForLoadState("networkidle");
// });

// When("ingresa sus datos válidos y envía el formulario", async function (this: CustomWorld) {
//   // Completar campos del formulario de registro
//   const timestamp = Date.now(); // para generar un email único
//   await this.page.fill("#email", `nuevo${timestamp}@test.com`);
//   await this.page.fill("#password", "Password123");
//   await this.page.fill("#confirmPassword", "Password123");

//   // Si tenés más campos:
//   // await this.page.fill("#nombre", "Usuario Prueba");

//   await this.page.click("button[type='submit']");
// });

// Then("debería ver un mensaje de registro exitoso", async function (this: CustomWorld) {
//   const successMessage = this.page.locator("mat-snack-bar-container, .alert-success", {
//     hasText: "Registro exitoso"
//   });
//   await expect(successMessage).toBeVisible({ timeout: 10000 });
// });

// //
// // 🔹 REGISTRO CON EMAIL EXISTENTE
// //
// When("intenta registrarse con un email existente", async function (this: CustomWorld) {
//   await this.page.fill("#email", "admin@example.com"); // existente
//   await this.page.fill("#password", "Password123");
//   await this.page.fill("#confirmPassword", "Password123");
//   await this.page.click("button[type='submit']");
// });

// Then(
//   "debería ver un mensaje de error indicando que el email ya está registrado",
//   async function (this: CustomWorld) {
//     const errorMessage = this.page.locator("mat-error, .alert-danger, .error-message", {
//       hasText: "ya está registrado"
//     });
//     await expect(errorMessage).toBeVisible({ timeout: 10000 });
//   }
// );
