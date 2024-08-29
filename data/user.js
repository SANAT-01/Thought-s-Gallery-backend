const { hash } = require("bcryptjs");
const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readDataUsers, writeDataUsers } = require("./util");

async function add(data) {
  const storedData = await readDataUsers();
  const userId = generateId();
  const hashedPw = await hash(data.password, 12);
  if (!storedData.users) {
    storedData.users = [];
  }
  storedData.users.push({ ...data, password: hashedPw, id: userId });
  await writeDataUsers(storedData);
  return { id: userId, email: data.email };
}
async function getAllUsers() {
  const storedData = await readDataUsers();
  if (!storedData.users) {
    throw new NotFoundError("Could not find any events.");
  }
  return storedData.users;
}
async function get(email) {
  console.log("inside get user method");
  const storedData = await readDataUsers();
  console.log(storedData); // returning all the event.json datas
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError("Could not find any users.");
  }

  const user = storedData.users.find((ev) => ev.email === email);
  // console.log(user);
  if (!user) {
    throw new NotFoundError("Could not find user for email " + email);
  }

  return user;
}

async function replaceUser(id, data) {
  const storedData = await readDataUsers();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError("Could not find any Users.");
  }

  const index = storedData.users.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError("Could not find event for id " + id);
  }

  storedData.users[index] = { ...data, id };

  await writeDataUsers(storedData);
}

async function removeUser(id) {
  const storedData = await readDataUsers();
  const updatedData = storedData.events.filter((ev) => ev.id !== id);
  await writeDataUsers({ ...storedData, events: updatedData });
}

exports.removeUser = removeUser;
exports.getAllUsers = getAllUsers;
exports.replaceUser = replaceUser;
exports.addUser = add;
exports.getUser = get;
