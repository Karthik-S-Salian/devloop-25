import { PrismaClient, type Puzzle } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

const puzzles: Omit<Puzzle, "id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Key in Lock",
    devName: "Key in Lock",
    route: "vpzg4DDdlfPPPTsp",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: "Somtimes smaller screens can see more",
    plusPoints: 0,
    solution: "Mobile Screen",
  },
  {
    name: "Button behind Image",
    devName: "Button behind Image",
    route: "fFcM0fQmpEqbtW1W",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: "I don't like rick roll, I would delete it",
    plusPoints: 0,
    solution: "Hidden button clicked",
  },
  {
    name: "Internet Login IP",
    devName: "Internet Login IP",
    route: "Xa2OLBJrqtz4sxtP",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: "172.16.3.100",
    plusPoints: 0,
    solution: "172.16.3.100",
  },
  {
    name: "QR Code",
    devName: "QR Code",
    route: "Vmtl46XxjZ2UevMG",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: "Good old trial and error",
    plusPoints: 0,
    solution: "Secret Page",
  },
  {
    name: "Thousand Checkbox",
    devName: "Thousand Checkbox",
    route: "zXCNA5z9OfLcEpRr",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: 'Odd man out wants you to "click-me"',
    plusPoints: 0,
    solution: "Golden Checkbox",
  },
  {
    name: "Mona Lisa",
    devName: "Mona Lisa",
    route: "SmJOr1YKzrXPoG2w",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: "There is a image hidden in the images",
    plusPoints: 0,
    solution: "Mona Lisa",
  },
  {
    name: "Excel Slope",
    devName: "Excel Slope",
    route: "VHW1W1p8Ow7EL2Sv",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: "Not slope of a line, 2 points",
    plusPoints: 0,
    solution: "7.0695",
  },
  {
    name: "Mirror Text",
    devName: "Mirror Text",
    route: "K7uCVTJroiuY1Xj9",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: "Those aren't random characters, find the language",
    plusPoints: 0,
    solution: "Ukrainian",
  },
  {
    name: "Plane Imposter",
    devName: "Plane Imposter",
    route: "vuugZwWNIi57Bzdi",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: "Imposter has a different path(iykyk)",
    plusPoints: 0,
    solution: "eqw4rK7SRu2q7QcK",
  },
  {
    name: "Code Snippet",
    devName: "Code Snippet",
    route: "be0qt6jmquy2b36j",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: "Oscars 2020",
    plusPoints: 0,
    solution: "Chris Rock",
  },
  {
    name: "Morse Song",
    devName: "Morse Song",
    route: "UsIopGqPDsfc2XC7",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: "Dots and Dashes",
    plusPoints: 0,
    solution: "HelloKitty",
  },
  {
    name: "Docker Hidden",
    devName: "Docker Hidden",
    route: "nxUEWT6sjq3JWizz",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: "There is something hidden in the image",
    plusPoints: 0,
    solution: "Docker",
  },
  {
    name: "Reverse Base64 Audio",
    devName: "Reverse Base64 Audio",
    route: "DgXeXX6UBp3O7IDu",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: "",
    plusPoints: 0,
    solution: "24122003",
  },
  {
    name: "Image Processing",
    devName: "Image Processing",
    route: "U9EMRTZwGtL2edaC",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: "",
    plusPoints: 0,
    solution: "Te Amo",
  },

  // ----------------
  // ----------------

  {
    name: "Quiz CTF",
    devName: "Quiz CTF",
    route: "i1fIj901MenRK4et",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: "",
    plusPoints: 0,
    solution: "Quiz CTF",
  },
  {
    name: "Sudoku",
    devName: "Sudoku",
    route: "8kgp3jiHZzoMSpvd",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: "To uncover the truth, glance at the diagonal! Remember, A=1, B=2… What do the numbers reveal?",
    plusPoints: 0,
    solution: "Sudoku",
  },
  {
    name: "Phone number",
    devName: "Phone number",
    route: "phn8FEV1xFlAWYWZ",
    difficulty: "EASY",
    round: "ONE",
    minusPoints: 0,
    hint: "Digits disguised in code—call them, and you'll unlock the secret.",
    plusPoints: 0,
    solution: "hehehe",
  },
];

const main = async () => {
  try {
    const serverSettings = await prisma.serverSettings.create({
      data: {
        roundOneStartTime: new Date("2024-10-19T09:00:00.000Z"),
        roundOneEndTime: new Date("2024-10-19T10:30:00.000Z"),
        roundTwoStoryAccessToken: "DgQI5Q44",
        roundTwoStartTime: new Date("2024-10-19T11:00:00.000Z"),
        roundTwoEndTime: new Date("2024-10-19T12:30:00.000Z"),
      },
    });

    console.log("serverSettings : ", serverSettings);
  } catch (e) {
    if (!(e instanceof PrismaClientKnownRequestError && e.code === "P2002"))
      console.log(e);
  }

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
