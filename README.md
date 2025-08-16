#  Automação de Testes de API com Cypress

Este projeto realiza testes automatizados na API pública [Restful API](https://api.restful-api.dev), utilizando **Cypress** como framework de testes e **Mochawesome** para geração de relatórios.

---

## 🚀 Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/) — Framework de testes end-to-end
- [Mochawesome](https://github.com/adamgruber/mochawesome) — Gerador de relatórios em HTML e JSON
- Node.js — Ambiente de execução JavaScript

---

## Estrutura do Projeto
📁 cypress/ <br>
 ┣ 📁 e2e/<br>
 ┃ ┗ api.cy.js<br>
 ┣ 📁 support/<br>
 ┃ ┣ commands.js<br>
 ┃ ┗ e2e.js<br>
cypress.config.js


##  Configuração

- npm install

- npm install cypress

- npm install cypress-mochawesome-reporter --save-dev

## Executar os testes

- npx cypress run

- npx mochawesome-report-generator report.json 


## Executar em modo interativo

- npx cypress open

- Testes Implementados

Os testes cobrem o endpoint /objects da API:

 - POST — Criação de objeto

 - GET — Consulta de objeto criado

 - PUT — Atualização de objeto

 - DELETE — Remoção de objeto

 - GET após DELETE — Verificação de exclusão


Variáveis de Ambiente

baseUrl: 'https://api.restful-api.dev',
env: {
  apiPath: '/objects'
}

*  Requisitos

Node.js ≥ 14

npm ≥ 6



 - Integração com GitHub Actions


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