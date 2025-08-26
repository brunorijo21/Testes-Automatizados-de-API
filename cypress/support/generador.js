import { faker } from '@faker-js/faker';

export function generateValidPayload() {
    return {
        name: faker.commerce.productName(),
        data: {
            ram: `${faker.number.int({ min: 4, max: 64 })}GB`,
            ssd: `${faker.number.int({ min: 128, max: 2048 })}GB`
        }
    };
}

export function generateMissingFieldsPayload() {
    return {
        name: faker.commerce.productName()
        // campo "data" ausente
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

export function generateInvalidId() {
    return faker.string.alphanumeric(10) + '@@@';
}

export function generateNonexistentId() {
    return faker.number.int({ min: 999999, max: 9999999 }).toString();
}
