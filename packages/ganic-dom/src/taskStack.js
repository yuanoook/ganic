const stackSize = 1000;
const taskStackGroup = [];

const taskify = fn => (...args) => {
  const task = () => fn(...args);
  let taskStack = taskStackGroup[taskStackGroup.length - 1];
  if (taskStack && taskStack.length < stackSize) {
    taskStack.push(task);
  } else {
    taskStackGroup.push([task]);
  }
};

const clearTaskStack = taskStack => {
  const length = taskStack.length;
  for (let i = 0; i < length; i++) {
    taskStack[i]();
  }
  taskStack.length = 0;
};

const timeBudget = 50;
const restGap = 25;

let startAt;
const clearTasks = () => {
  if (taskStackGroup.length === 0) {
    return;
  }
  startAt = Date.now();
  do {
    clearTaskStack(taskStackGroup.shift());
    if (taskStackGroup.length === 0) {
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
