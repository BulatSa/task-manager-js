import API from "./api/index.js";
import Provider from "./api/provider.js";
import BoardComponent from "./components/board.js";
import BoardController from "./controllers/board.js";
import FilterController from "./controllers/filters.js";
import SiteMenuComponent, { MenuItem } from "./components/site-menu.js";
import StatisticComponent from "./components/statistics.js";
import TasksModel from "./models/tasks.js";
import { render, RenderPosition } from "./utils/render.js";

const AUTHORIZATION = `Basic asdasdoefkoxcpofkspoemf`;
const END_POINT = `https://11.ecmascript.pages.academy/task-manager`;

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const api = new API(END_POINT, AUTHORIZATION);
const apiWithProvider = new Provider(api);
const tasksModel = new TasksModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuComponent();
const statisticComponent = new StatisticComponent({
  tasks: tasksModel,
  dateFrom,
  dateTo,
});

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel, apiWithProvider);
const filterController = new FilterController(siteMainElement, tasksModel);

render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
filterController.render();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
render(siteMainElement, statisticComponent, RenderPosition.BEFOREEND);
statisticComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      SiteMenuComponent.setActiveItem(MenuItem.TASKS);
      statisticComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticComponent.show();
      break;
    case MenuItem.TASKS:
      statisticComponent.hide();
      boardComponent.show();
      break;
  }
});

apiWithProvider.getTasks().then((tasks) => {
  tasksModel.setTasks(tasks);
  boardController.render();
});
