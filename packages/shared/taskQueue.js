const queueSize = 1000;
const taskQueueGroup = [];

const taskify = fn => (...args) => {
  const task = () => fn(...args);
  let taskQueue = taskQueueGroup[taskQueueGroup.length - 1];
  if (taskQueue && taskQueue.length < queueSize) {
    taskQueue.push(task);
  } else {
    taskQueueGroup.push([task]);
  }
};

const clearTaskQueue = taskQueue => {
  const length = taskQueue.length;
  for (let i = 0; i < length; i++) {
    taskQueue[i]();
  }
  taskQueue.length = 0;
};

const timeBudget = 50;
const restGap = 25;

let startAt;
const clearTasks = () => {
  if (taskQueueGroup.length === 0) {
    return;
  }
  startAt = Date.now();
  do {
    clearTaskQueue(taskQueueGroup.shift());
    if (taskQueueGroup.length === 0) {
      return;
    }
  } while (
    Date.now() - startAt < timeBudget
  );
  setTimeout(clearTasks, restGap);
};

module.exports = {
  taskify,
  clearTasks,
};
