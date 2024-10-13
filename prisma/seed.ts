import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

const puzzles = [
  {
    name: "Key in Lock",
    route: "vpzg4DDdlfPPPTsp",
    minimumPoints: 0,
    points: 0,
    hint: "Somtimes smaller screens can see more",
    solution: "Mobile Screen",
  },
  {
    name: "Button behind Image",
    route: "fFcM0fQmpEqbtW1W",
    minimumPoints: 0,
    points: 0,
    hint: "I don't like rick roll, I would delete it",
    solution: "Hidden button clicked",
  },
  {
    name: "Internet Login IP",
    route: "Xa2OLBJrqtz4sxtP",
    minimumPoints: 0,
    points: 0,
    hint: "172.16.3.100",
    solution: "172.16.3.100",
  },
  {
    name: "QR Code",
    route: "Vmtl46XxjZ2UevMG",
    minimumPoints: 0,
    points: 0,
    hint: "Good old trial and error",
    solution: "Secret Page",
  },
  {
    name: "Thousand Checkbox",
    route: "zXCNA5z9OfLcEpRr",
    minimumPoints: 0,
    points: 0,
    hint: 'Odd man out wants you to "click-me"',
    solution: "Golden Checkbox",
  },
  {
    name: "Mona Lisa",
    route: "SmJOr1YKzrXPoG2w",
    minimumPoints: 0,
    points: 0,
    hint: "There is a image hidden in the images",
    solution: "Mona Lisa",
  },
  {
    name: "Excel Slope",
    route: "VHW1W1p8Ow7EL2Sv",
    minimumPoints: 0,
    points: 0,
    hint: "Not slope of a line, 2 points",
    solution: "7.0695",
  },
  {
    name: "Mirror Text",
    route: "K7uCVTJroiuY1Xj9",
    minimumPoints: 0,
    points: 0,
    hint: "Those aren't random characters, find the language",
    solution: "Ukrainian",
  },
  {
    name: "Plane Imposter",
    route: "vuugZwWNIi57Bzdi",
    minimumPoints: 0,
    points: 0,
    hint: "Imposter has a different path(iykyk)",
    solution: "eqw4rK7SRu2q7QcK",
  },
  {
    name: "Code Snippet",
    route: "be0qt6jmquy2b36j",
    minimumPoints: 0,
    points: 0,
    hint: "Oscars 2020",
    solution: "Chris Rock",
  },
  {
    name: "Morse Song",
    route: "UsIopGqPDsfc2XC7",
    minimumPoints: 0,
    points: 0,
    hint: "Dots and Dashes",
    solution: "HelloKitty",
  },

  // ----------------
  // ----------------

  {
    name: "Image Processing",
    route: "U9EMRTZwGtL2edaC",
    minimumPoints: 0,
    points: 0,
    solution: "Image Processing",
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
