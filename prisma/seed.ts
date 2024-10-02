import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.puzzle.createMany({
    data: [
      {
        minimumPoints: 1,
        points: 1,
        puzzleType: "POINTS",
        route: "millionCheckboxes",
        solution: "checkbox 24",
      },
    ],
  });
};

main()
  .then(() => console.log("Seeded successfully, file: prisma/seed.ts"))
  .catch((e) => console.log(e))
  .finally(() => void prisma.$disconnect());
