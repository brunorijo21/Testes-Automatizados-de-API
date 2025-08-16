Cypress.Commands.add('createObject', (payload) => {
    return cy.request('POST', `${Cypress.config('baseUrl')}${Cypress.env('apiPath')}`, payload);
});

Cypress.Commands.add('getObject', (id) => {
    return cy.request(`${Cypress.config('baseUrl')}${Cypress.env('apiPath')}/${id}`);
});

Cypress.Commands.add('updateObject', (id, payload) => {
    return cy.request('PUT', `${Cypress.config('baseUrl')}${Cypress.env('apiPath')}/${id}`, payload);
});

Cypress.Commands.add('deleteObject', (id) => {
    return cy.request('DELETE', `${Cypress.config('baseUrl')}${Cypress.env('apiPath')}/${id}`);
});

Cypress.Commands.add('getObjectFail', (id) => {
    return cy.request({
        url: `${Cypress.config('baseUrl')}${Cypress.env('apiPath')}/${id}`,
        failOnStatusCode: false
    });
});
