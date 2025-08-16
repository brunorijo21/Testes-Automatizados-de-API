describe('Testes da API RESTful com comandos Cypress', () => {
  let createdId;

  it('POST - Criar novo objeto', () => {
    const payload = {
      name: 'Notebook Dell',
      data: { ram: '16GB', ssd: '512GB' }
    };

    cy.createObject(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(payload.name);
      createdId = response.body.id;
    });
  });

  it('GET - Buscar objeto criado', () => {
    cy.getObject(createdId).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(createdId);
    });
  });

  it('PUT - Atualizar objeto', () => {
    const updatedPayload = {
      name: 'Notebook Dell XPS',
      data: { ram: '32GB', ssd: '1TB' }
    };

    cy.updateObject(createdId, updatedPayload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(updatedPayload.name);
    });
  });

  it('DELETE - Remover objeto', () => {
    cy.deleteObject(createdId).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('GET - Objeto removido não deve existir', () => {
    cy.getObjectFail(createdId).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
