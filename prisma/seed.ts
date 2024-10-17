import { PrismaClient, type Puzzle } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

const puzzles: Omit<Puzzle, "id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Key in Lock",
    route: "vpzg4DDdlfPPPTsp",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "Somtimes smaller screens can see more",
    plusPoints: 0,
    solution: "Mobile Screen",
  },
  {
    name: "Button behind Image",
    route: "fFcM0fQmpEqbtW1W",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "I don't like rick roll, I would delete it",
    plusPoints: 0,
    solution: "Hidden button clicked",
  },
  {
    name: "Internet Login IP",
    route: "Xa2OLBJrqtz4sxtP",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "172.16.3.100",
    plusPoints: 0,
    solution: "172.16.3.100",
  },
  {
    name: "QR Code",
    route: "Vmtl46XxjZ2UevMG",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "Good old trial and error",
    plusPoints: 0,
    solution: "Secret Page",
  },
  {
    name: "Thousand Checkbox",
    route: "zXCNA5z9OfLcEpRr",
    difficulty: "EASY",
    minusPoints: 0,
    hint: 'Odd man out wants you to "click-me"',
    plusPoints: 0,
    solution: "Golden Checkbox",
  },
  {
    name: "Mona Lisa",
    route: "SmJOr1YKzrXPoG2w",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "There is a image hidden in the images",
    plusPoints: 0,
    solution: "Mona Lisa",
  },
  {
    name: "Excel Slope",
    route: "VHW1W1p8Ow7EL2Sv",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "Not slope of a line, 2 points",
    plusPoints: 0,
    solution: "7.0695",
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
    name: "Code Snippet",
    route: "be0qt6jmquy2b36j",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "Oscars 2020",
    plusPoints: 0,
    solution: "Chris Rock",
  },
  {
    name: "Morse Song",
    route: "UsIopGqPDsfc2XC7",
    difficulty: "EASY",
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
    difficulty: "EASY",
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
    solution: "Te Amo",
  },
  {
    name: "Sudoku",
    route: "qQyqw9qb2nP1yzvF",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "To uncover the truth, glance at the diagonal! Remember, A=1, B=2… What do the numbers reveal?",
    plusPoints: 0,
    solution: "Noobsquad",
  },
  {
    name: "Phone number",
    route: "phn8FEV1xFlAWYWZ",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "Digits disguised in code—call them, and you'll unlock the secret.",
    plusPoints: 0,
    solution: "hehehe",
  },
  {
    name: "Array Code",
    route: "h5pgkxR6cbaAaG5W",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "ASCII values",
    plusPoints: 0,
    solution: "Hello",
  },
  {
    name: "Grid Code",
    route: "PHNvoDDqqt2Pg5BI",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "Its a grid! Maybe try getting order of numbers from DOM",
    plusPoints: 0,
    solution: "2412200324",
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
    difficulty: "EASY",
    minusPoints: 0,
    hint: "Invisible ink fell on the floor!!! On no!!! Page 2 is full of ink now!!!",
    plusPoints: 0,
    solution: "Bezos is hot",
  },
  {
    name: "Rock Paper Scissors",
    route: "jCTmJSPmNil0xTXL",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "Reset the count by refreshing the page",
    plusPoints: 0,
    solution: "Gaurdian Lost",
  },

  // ---------- Staging ----------
  {
    name: "Youtube Subtitle",
    route: "haurNlR9pWLy7ZON",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "",
    plusPoints: 0,
    solution: "",
  },
  {
    name: "Quiz CTF",
    route: "i1fIj901MenRK4et",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "",
    plusPoints: 0,
    solution: "Quiz CTF",
  },
  {
    name: "pigpen",
    route: "pigpen",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "",
    plusPoints: 0,
    solution: "pigpen",
  },
  {
    name: "gyro1",
    route: "gyro1",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "",
    plusPoints: 0,
    solution: "gyro1",
  },
  {
    name: "gyro2",
    route: "gyro2",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "",
    plusPoints: 0,
    solution: "gyro2",
  },
  {
    name: "puzzle21",
    route: "puzzle21",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "",
    plusPoints: 0,
    solution: "puzzle21",
  },
  {
    name: "puzzle22",
    route: "puzzle22",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "",
    plusPoints: 0,
    solution: "puzzle22",
  },
  {
    name: "scrambled_text",
    route: "scrambled_text",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "",
    plusPoints: 0,
    solution: "scrambled_text",
  },
  {
    name: "error_page",
    route: "error_page",
    difficulty: "EASY",
    minusPoints: 0,
    hint: "",
    plusPoints: 0,
    solution: "error_page",
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
