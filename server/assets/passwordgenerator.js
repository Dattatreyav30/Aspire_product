const generator = require("generate-password");

const passwordGenerator = () => {
  const passwordOptions = {
    length: 10,
    numbers: true,
    symbols: false,
    uppercase: false,
    excludeSimilarCharacters: false,
  };
  const randomPassword = generator.generate(passwordOptions);
  return randomPassword;
};
module.exports = passwordGenerator;
