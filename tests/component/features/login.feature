Feature: Login

Scenario: Deve efetuar login com sucesso e redicionar para dashboard
    Given um usuário que "possua_cadastro"
    And acessar a página de login
    And preencher campo usuário com valor "admin"
    And preencher campo senha com valor "12345"
    When quando precionsar o botão de entrar
    Then devo visualizar a tela de "dashboard"

Scenario: Deve mostar mensagem de erro padrão - oauth
    Given um usuário que "tentativa_login_erro_ao_gerar_token"
    And acessar a página de login
    And preencher campo usuário com valor "admin"
    And preencher campo senha com valor "12345"
    When quando precionsar o botão de entrar
    Then devo visualizar a mensagem "Usuário ou senha Inválido"

Scenario: Deve mostar mensagem de erro padrão - user
    Given um usuário que "tentativa_login_erro_user"
    And acessar a página de login
    And preencher campo usuário com valor "admin"
    And preencher campo senha com valor "12345"
    When quando precionsar o botão de entrar
    Then devo visualizar a mensagem "Usuário ou senha Inválido"