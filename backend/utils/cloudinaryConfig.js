const cloudinary = require("cloudinary").v2;

if (typeof process.env.CLOUDINARY_URL === "undefined") {
  console.warn("!! cloudinary config is undefined !!");
  console.warn("export CLOUDINARY_URL or set dotenv file");
} else {
  console.log("cloudinary config:");
  console.log(cloudinary.config());
}
console.log(
  "-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --"
);

module.exports = cloudinary;
