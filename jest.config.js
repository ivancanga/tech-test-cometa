export default {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  testMatch: ["**/tests/**/*.(test|spec).(ts|tsx)"],

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
