import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.createMany({
    data: [
      {
        name: "User",
        email: "user@flc.in",
        password: "user@123",
      },
      {
        name: "Admin",
        email: "admin@flc.in",
        password: "admin@123",
        role: "ADMIN",
      },
    ],
  });

  await prisma.puzzle.createMany({
    data: [
      {
        name: "Key in Lock",
        route: "vpzg4DDdlfPPPTsp",
        minimumPoints: 0,
        points: 0,
        solution: "Key in Lock",
      },
      {
        name: "Button behind Image",
        route: "fFcM0fQmpEqbtW1W",
        minimumPoints: 0,
        points: 0,
        solution: "Button behind Image",
      },
      {
        name: "Million Checkbox",
        route: "5YwGNisBqwJE7uM8",
        minimumPoints: 0,
        points: 0,
        solution: "Million Checkbox",
      },
      {
        name: "QR Code Scramble",
        route: "7xQpmDiQf7fMDEan",
        minimumPoints: 0,
        points: 0,
        solution: "QR Code Scramble",
      },
      {
        name: "Excel Slope",
        route: "iP7FYmV7ypzJuk-Q",
        minimumPoints: 0,
        points: 0,
        solution: "Excel Slope",
      },
      {
        name: "mirror text",
        route: "c8f9d09e5dfb7c66",
        minimumPoints: 0,
        points: 0,
        solution: "mirror tex",
      },
      {
        name: "image processing",
        route: "65951defa4005f07",
        minimumPoints: 0,
        points: 0,
        solution: "image processing",
      },
      {
        name: "code Snippet",
        route: "be0qt6jmquy2b36j",
        minimumPoints: 0,
        points: 0,
        solution: "code Snippet",
      },
      {
        name: "Find Imposter",
        route: "2gfwlaz3zf9r00gp",
        minimumPoints: 0,
        points: 0,
        solution: "Find Imposter",
      },
      // be0qt6jmquy2b36j
    ],
  });
};

main()
  .then(() => console.log("Seeded successfully, file: prisma/seed.ts"))
  .catch((e) => console.log(e))
  .finally(() => void prisma.$disconnect());
