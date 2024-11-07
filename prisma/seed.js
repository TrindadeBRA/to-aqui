import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  faker.locale = 'pt_BR';
  const quantity = 10;
  const fakeUsers = Array.from({ length: quantity }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    image: faker.image.avatar(),
    password: faker.internet.password(),
    role: 'USER',
    stripeCustomerId: faker.string.uuid(),
    stripeSubscriptionId: faker.string.uuid(),
    stripeSubscriptionStatus: faker.string.uuid(),
    stripePriceId: faker.string.uuid(),
  }));
  
  await prisma.user.createMany({
    data: fakeUsers.map(user => ({
      name: user.name,
      email: user.email,
      image: user.image,
      password: user.password,
      role: user.role,
      stripeCustomerId: user.stripeCustomerId,
      stripeSubscriptionId: user.stripeSubscriptionId,
      stripeSubscriptionStatus: user.stripeSubscriptionStatus,
      stripePriceId: user.stripePriceId,
    })),
    skipDuplicates: true,
  });

  console.log(`Seed complete: ${quantity} fake users created.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
