const Ajv = require("ajv");
const ajv = new Ajv();
module.exports = ajv.compile({
  type: "object",
  properties: {
    username: {
      type: "string",
      minLength: 3,
      maxLength: 20,
      pattern: "^[a-zA-Z0-9_]+$",
    },
    email: {
      type: "string",
      pattern: "^[A-Za-z0-9\\._%+\\-]+@[A-Za-z0-9\\.\\-]+\\.[A-Za-z]{2,}",
    },
    password: {
      type: "string",
      minLength: 8,
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$",
    },
    profilePic: { type: "string" },
    bio: { type: "string", maxLength: 150 },
    followers: { type: "array" },
    following: { type: "array" },
  },
  required: ["username", "email", "password"],
  additionalProperties: false,
});
