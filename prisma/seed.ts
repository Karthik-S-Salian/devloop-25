import { PrismaClient, type Puzzle } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

//               x  0.2 0.4
// EASY PUZZLES 50  10  20
// MEDI PUZZLES 100 20  40
// HARD PUZZLES 200 40  80

const puzzles: Omit<Puzzle, "id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Key in Lock",
    route: "vpzg4DDdlfPPPTsp",
    difficulty: "EASY",
    minusPoints: 5,
    hint: "Somtimes smaller screens can see more",
    plusPoints: 50,
    solution: "Mobile Screen",
  },
  {
    name: "Button behind Image",
    route: "fFcM0fQmpEqbtW1W",
    difficulty: "MEDIUM",
    minusPoints: 0,
    hint: "I don't like rick roll, I would delete it",
    plusPoints: 0,
    solution: "Hidden button clicked",
  },
  {
    name: "QR Code",
    route: "Vmtl46XxjZ2UevMG",
    difficulty: "MEDIUM",
    minusPoints: 0,
    hint: "Good old trial and error",
    plusPoints: 0,
    solution: "Secret Page",
  },
  {
    name: "Thousand Checkbox",
    route: "zXCNA5z9OfLcEpRr",
    difficulty: "MEDIUM",
    minusPoints: 0,
    hint: 'Odd man out wants you to "click-me"',
    plusPoints: 0,
    solution: "Golden Checkbox",
  },
  {
    name: "Mirror Text",
    route: "K7uCVTJroiuY1Xj9",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "Those aren't random characters, find the language",
    plusPoints: 0,
    solution: "Ukrainian",
  },
  {
    name: "Plane Imposter",
    route: "vuugZwWNIi57Bzdi",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "Imposter has a different path(iykyk)",
    plusPoints: 0,
    solution: "eqw4rK7SRu2q7QcK",
  },
  {
    name: "Morse Song",
    route: "UsIopGqPDsfc2XC7",
    difficulty: "MEDIUM",
    minusPoints: 0,
    hint: "Dots and Dashes",
    plusPoints: 0,
    solution: "HelloKitty",
  },
  {
    name: "Docker Hidden",
    route: "nxUEWT6sjq3JWizz",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "There is something hidden in the image",
    plusPoints: 0,
    solution: "Docker",
  },
  {
    name: "Reverse Base64 Audio",
    route: "DgXeXX6UBp3O7IDu",
    difficulty: "MEDIUM",
    minusPoints: 0,
    hint: "Maybe, just maybe, you should play the ***** in opposite direction",
    plusPoints: 0,
    solution: "24122003",
  },
  {
    name: "Image Processing",
    route: "U9EMRTZwGtL2edaC",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "There is something called as photomontage",
    plusPoints: 0,
    solution: "Hidden Message",
  },
  {
    name: "Phone number",
    route: "phn8FEV1xFlAWYWZ",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "Digits disguised in code—call them, and you'll unlock the secret.",
    plusPoints: 0,
    // TODO(Omkar): Ask bhavya solution
    solution: "hehehe",
  },
  {
    name: "Array Code",
    route: "h5pgkxR6cbaAaG5W",
    difficulty: "MEDIUM",
    minusPoints: 0,
    hint: "ASCII values",
    plusPoints: 0,
    solution: "Hello",
  },
  {
    // Only puzzle that cannot be solved, time waster
    name: "Unsolvable Puzzle",
    route: "lF4Qiv8G2ZRUjpG2",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "This is a time waster puzzle! Quit now! You already wasted your time reading this hint!",
    plusPoints: 0,
    solution: "Uq38qqUcl21S6263",
  },
  {
    name: "Invisible Ink",
    route: "VwmQFHWD888NyfvW",
    difficulty: "MEDIUM",
    minusPoints: 0,
    hint: "Invisible ink fell on the floor!!! On no!!! Page 2 is full of ink now!!!",
    plusPoints: 0,
    solution: "Bezos is hot",
  },
  {
    name: "Git Harry Potter",
    route: "NqmDMtv6M91uSVWT",
    difficulty: "HARD",
    minusPoints: 0,
    hint: "It reminds me of a series",
    plusPoints: 0,
    solution: "Harry Potter",
  },

  // --------- round 2---------
  {
    // TODO(Omkar): solve the bug, ui
    name: "Rock Paper Scissors",
    route: "jCTmJSPmNil0xTXL",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "Reset the count by refreshing the page",
    plusPoints: 0,
    solution: "Gaurdian Lost",
  },
  {
    name: "Corner Hearts",
    route: "V7hRfHPno1Nbzuk4",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "Corners are the key",
    plusPoints: 0,
    solution: "Hearts touched",
  },
  {
    name: "Internet Login IP",
    route: "Xa2OLBJrqtz4sxtP",
    difficulty: "HARD",
    minusPoints: 0,
    hint: "172.16.3.100",
    plusPoints: 0,
    solution: "172.16.3.100",
  },
  {
    name: "Mona Lisa",
    route: "SmJOr1YKzrXPoG2w",
    difficulty: "MEDIUM",
    minusPoints: 0,
    hint: "There is a image hidden in the images",
    plusPoints: 0,
    solution: "Mona Lisa",
  },
  {
    name: "Excel Slope",
    route: "VHW1W1p8Ow7EL2Sv",
    difficulty: "MEDIUM",
    minusPoints: 0,
    hint: "Not slope of a line, 2 points",
    plusPoints: 0,
    solution: "8.8133",
  },
  {
    name: "Code Snippet",
    route: "be0qt6jmquy2b36j",
    difficulty: "HARD",
    minusPoints: 0,
    hint: "Oscars 2020",
    plusPoints: 0,
    solution: "Chris Rock",
  },
  {
    name: "Sudoku",
    route: "qQyqw9qb2nP1yzvF",
    difficulty: "HARD",
    minusPoints: 0,
    hint: "To uncover the truth, glance at the diagonal! Remember, A=1, B=2… What do the numbers reveal?",
    plusPoints: 0,
    solution: "Noobsquad",
  },
  {
    name: "Grid Code",
    route: "PHNvoDDqqt2Pg5BI",
    difficulty: "HARD",
    minusPoints: 0,
    hint: "Flex is not always the answer",
    plusPoints: 0,
    solution: "2412200324",
  },
  {
    name: "Error Page",
    route: "r7oT7UZjpSoUPP2N",
    difficulty: "MEDIUM",
    minusPoints: 0,
    hint: 'Havent you caught the habbit of "Ctrl + A", so sad',
    plusPoints: 0,
    solution: "Elon Musk",
  },

  // ------------------------

  // ---------- Staging ----------

  {
    // Round 1(cloudinary)
    name: "pigpen",
    route: "pigpen",
    difficulty: "MEDIUM",
    minusPoints: 0,
    hint: 'Earthworm is a compound word, made of "earth" and "worm"',
    plusPoints: 0,
    solution: "thisissupposedtobeanicequestion",
  },
  {
    // Round 1(set cookie)
    name: "puzzle22",
    route: "puzzle22",
    difficulty: "MEDIUM",
    minusPoints: 0,
    hint: "https://www.biscuitpeople.com/magazine/post/the-story-behind-dalgona-cookies",
    plusPoints: 0,
    solution: "puzzle22",
  },
  {
    // Round 1
    name: "scrambled_text",
    route: "scrambled_text",
    difficulty: "MEDIUM",
    minusPoints: 0,
    hint: `In a world where \n \t is exchanged with \\ \/ respectively`,
    plusPoints: 0,
    solution: "something",
  },
];

const main = async () => {
  try {
    await prisma.serverSettings.create({
      data: {
        roundOneLive: false,
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
