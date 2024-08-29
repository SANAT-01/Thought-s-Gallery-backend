const fs = require("node:fs/promises");

async function readDataEvents() {
  const data = await fs.readFile("storage/events.json", "utf8");
  // console.log(data.users);
  return JSON.parse(data);
}

async function writeDataEvents(data) {
  await fs.writeFile("storage/events.json", JSON.stringify(data));
}

async function readDataUsers() {
  const data = await fs.readFile("storage/users.json", "utf8");
  // console.log(data.users);
  return JSON.parse(data);
}

async function writeDataUsers(data) {
  await fs.writeFile("storage/users.json", JSON.stringify(data));
}

async function readDataFav() {
  const data = await fs.readFile("storage/fav.json", "utf8");
  console.log(data.fabs);
  return JSON.parse(data);
}

async function writeDataFav(data) {
  await fs.writeFile("storage/fav.json", JSON.stringify(data));
}

exports.readDataEvents = readDataEvents;
exports.writeDataEvents = writeDataEvents;
exports.readDataUsers = readDataUsers;
exports.writeDataUsers = writeDataUsers;
exports.readDataFav = readDataFav;
exports.writeDataFav = writeDataFav;
