import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    env: {
      // Use { DEBUG: "SISO:*" } for printing debug statements during tests,
      DEBUG: "SISO:*",
      _DEBUG: "",
    },
  },
});
