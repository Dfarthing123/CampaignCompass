"use client";

import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// Utility to generate a random alphanumeric string
// const generateRandomId = (length = 8) => {
//   return Math.random()
//     .toString(36)
//     .substring(2, 2 + length);
// };

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function generateRandomUsername(): string {
  const adjectives = [
    "Ox",
    "Ant",
    "Ape",
    "Bat",
    "Bee",
    "Bug",
    "Cat",
    "Cod",
    "Cow",
    "Dog",
    "Eel",
    "Elk",
    "Emu",
    "Fly",
    "Fox",
    "Gnu",
    "Hen",
    "Pig",
    "Rat",
    "Yak",
    "Bear",
    "Bird",
    "Boar",
    "Buck",
    "Bull",
    "Calf",
    "Crab",
    "Crow",
    "Deer",
    "Duck",
    "Fawn",
    "Fish",
    "Flea",
    "Frog",
    "Goat",
    "Hare",
    "Hawk",
    "Ibex",
    "Lamb",
    "Lion",
    "Lynx",
    "Mole",
    "Moth",
    "Newt",
    "Puma",
    "Seal",
    "Swan",
    "Toad",
    "Wolf",
    "Worm",
    "Bison",
    "Camel",
    "Chimp",
    "Eagle",
    "Finch",
    "Goose",
    "Horse",
    "Hyena",
    "Koala",
    "Llama",
    "Moose",
    "Mouse",
    "Otter",
    "Panda",
    "Quail",
    "Rhino",
    "Shark",
    "Sheep",
    "Shrew",
    "Skunk",
    "Sloth",
    "Snake",
    "Squid",
    "Tiger",
    "Trout",
    "Whale",
    "Zebra",
    "Badger",
    "Beaver",
    "Bobcat",
    "Canary",
    "Donkey",
    "Falcon",
    "Ferret",
    "Gerbil",
    "Gibbon",
    "Iguana",
    "Jackal",
    "Jaguar",
    "Kitten",
    "Lizard",
    "Mantis",
    "Monkey",
    "Ocelot",
    "Oriole",
    "Osprey",
    "Pigeon",
    "Rabbit",
    "Salmon",
    "Spider",
    "Turtle",
    "Walrus",
    "Weasel",
    "Baboon",
    "Buffalo",
    "Buzzard",
    "Cheetah",
    "Chicken",
    "Dolphin",
    "Giraffe",
    "Gorilla",
    "Hamster",
    "Leopard",
    "Lobster",
    "Macaque",
    "Octopus",
    "Panther",
    "Peacock",
    "Penguin",
    "Raccoon",
    "Rooster",
    "Sardine",
    "Sparrow",
    "Tadpole",
    "Vulture",
    "Wallaby",
    "Aardvark",
    "Antelope",
    "Chipmunk",
    "Elephant",
    "Flamingo",
    "Hedgehog",
    "Kangaroo",
    "Mackerel",
    "Mongoose",
    "Platypus",
    "Reindeer",
    "Scorpion",
    "Seahorse",
    "Squirrel",
  ];

  const nouns = [
    "Red",
    "Tan",
    "Blue",
    "Cyan",
    "Gold",
    "Gray",
    "Lime",
    "Navy",
    "Pink",
    "Plum",
    "Rust",
    "Teal",
    "Amber",
    "Beige",
    "Black",
    "Brown",
    "Coral",
    "Green",
    "Ivory",
    "Khaki",
    "Lemon",
    "Mauve",
    "Olive",
    "Pearl",
    "Sepia",
    "White",
    "Auburn",
    "Bisque",
    "Bronze",
    "Cerise",
    "Cherry",
    "Copper",
    "Indigo",
    "Maroon",
    "Orange",
    "Purple",
    "Salmon",
    "Silver",
    "Sienna",
    "Violet",
    "Yellow",
    "Apricot",
    "Crimson",
    "Emerald",
    "Fuchsia",
    "Magenta",
    "Mustard",
    "Scarlet",
    "Charcoal",
    "Lavender",
  ];

  const adjective = capitalize(
    adjectives[Math.floor(Math.random() * adjectives.length)]
  );
  const noun = capitalize(nouns[Math.floor(Math.random() * nouns.length)]);
  const number = Math.floor(Math.random() * 100);

  return `${adjective}${noun}${number}`;
}

const SHAPES = [
  "circle",
  "square",
  "rounded",
  "diamond",
  //"star",
  "hexagon",
] as const;
type Shape = (typeof SHAPES)[number];

function stringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// function stringToColor(str: string): string {
//   const h = stringHash(str) % 360;
//   return `hsl(${h}, 50%, 50%)`;
// }

function stringToAccessibleColor(str: string): string {
  const hue = stringHash(str) % 360;
  const safeLightnessValues = [35, 40, 45]; // Dark enough for white text
  const lightness =
    safeLightnessValues[stringHash(str + "l") % safeLightnessValues.length];
  const saturation = 70;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getInitials(str: string): string {
  const words = str.split(/[\s-_]/).filter(Boolean);
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function getShapeFromSeed(seed: string): Shape {
  const index = stringHash(seed) % SHAPES.length;
  return SHAPES[index];
}

function generateSVG(seed: string): string {
  const shape = getShapeFromSeed(seed);
  const fill = stringToAccessibleColor(seed);
  const initials = getInitials(seed);
  const center = 24;

  const polygonPoints: Record<string, string> = {
    diamond: `${center},4 44,${center} ${center},44 4,${center}`,
    star: `24,2 29,17 45,17 32,27 37,42 24,33 11,42 16,27 3,17 19,17`,
    hexagon: `24,4 42,14 42,34 24,44 6,34 6,14`,
  };

  const shapeMarkup = (() => {
    if (shape === "circle")
      return `<circle cx="${center}" cy="${center}" r="20" fill="${fill}" />`;
    if (shape === "square")
      return `<rect x="8" y="8" width="32" height="32" fill="${fill}" />`;
    if (shape === "rounded")
      return `<rect x="8" y="8" width="32" height="32" rx="8" fill="${fill}" />`;
    return `<polygon points="${polygonPoints[shape]}" fill="${fill}" />`;
  })();

  const text = `
    <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
      font-size="12" font-family="sans-serif" fill="white" font-weight="bold">
      ${initials}
    </text>
  `;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      ${shapeMarkup}
      ${text}
    </svg>
  `.trim();
}

function svgToBase64(svg: string): string {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}

export const CustomAvatar: React.FC<{ sizeClass: string }> = ({
  sizeClass,
}) => {
  const [id, setId] = useState(() => generateRandomUsername());
  const initials = getInitials(id);
  const dataUri = useMemo(() => svgToBase64(generateSVG(id)), [id]);

  return (
    <Avatar className={sizeClass}>
      <AvatarImage src={dataUri}></AvatarImage>
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};

export const UsernameGenerator = () => {
  const [id, setId] = useState(() => generateRandomUsername());

  return { id };
};

export const CustomUsername: React.FC<{ sizeClass: string }> = ({
  sizeClass,
}) => {
  const [id, setId] = useState(() => generateRandomUsername());

  return <div className={sizeClass}>{id}</div>;
};
