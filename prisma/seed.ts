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
  // {
  //   name: "Invisible Ink",
  //   route: "VwmQFHWD888NyfvW",
  //   difficulty: "MEDIUM",
  //   hint: "Invisible ink fell on the floor!!! On no!!! Page 2 is full of ink now!!!",
  //   solution: "Bezos is hot",
  // },
  {
    name: "Git Harry Potter",
    route: "NqmDMtv6M91uSVWT",
    difficulty: "HARD",
    hint: "It reminds me of a series",
    solution: "Harry Potter",
  },
  {
    name: "Pigpen Cipher",
    route: "NU2KEZuAmg9wRhjV",
    difficulty: "HARD",
    hint: 'Earthworm is a compound word, made of "earth" and "worm"',
    solution: "thisissupposedtobeanicequestion",
  },
  {
    name: "Text Art",
    route: "ODgOk3IAV2Y4Tw2c",
    difficulty: "MEDIUM",
    hint: `In a world where \n \t is exchanged with \\ \/ respectively`,
    solution: "something",
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
  {
    name: "Bomb defuse",
    route: "XMfQuTwLcOjBjDYX",
    difficulty: "EASY",
    hint: "When life does'nt give the answer you have to really inspect it",
    solution: "Bomb defused",
  },
  {
    name: "Color Transform",
    route: "tpeIYkpqNBvaZBlV",
    difficulty: "HARD",
    hint: `magical + red = glamica
Find shift value
magical + green = wkqsmkv
magical + blue = magicl
Alt 3rd transform remove vowels`,
    solution:
      "Through arrogance we are bound in perpetual obscurity until wisdom liberates us",
  },
  {
    name: "Drag and drop",
    route: "VbdmZbiusiewEsMO",
    difficulty: "EASY",
    hint: `Console for a reason`,
    solution: "Elon Musk",
  },
  {
    name: "Flappy bird",
    route: "PRhKVPyvIvLMXDvh",
    difficulty: "MEDIUM",
    hint: "inspect and find the bounds",
    solution: "bird flappy dancing on a wall",
  },
  {
    name: "Folder frenzy",
    route: "ZOnEXovipHdDBNPI",
    difficulty: "MEDIUM",
    hint: "To understand a project you read me.",
    solution: "port 443",
  },
  {
    name: "Gyro",
    route: "mxepEOIvzwNWyXeg",
    difficulty: "EASY",
    hint: "Use phone or gyro from inspect",
    solution: "lorem",
  },
  {
    name: "Hidden Text",
    route: "FjyNiUKXThoKjRQG",
    difficulty: "MEDIUM",
    hint: "Often associated with chatgpt",
    solution: "Cheater",
  },
  {
    name: "Island",
    route: "FDpUqgKjhzehEvdS",
    difficulty: "EASY",
    hint: "It's actually near",
    solution: "Swimming successfull",
  },
  {
    name: "JWT",
    route: "GxGMghRRLsBDgaGE",
    difficulty: "MEDIUM",
    hint: "Haven't u learnt ur lesson!!! Ctrl+A",
    solution: "pronite",
  },
  {
    name: "Patience",
    route: "GLCKIMiWIfQKDVmY",
    difficulty: "MEDIUM",
    hint: "Bro just wait",
    solution: "Patience unlocked respect++",
  },
  {
    name: "Button puzzle",
    route: "OtKmQiOiyUUcBngv",
    difficulty: "MEDIUM",
    hint: "Debugging skill",
    solution: "CaesarCipher",
  },
  {
    name: "Hidden Page",
    route: "AHNGwcUlNSYCUigP",
    difficulty: "MEDIUM",
    hint: "A Number that you see wherever its Nothing",
    solution: "404",
  },
  {
    name: "Prime",
    route: "QMMzJqmKHzrOWkzR",
    difficulty: "MEDIUM",
    hint: "Laziness is the root cause for your downfall",
    solution: "prime numbers arrangement done",
  },
  {
    name: "Random Numbers",
    route: "vnhXNkpcFFmmqOnK",
    difficulty: "HARD",
    hint: 'Guess the seed of the random numbers, use it to get to "answer"',
    solution: "fsxbjw",
  },
  {
    name: "Robot",
    route: "LPDJidEPxpznRlPW",
    difficulty: "MEDIUM",
    hint: "go to robots",
    solution: "Hidden Button clicked",
  },
  {
    name: "Muteman",
    route: "AKevOdNaWvbMmYUx",
    difficulty: "MEDIUM",
    hint: "It looks like a cipher",
    solution: "hellowelcometodigitalheist",
  },
];
const main = async () => {
  try {
    await prisma.serverSettings.create({
      data: {
        roundOneLive: true,
      },
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
