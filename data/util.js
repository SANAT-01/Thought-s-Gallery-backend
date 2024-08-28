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

exports.readDataEvents = readDataEvents;
exports.writeDataEvents = writeDataEvents;
exports.readDataUsers = readDataUsers;
exports.writeDataUsers = writeDataUsers;
