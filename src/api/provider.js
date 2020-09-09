import Task from "../models/task.js";
import Tasks from "../components/tasks.js";

const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getTasks() {
    if (isOnline()) {
      return this._api.getTasks().then((tasks) => {
        tasks.forEach((task) => this._store.setItem(task.id, task.toRAW()));

        return tasks;
      });
    }

    const storeTasks = Object.values(this._store.getItems());

    return Promise.resolve(Task.parseTasks(storeTasks));
  }

  createTask(task) {
    if (isOnline()) {
      return this._api.createTask(task);
    }

    return Promise.reject(`offline`);
  }

  updateTask(id, task) {
    if (isOnline()) {
      return this._api.updateTask(id, task).then((newTask) => {
        this._store.setItem(newTask.id, newTask.toRAW());

        return newTask;
      });
    }

    const localTask = Task.clone(Object.assign(task, { id }));

    this._store.setItem(id, localTask.toRAW());

    return Promise.resolve(localTask);
  }

  deleteTask(id) {
    if (isOnline()) {
      return this._api.deleteTask(id);
    }

    return Promise.reject(`offline`);
  }
}
