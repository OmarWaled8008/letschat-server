const Ajv = require("ajv");
const ajv = new Ajv();

module.exports = ajv.compile({
  type: "object",
  properties: {
    user: {
      type: "string",
      minLength: 3,
      pattern:
        "^(?:[a-zA-Z0-9_]{3,20}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,})$",
    },

    password: {
      type: "string",
      minLength: 8,
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$",
    },
  },
  required: ["user", "password"],
  additionalProperties: false,
});
