import { generateValidPayload } from '../../../support/generador';

describe('Cenários Positivos da API RestFull', () => {
  let createdId;
  let originalPayload;
  let updatedPayload;

  it('POST - Criar novo objeto dinâmico', () => {
    cy.allure().severity('critical');
    cy.allure().description(`
    ## Cenário: Criar novo objeto dinâmico

      Dado que o cliente deseja registrar um novo objeto na base de dados\n  
      Quando ele envia uma requisição POST com dados válidos gerados dinamicamente\n  
      Então a API deve retornar um status 200 (OK)\n  
      E incluir no corpo da resposta os dados enviados e o ID do novo objeto\n
    `);

    originalPayload = generateValidPayload();

    cy.createObject(originalPayload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(originalPayload.name);
      createdId = response.body.id;
    });
  });

  it('GET - Buscar objeto criado', () => {
    cy.allure().severity('critical');
    cy.allure().description(`
    ## Cenário: Buscar objeto criado

    Dado que um objeto foi previamente criado via requisição POST\n
    Quando o cliente envia uma requisição GET para buscar esse objeto pelo ID\n
    Então a API deve retornar status 200(OK)\n
    E o corpo da resposta deve conter os dados corretos do objeto criado\n
`);
    cy.getObject(createdId).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(createdId);
      expect(response.body.name).to.eq(originalPayload.name);
    });
  });

  it('PUT - Atualizar objeto com novos dados', () => {
    cy.allure().severity('critical');
    cy.allure().description(`
   ## Cenário: Atualizar objeto com novos dados válidos

    Dado que um objeto já foi criado na base de dados\n
    Quando eu envio uma requisição PUT com novos dados\n
    Então a API deve retornar o status 200\n
    E o corpo da resposta deve conter os dados atualizados\n
   `);
    updatedPayload = generateValidPayload();
    cy.updateObject(createdId, updatedPayload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(updatedPayload.name);
    });
  });

  it('DELETE - Remover objeto', () => {
    cy.allure().severity('critical');
    cy.allure().description(`
    ## Cenário: Remover objeto com sucesso

    Dado que um objeto foi criado e está disponível na base\n
    Quando eu envio uma requisição para o endpoint"\n
    Então a API deve retornar o status 200\n
    E o objeto não deve mais ser encontrado em consultas futuras
    `);
    cy.deleteObject(createdId).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('GET - Verificar que o objeto removido não existe', () => {
    cy.allure().severity('normal');
    cy.allure().description(`
    ## Cenário: Verificar que o objeto removido não existe

  Dado que um objeto foi previamente criado e removido da base de dados\n  
  Quando o cliente envia uma requisição GET para o endpoint\` \n
  Então a API deve retornar status **404 (Not Found)** \n 
  E o corpo da resposta deve indicar que o objeto não foi encontrado\n
 `);
    cy.getObjectFail(createdId).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
