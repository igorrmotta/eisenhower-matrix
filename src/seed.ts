import * as faker from 'faker';
import { prisma, CardCreateInput, EisenMatrixCreateOneInput } from './generated/prisma-client';

function createCard(): CardCreateInput {
  return { title: faker.random.word(), content: faker.lorem.paragraph() };
}

function createMatrix(): EisenMatrixCreateOneInput {
  return {
    create: {
      do: {
        create: [createCard(), createCard(), createCard()]
      },
      decide: {
        create: [createCard(), createCard(), createCard()]
      },
      delegate: {
        create: [createCard(), createCard(), createCard()]
      },
      delete: {
        create: [createCard(), createCard(), createCard()]
      }
    }
  };
}

// A `main` function so that we can use async/await
async function main() {
  // Create a new user with a new post
  await prisma.createUser({
    name: 'Tim',
    matrix: createMatrix()
  });
}

main().catch(e => console.error(e));
