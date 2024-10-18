import { PrismaClient, type Puzzle } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

const puzzlesRoundOne: Omit<
  Puzzle,
  "id" | "minPoints" | "minusPoints" | "plusPoints" | "createdAt" | "updatedAt"
>[] = [
  {
    name: "Key in Lock",
    route: "vpzg4DDdlfPPPTsp",
    difficulty: "EASY",
    hint: "Somtimes smaller screens can see more",
    solution: "Mobile Screen",
  },
  {
    name: "Button behind Image",
    route: "fFcM0fQmpEqbtW1W",
    difficulty: "MEDIUM",
    hint: "I don't like rick roll, I would delete it",
    solution: "Hidden button clicked",
  },
  {
    name: "QR Code",
    route: "Vmtl46XxjZ2UevMG",
    difficulty: "MEDIUM",
    hint: "Good old trial and error",
    solution: "Secret Page",
  },
  {
    name: "Thousand Checkbox",
    route: "zXCNA5z9OfLcEpRr",
    difficulty: "MEDIUM",
    hint: 'Odd man out wants you to "click-me"',
    solution: "Golden Checkbox",
  },
  {
    name: "Mirror Text",
    route: "K7uCVTJroiuY1Xj9",
    difficulty: "EASY",
    hint: "Those aren't random characters, find the language",
    solution: "Ukrainian",
  },
  {
    name: "Plane Imposter",
    route: "vuugZwWNIi57Bzdi",
    difficulty: "EASY",
    hint: "Imposter has a different path(iykyk)",
    solution: "eqw4rK7SRu2q7QcK",
  },
  {
    name: "Morse Song",
    route: "UsIopGqPDsfc2XC7",
    difficulty: "MEDIUM",
    hint: "Dots and Dashes",
    solution: "HelloKitty",
  },
  {
    name: "Docker Hidden",
    route: "nxUEWT6sjq3JWizz",
    difficulty: "EASY",
    hint: "Devops",
    solution: "Docker",
  },
  {
    // TODO
    name: "Reverse Base64 Audio",
    route: "DgXeXX6UBp3O7IDu",
    difficulty: "MEDIUM",
    hint: "Maybe, just maybe, you should play the ***** in opposite direction",
    solution: "24122003",
  },
  {
    name: "Image Processing",
    route: "U9EMRTZwGtL2edaC",
    difficulty: "EASY",
    hint: "There is something called as photomontage",
    solution: "Hidden Message",
  },
  {
    name: "Phone number",
    route: "phn8FEV1xFlAWYWZ",
    difficulty: "EASY",
    hint: "Digits disguised in code—call them, and you'll unlock the secret.",
    solution: "1706",
  },
  {
    name: "Array Code",
    route: "h5pgkxR6cbaAaG5W",
    difficulty: "MEDIUM",
    hint: "ASCII values",
    solution: "Hello",
  },
  {
    // Only puzzle that cannot be solved, time waster
    name: "Unsolvable Puzzle",
    route: "lF4Qiv8G2ZRUjpG2",
    difficulty: "EASY",
    hint: "This is a time waster puzzle! Quit now! You already wasted your time reading this hint!",
    solution: "Uq38qqUcl21S6263",
  },
  {
    name: "Invisible Ink",
    route: "VwmQFHWD888NyfvW",
    difficulty: "MEDIUM",
    hint: "Invisible ink fell on the floor!!! On no!!! Page 2 is full of ink now!!!",
    solution: "Bezos is hot",
  },
  {
    name: "Git Harry Potter",
    route: "NqmDMtv6M91uSVWT",
    difficulty: "HARD",
    hint: "It reminds me of a series",
    solution: "Harry Potter",
  },
  // ---------- Staging ----------
  {
    // Round 1(cloudinary)
    // TODO(OMkar): anser
    name: "Pigpen Cipher",
    route: "NU2KEZuAmg9wRhjV",
    difficulty: "HARD",
    hint: 'Earthworm is a compound word, made of "earth" and "worm"',
    solution: "thisissupposedtobeanicequestion",
  },
  {
    // Round 1(set cookie)
    name: "Bomb Blast",
    route: "joel7kb2BzETN5Rg",
    difficulty: "MEDIUM",
    hint: "https://www.biscuitpeople.com/magazine/post/the-story-behind-dalgona-cookies",
    solution: "9 / 11 Boom",
  },
  {
    // Round 1
    name: "Text Art",
    route: "ODgOk3IAV2Y4Tw2c",
    difficulty: "MEDIUM",
    hint: `In a world where \n \t is exchanged with \\ \/ respectively`,
    solution: "something",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const puzzlesRoundTwo: Omit<
  Puzzle,
  "id" | "minPoints" | "minusPoints" | "plusPoints" | "createdAt" | "updatedAt"
>[] = [
  {
    // TODO(Omkar): solve the bug, ui
    name: "Rock Paper Scissors",
    route: "jCTmJSPmNil0xTXL",
    difficulty: "EASY",
    hint: "Reset the count by refreshing the page",
    solution: "Gaurdian Lost",
  },
  {
    name: "Corner Hearts",
    route: "V7hRfHPno1Nbzuk4",
    difficulty: "EASY",
    hint: "Corners are the key",
    solution: "Hearts touched",
  },
  {
    name: "Internet Login IP",
    route: "Xa2OLBJrqtz4sxtP",
    difficulty: "HARD",
    hint: "Answer = 172.16.3.100",
    solution: "172.16.3.100",
  },
  {
    name: "Mona Lisa",
    route: "SmJOr1YKzrXPoG2w",
    difficulty: "MEDIUM",
    hint: "There is a image hidden in the images",
    solution: "Mona Lisa",
  },
  {
    name: "Excel Slope",
    route: "VHW1W1p8Ow7EL2Sv",
    difficulty: "MEDIUM",
    hint: "Not slope of a line, 2 points",
    solution: "8.8133",
  },
  {
    name: "Code Snippet",
    route: "be0qt6jmquy2b36j",
    difficulty: "HARD",
    hint: "Oscars 2020",
    solution: "Chris Rock",
  },
  {
    name: "Sudoku",
    route: "qQyqw9qb2nP1yzvF",
    difficulty: "HARD",
    hint: "To uncover the truth, glance at the diagonal! Remember, A=1, B=2… What do the numbers reveal?",
    solution: "Noobsquad",
  },
  {
    name: "Grid Code",
    route: "PHNvoDDqqt2Pg5BI",
    difficulty: "HARD",
    hint: "Flex is not always the answer",
    solution: "2412200324",
  },
  {
    name: "Error Page",
    route: "r7oT7UZjpSoUPP2N",
    difficulty: "MEDIUM",
    hint: 'Havent you caught the habbit of "Ctrl + A", so sad',
    solution: "Elon Musk",
  },
];

const main = async () => {
  try {
    await prisma.serverSettings.create({
      data: {
        roundOneLive: false,
        roundOneStarts: new Date("2024-10-19T09:30:00Z"),
      },
    });
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
          phoneNumber: "",
        },
        {
          name: "Admin",
          email: "admin@flc.in",
          password: "admin@123",
          phoneNumber: "",
          role: "ADMIN",
        },
      ],
    });
  } catch (e) {
    if (!(e instanceof PrismaClientKnownRequestError && e.code === "P2002"))
      console.log(e);
  }

  //               x  0.2 0.4
  // EASY PUZZLES  50  10  20
  // MEDI PUZZLES 100  20  40
  // HARD PUZZLES 200  40  80

  for (const puzzle of puzzlesRoundOne)
    try {
      const plusPoints =
        puzzle.difficulty === "EASY"
          ? 50
          : puzzle.difficulty === "MEDIUM"
            ? 100
            : 200;
      await prisma.puzzle.create({
        data: {
          ...puzzle,
          minPoints: parseInt((plusPoints * 0.4).toFixed(0)),
          minusPoints: parseInt((plusPoints * 0.2).toFixed(0)),
          plusPoints: plusPoints,
        },
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
