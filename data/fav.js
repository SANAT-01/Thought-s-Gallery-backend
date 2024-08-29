const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readDataFav, writeDataFav } = require("./util");

async function getAllFav() {
  const storedData = await readDataFav();
  //   console.log(storedData);
  if (!storedData.fabs) {
    throw new NotFoundError("Could not find any events.");
  }
  return storedData.fabs;
}

async function addFav(data) {
  const storedData = await readDataFav();
  //   console.log(storedData);
  storedData.fabs.unshift({ ...data, id: generateId() });
  await writeDataFav(storedData);
}

async function replaceFav(id, data) {
  const storedData = await readDataFav();
  console.log(storedData);
  if (!storedData.fabs || storedData.fabs.length === 0) {
    throw new NotFoundError("Could not find any events.");
  }

  const index = storedData.fabs.findIndex((ev) => ev.idThought === id);
  if (index < 0) {
    throw new NotFoundError("Could not find event for id " + id);
  }

  storedData.fabs[index] = { ...data, id };

  await writeDataFav(storedData);
}

async function removeFav(id) {
  const storedData = await readDataFav();
  const updatedData = storedData.events.filter((ev) => ev.id !== id);
  await writeDataFav({ ...storedData, events: updatedData });
}

exports.getAllFav = getAllFav;
// exports.get = get;
exports.addFav = addFav;
exports.readDataFav = readDataFav;
exports.removeFav = removeFav;
exports.replaceFav = replaceFav;
