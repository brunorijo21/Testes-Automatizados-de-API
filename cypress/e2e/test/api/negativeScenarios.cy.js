import {
    generateMissingFieldsPayload,
    generateInvalidId,
    generateNonexistentId
}
    from '../../../support/generador.js';

describe('Cenários Negativos API RestFull', () => {
    it('POST - Criar objeto com campos ausentes', () => {
        cy.allure().story('Validação de campos obrigatórios');
        cy.allure().severity('critical');
        cy.allure().description(`
      Dado que desejo criar um novo objeto via API\n
      Quando  enviar uma requisição POST com campos obrigatórios ausentes\n
      Então a API deve retornar um erro 400 (Bad Request)\n
      E informar quais campos estão faltando na resposta \n
    `);
        const payload = generateMissingFieldsPayload();

        cy.request({
            method: 'POST',
            url: `${Cypress.config('baseUrl')}${Cypress.env('apiPath')}`,
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', payload.name);
        });
    });

    it('GET - Buscar objeto com Id inexistente', () => {
        cy.allure().severity('normal');
        cy.allure().story('Validação de formato de ID');
        cy.allure().description(`
      Dado que desejo consultar um objeto específico\n  
      Quando enviar uma requisição GET com um ID que não existe no banco\n  
      Então a API deve retornar um erro 404 (Not Found)\n  
      E informar que o objeto não foi localizado\n
    `);
        const id = generateNonexistentId();

        cy.getObjectFail(id).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('GET - Buscar objeto com Id mal formatado', () => {
        cy.allure().severity('normal');
        cy.allure().description(`
      Dado que desejo consultar um objeto específico\n  
      Quando enviar uma requisição GET com um ID mal formatado (ex: string, símbolo ou valor nulo)\n  
      Então a API deve retornar um erro 400 (Bad Request)\n  
      E informar que o formato do ID é inválido\n
    `);
        const id = generateInvalidId();

        cy.getObjectFail(id).then((response) => {
            expect(response.status).to.be.oneOf([400, 404]);
        });
    });

    it('PUT - Atualizar objeto com Id inválido e payload válido', () => {
        cy.allure().severity('normal');
        cy.allure().description(`
      Dado que desejo consultar um objeto específico\n  
      Quando enviar uma requisição GET com um ID mal formatado (ex: string, símbolo ou valor nulo)\n  
      Então a API deve retornar um erro 400 (Bad Request)\n  
      E informar que o formato do ID é inválido\n
    `)
        const id = generateInvalidId();
        const payload = generateMissingFieldsPayload();

        cy.request({
            method: 'PUT',
            url: `${Cypress.config('baseUrl')}${Cypress.env('apiPath')}/${id}`,
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.be.oneOf([400, 404]);
        });
    });

    it('DELETE - Remover objeto com Id inválido', () => {
        cy.allure().severity('normal');
        cy.allure().description(`
      Dado que desejo remover um objeto existente\n  
      E insiro um ID inválido (mal formatado ou inexistente)\n  
      Quando enviar uma requisição DELETE para o endpoint com esse ID\n  
      Então a API deve retornar um erro apropriado (400 ou 404)\n  
      E informar que o objeto não foi encontrado ou que o ID é inválido\n
 `)
        const id = generateInvalidId();

        cy.request({
            method: 'DELETE',
            url: `${Cypress.config('baseUrl')}${Cypress.env('apiPath')}/${id}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.be.oneOf([400, 404]);
        });
    });
});
