const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readDataEvents, writeDataEvents } = require("./util");

async function getAll() {
  const storedData = await readDataEvents();
  if (!storedData.events) {
    throw new NotFoundError("Could not find any events.");
  }
  return storedData.events;
}

async function get(id) {
  const storedData = await readDataEvents();
  // console.log(storedData);
  if (!storedData.events || storedData.events.length === 0) {
    throw new NotFoundError("Could not find any events.");
  }

  const event = storedData.events.find((ev) => ev.id === id);
  if (!event) {
    throw new NotFoundError("Could not find event for id " + id);
  }

  return event;
}

async function add(data) {
  const storedData = await readDataEvents();
  // console.log(storedData);
  storedData.events.unshift({ ...data, id: generateId() });
  await writeDataEvents(storedData);
}

async function replaceEvents(id, data) {
  const storedData = await readDataEvents();
  if (!storedData.events || storedData.events.length === 0) {
    throw new NotFoundError("Could not find any events.");
  }

  const index = storedData.events.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError("Could not find event for id " + id);
  }

  storedData.events[index] = { ...data, id };

  await writeDataEvents(storedData);
}

async function removeEvent(id) {
  const storedData = await readDataEvents();
  const updatedData = storedData.events.filter((ev) => ev.id !== id);
  await writeDataEvents({ ...storedData, events: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replaceEvents = replaceEvents;
exports.removeEvent = removeEvent;
