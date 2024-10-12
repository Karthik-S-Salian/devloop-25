import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

const puzzles = [
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
    route: "Vmtl46XxjZ2UevMG",
    minimumPoints: 0,
    points: 0,
    solution: "QR Code Scramble",
  },
  {
    name: "Excel Slope",
    route: "iP7FYmV7ypzJuk-Q",
    minimumPoints: 0,
    points: 0,
    solution: "4.9157",
  },
  {
    name: "Who am i?",
    route: "5AMhMqizo3RSPYEg",
    minimumPoints: 0,
    points: 0,
    solution: "Mona Lisa",
  },
  {
    name: "Login IP",
    route: "JLWZAK-cOUz386Iu",
    minimumPoints: 0,
    points: 0,
    solution: "Internet Login IP",
  },
  {
    name: "Mirror Text",
    route: "K7uCVTJroiuY1Xj9",
    minimumPoints: 0,
    points: 0,
    solution: "Mirror Ukranian Text",
  },
  {
    name: "Image Processing",
    route: "U9EMRTZwGtL2edaC",
    minimumPoints: 0,
    points: 0,
    solution: "Image Processing",
  },
  {
    name: "Morose Song",
    route: "Izi_VG6bwjZqZneq",
    minimumPoints: 0,
    points: 0,
    solution: "Frequency Morose",
  },
  {
    name: "Docker Logo Hidden",
    route: "nxUEWT6sjq3JWizz",
    minimumPoints: 0,
    points: 0,
    solution: "Docker Logo Hidden",
  },
  {
    name: "Quiz CTF",
    route: "i1fIj901MenRK4et",
    minimumPoints: 0,
    points: 0,
    solution: "Quiz CTF",
  },
  {
    name: "Reverse Base64 Audio",
    route: "om9Ll6OYV-oIeHND",
    minimumPoints: 0,
    points: 0,
    solution: "Reverse Base64 Audio",
  },
  {
    name: "Code Snippet",
    route: "be0qt6jmquy2b36j",
    minimumPoints: 0,
    points: 0,
    solution: "Name of a comedian who joked about Bezos in oscards: CHRIS ROCK",
  },
  {
    name: "Find Imposter",
    route: "vuugZwWNIi57Bzdi",
    minimumPoints: 0,
    points: 0,
    solution: "eqw4rK7SRu2q7QcK",
  },
];

const main = async () => {
  try {
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
  } catch (e) {
    if (!(e instanceof PrismaClientKnownRequestError && e.code === "P2002"))
      console.log(e);
  }

  for (const puzzle of puzzles)
    try {
      await prisma.puzzle.create({
        data: puzzle,
      });
    } catch (e) {
      if (!(e instanceof PrismaClientKnownRequestError && e.code === "P2002"))
        console.log(e);
    }
};

main()
  .then(() => console.log("Seeded successfully, file: prisma/seed.ts"))
  .catch((e) => console.log(e))
  .finally(() => void prisma.$disconnect());
