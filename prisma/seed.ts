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
  // ---------- Staging ----------
  // {
  //   // Round 1(set cookie)
  //   name: "Bomb Blast",
  //   route: "joel7kb2BzETN5Rg",
  //   difficulty: "MEDIUM",
  //   hint: "https://www.biscuitpeople.com/magazine/post/the-story-behind-dalgona-cookies",
  //   solution: "9 / 11 Boom",
  // },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const puzzlesRoundTwo: Omit<
  Puzzle,
  "id" | "minPoints" | "minusPoints" | "plusPoints" | "createdAt" | "updatedAt"
>[] = [
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
];

const usersData = [
  {
    username: "nnm23is074",
    password: "nnm23is074@123",
  },
  {
    username: "4nm21cm020",
    password: "4nm21cm020@123",
  },
  {
    username: "nnm23cs060",
    password: "nnm23cs060@123",
  },
  {
    username: "nu24n33",
    password: "nu24n33 @123",
  },
  {
    username: "nnm23cc007",
    password: "nnm23cc007@123",
  },
  {
    username: "nnm23cs157",
    password: "nnm23cs157@123",
  },
  {
    username: "nu24k45",
    password: "nu24k45@123",
  },
  {
    username: "nnm23cs042",
    password: "nnm23cs042@123",
  },
  {
    username: "nu24h04",
    password: "nu24h04@123",
  },
  {
    username: "nu24n53",
    password: "nu24n53@123",
  },
  {
    username: "nnm22am048",
    password: "nnm22am048@123",
  },
  {
    username: "nnm23cs110",
    password: "nnm23cs110@123",
  },
  {
    username: "nnm23cs023",
    password: "nnm23cs023@123",
  },
  {
    username: "nnm22ri029",
    password: "nnm22ri029@123",
  },
  {
    username: "4nm21cs208",
    password: "4nm21cs208@123",
  },
  {
    username: "nu24e03",
    password: "nu24e03 @123",
  },
  {
    username: "nu24e26",
    password: "nu24e26@123",
  },
  {
    username: "nnm23cc011",
    password: "nnm23cc011 @123",
  },
  {
    username: "nnm23cs049",
    password: "nnm23cs049@123",
  },
  {
    username: "nu23c24",
    password: "nu23c24@123",
  },
  {
    username: "nnm23is112",
    password: "nnm23is112@123",
  },
  {
    username: "nnm23cs025",
    password: "nnm23cs025@123",
  },
  {
    username: "nu24m30",
    password: "nu24m30 @123",
  },
  {
    username: "nu24k19",
    password: "nu24k19 @123",
  },
  {
    username: "nu24b07",
    password: "nu24b07 @123",
  },
  {
    username: "nu24m64",
    password: "nu24m64 @123",
  },
  {
    username: "nnm22is160",
    password: "nnm22is160 @123",
  },
  {
    username: "nnm22is196",
    password: "nnm22is196@123",
  },
  {
    username: "nu24d12",
    password: "nu24d12 @123",
  },
  {
    username: "nnm22cs056",
    password: "nnm22cs056@123",
  },
  {
    username: "nu24c15",
    password: "nu24c15 @123",
  },
  {
    username: "nnm23cs057",
    password: "nnm23cs057@123",
  },
  {
    username: "nnm23cs083",
    password: "nnm23cs083@123",
  },
  {
    username: "nnm22am004",
    password: "nnm22am004@123",
  },
  {
    username: "nnm23cb052",
    password: "nnm23cb052@123",
  },
  {
    username: "nu24k23",
    password: "nu24k23 @123",
  },
  {
    username: "nu24d34",
    password: "nu24d34@123",
  },
  {
    username: "nnm23cc066",
    password: "nnm23cc066@123",
  },
  {
    username: "nnm23cs200",
    password: "nnm23cs200@123",
  },
  {
    username: "nnm23is069",
    password: "nnm23is069@123",
  },
  {
    username: "nnm23cs171",
    password: "nnm23cs171@123",
  },
  {
    username: "nnm23ec012",
    password: "nnm23ec012@123",
  },
  {
    username: "nnm23cs036",
    password: "nnm23cs036@123",
  },
  {
    username: "nnm23cs020",
    password: "nnm23cs020@123",
  },
  {
    username: "nnm23is079",
    password: "nnm23is079@123",
  },
  {
    username: "nnm23cs144",
    password: "nnm23cs144@123",
  },
  {
    username: "nnm22am046",
    password: "nnm22am046@123",
  },
  {
    username: "nnm23cs264",
    password: "nnm23cs264@123",
  },
  {
    username: "nu24d63",
    password: "nu24d63 @123",
  },
  {
    username: "nnm22is104",
    password: "nnm22is104@123",
  },
  {
    username: "nu24i54",
    password: "nu24i54 @123",
  },
  {
    username: "nu24a15",
    password: "nu24a15@123",
  },
  {
    username: "nnm23cc050",
    password: "nnm23cc050@123",
  },
  {
    username: "4nm21cs011",
    password: "4nm21cs011@123",
  },
  {
    username: "dip24is11",
    password: "dip24is11@123",
  },
  {
    username: "nnm22is029",
    password: "nnm22is029@123",
  },
  {
    username: "nnm22is092",
    password: "nnm22is092@123",
  },
  {
    username: "nu24d68",
    password: "nu24d68@123",
  },
  {
    username: "nnm23cs128",
    password: "nnm23cs128@123",
  },
  {
    username: "nnm23cs199",
    password: "nnm23cs199@123",
  },
  {
    username: "nnm23ad500",
    password: "nnm23ad500@123",
  },
  {
    username: "nnm23cs133",
    password: "nnm23cs133@123",
  },
  {
    username: "nnm23cs169",
    password: "nnm23cs169@123",
  },
  {
    username: "nu24n02",
    password: "nu24n02@123",
  },
  {
    username: "nnm22is100",
    password: "nnm22is100@123",
  },
  {
    username: "nu24d21",
    password: "nu24d21@123",
  },
  {
    username: "nnm22ri028",
    password: "nnm22ri028@123",
  },
  {
    username: "nu24m03",
    password: "nu24m03 @123",
  },
  {
    username: "nnm22ri060",
    password: "nnm22ri060@123",
  },
  {
    username: "nnm22ad068",
    password: "nnm22ad068@123",
  },
  {
    username: "nnm23cc021",
    password: "nnm23cc021@123",
  },
  {
    username: "nnm23is201",
    password: "nnm23is201@123",
  },
  {
    username: "nnm22is066",
    password: "nnm22is066@123",
  },
  {
    username: "nnm23is186",
    password: "nnm23is186@123",
  },
  {
    username: "nnm22cs059",
    password: "nnm22cs059@123",
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
    // await prisma.user.createMany({
    //   data: [
    //     {
    //       name: "Admin",
    //       email: "admin@flc.in",
    //       password: "2orYdSbcsmu1kwHU",
    //       phoneNumber: "",
    //       role: "ADMIN",
    //     },
    //   ],
    // });
    for (const user of usersData) {
      await prisma.user.create({
        data: {
          name: user.username,
          email: `${user.username}@flc.in`,
          password: user.password,
          role: "USER",
          phoneNumber: "",
        },
      });
    }
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
