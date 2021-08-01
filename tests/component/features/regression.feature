Feature: Login

Scenario: Deve validar a regressão visual da tela de erro
    Given um usuário que "tentativa_login_erro_user"
    And acessar a página de login
    When quando precionsar o botão de entrar
    Then devo validar a tela "erro"

Scenario: Deve validar a regressão visual da tela de login
    Given um usuário que "possua_cadastro"
    And acessar a página de login
    Then devo validar a tela "login"