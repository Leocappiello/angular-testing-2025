Feature: Registro de usuarios

  Scenario: Registro exitoso de un nuevo usuario
    Given el usuario está en la página de registro
    When ingresa sus datos válidos y envía el formulario
    Then debería ver un mensaje de registro exitoso

  Scenario: Registro fallido por email ya existente
    Given el usuario está en la página de registro
    When intenta registrarse con un email existente
    Then debería ver un mensaje de error
