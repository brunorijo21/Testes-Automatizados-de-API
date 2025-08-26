#  Automação de Testes de API com Cypress

Este projeto realiza testes automatizados na API pública [Restful API](https://api.restful-api.dev), utilizando **Cypress** como framework de testes e **Mochawesome** para geração de relatórios.

---

## Tecnologias Utilizadas

Cypress — Framework de testes end-to-end  
Mochawesome — Gerador de relatórios em HTML e JSON  
Allure — Plataforma avançada de relatórios com visual interativo e integração com CI/CD  
Node.js — Ambiente de execução JavaScript  

---

## Estrutura do Projeto
```plaintext
cypress/
├── e2e/<br>
│   └── api/<br>                     # Pasta dedicada aos testes de API
│       ├── negativeScenarios.cy.js # Testes negativos (validações, erros)
│       ├── positivoScenarios.cy.js # Testes positivos (fluxos esperados)
├── support/
│   ├── commands.js                 # Comandos customizados do Cypress
│   ├── e2e.js                      # Arquivo de suporte global para testes
│   └── generator.js               # Geração de dados dinâmicos (ex: faker)
cypress.config.js                  # Configuração principal do Cypress
package.json                       # Dependências e scripts do projeto

```` 

##  Configuração

- npm install

- npm install cypress

- npm install cypress-mochawesome-reporter --save-dev

- npm install --save-dev husky

## Exemplos de funções usadas dinâmicas :

Generador.js

export function generateValidPayload() {

    return {
        name: faker.commerce.productName(),
        data: {
            ram: `${faker.number.int({ min: 4, max: 64 })}GB`,
            ssd: `${faker.number.int({ min: 128, max: 2048 })}GB`
        }
    };
}
export function generateInvalidTypesPayload() {

    return {
        name: faker.number.int(), // deveria ser string
        data: {
            ram: faker.internet.email(), // tipo errado
            ssd: null
        }
    };
}

Commands:

Cypress.Commands.add('createObject', (payload) => {

    return cy.request('POST', `${Cypress.config('baseUrl')}${Cypress.env('apiPath')}`, payload);
});


## Executar os testes

- npx cypress run

- npx mochawesome-report-generator report.json 

-  npm test :  executa os testes e gera o relatório do allure de forma automática


## Executar em modo interativo

- npx cypress open

- Testes Implementados

# Os testes cobrem o endpoint /objects da API:

Cenários Positivos: Verificam se a API responde corretamente a requisições.

Cenários Negativos: Validam o comportamento da API diante de erros, dados inválidos ou requisições malformadas


## Variáveis de Ambiente

baseUrl: 'https://api.restful-api.dev',
env: {
  apiPath: '/objects'
}

##  Requisitos

Node.js ≥ 14

npm ≥ 6



 ##  Integração com GitHub Actions


 Criar o arquivo de workflow

Crie o seguinte arquivo:

Conteúdo do workflow

```bash
name: Cypress API Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  run-api-tests:
    runs
-on: ubuntu-latest
    steps:
      - name: Checkout do código
        uses: actions/checkout@v3

      - name: Instalar Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Instalar dependências
        run: npm install

      - name: Executar testes Cypress
        run: npx cypress run

      - name:  Salvar relatório Mochawesome
        uses: actions/upload-artifact@v3
        with:
          name: mochawesome-report
          path: cypress/reports


 - Resultado na pipeline

Os testes serão executados automaticamente em cada push ou PR na branch main.

O relatório gerado pelo Mochawesome será salvo como artefato e poderá ser baixado diretamente pela interface do GitHub Actions.
