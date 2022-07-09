const fs = require("fs");
const countries = require("./countries");

const countryCodes = countries.map((country) => country.phone).sort();
const uniqueCountries = countryCodes.filter(
    (country, index) => countryCodes.indexOf(country) === index
);

fs.writeFileSync(
    `${__dirname}/countryCodes.js`,
    JSON.stringify(uniqueCountries)
);
