#!/usr/bin/env node

import prompts, { type PromptObject } from "prompts";
import { logger } from "./helpers/logger";

import { createProject } from "./helpers/create";

const DEFAULT_PROJECT_NAME = "my-t3-app";

const promts: PromptObject[] = [
  {
    name: "name",
    type: "text",
    message: "What will your project be called?",
    format: (name: string) => {
      if (name === "") {
        logger.warn(`Using default name: ${DEFAULT_PROJECT_NAME}`);
        return DEFAULT_PROJECT_NAME;
      }
      return name.trim();
    },
  },
  {
    name: "language",
    type: "select",
    message: "Will you be using JavaScript or TypeScript?",
    instructions: false,
    choices: [
      {
        title: "JavaScript",
        value: "javascript",
      },
      {
        title: "TypeScript",
        value: "typescript",
      },
    ],
    format: (language: string) => {
      if (language === "javascript") {
        logger.error("Wrong answer, using TypeScript instead...");
      } else {
        logger.success("Good choice! Using TypeScript!");
      }
      return;
    },
  },
  /*{
    name: "packages",
    type: "multiselect",
    message: "Which packages will you be using?",
    hint: "- Space to select, Return to submit",
    instructions: false,
    choices: [
      {
        title: "Next Auth",
        value: "next-auth",
      },
      {
        title: "Prisma",
        value: "prisma",
      },
    ]
  }*/
  {
    name: "useTailwind",
    type: "confirm",
    message: "Would you like to use Tailwind?",
    initial: true,
  },
  {
    name: "usePrisma",
    type: "confirm",
    message: "Would you like to use Prisma?",
    initial: true,
  },
  {
    name: "useNextAuth",
    // only show this prompt if usePrisma is true
    type: (prev) => (prev ? "confirm" : null),
    message: "Would you like to use Next Auth?",
    initial: true,
  },
];

(async () => {
  logger.error("Welcome to the create-t3-app !");

  // FIXME: Look into if the type can be inferred
  const { name, useTailwind, usePrisma, useNextAuth } = (await prompts(
    promts
  )) as {
    name: string;
    useTailwind: boolean;
    usePrisma: boolean;
    useNextAuth: boolean | undefined;
  };
  const useNextAuthBool = !!useNextAuth;

  const packages = [];
  if (useTailwind) packages.push("tailwind");
  if (usePrisma) packages.push("prisma");
  if (useNextAuthBool) packages.push("next-auth");

  await createProject(name, packages);

  process.exit(0);
})();
