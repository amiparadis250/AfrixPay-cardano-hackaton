import { PrismaClient } from '@prisma/client'
import { AFRICAN_CURRENCIES } from '../lib/currency'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Seed currencies
  for (const [code, info] of Object.entries(AFRICAN_CURRENCIES)) {
    await prisma.currency.upsert({
      where: { code },
      update: {
        name: info.name,
        country: info.country,
        rateToUSD: info.rateToUSD,
      },
      create: {
        code,
        name: info.name,
        country: info.country,
        rateToUSD: info.rateToUSD,
      },
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })