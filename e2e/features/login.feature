Feature: Login de usuarios

  Scenario: El admin inicia sesión correctamente
    Given el admin está en la página de login
    When introduce sus credenciales válidas
    Then debería ver el panel principal

  Scenario: El usuario estándar inicia sesión correctamente
    Given el usuario está en la página de login
    When introduce sus credenciales de usuario válidas
    Then debería ver el panel principal de usuario

  Scenario: El usuario intenta iniciar sesión sin email
    Given el usuario está en la página de login
    When intenta enviar el formulario sin email
    Then debería ver un mensaje de error por email requerido

  Scenario: El usuario intenta iniciar sesión sin contraseña
    Given el usuario está en la página de login
    When intenta enviar el formulario sin contraseña
    Then debería ver un mensaje de error por contraseña requerida
