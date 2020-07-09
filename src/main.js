import BoardComponent from "./components/board";
import FilterComponent from "./components/filter";
import LoadMoreButtonComponent from "./components/load-more-button";
import TaskEditComponent from "./components/task-edit";
import TaskComponent from "./components/task";
import TaskComponents from "./components/tasks";
import SiteMenuComponent from "./components/site-menu";
import SortComponent from "./components/sort";
import { generateTasks } from "./mock/task";
import { generateFilters } from "./mock/filter";
import { render, RenderPosition } from "./utils";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = () => {};

const renderBoard = () => {};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(
  siteHeaderElement,
  new SiteMenuComponent().getElement(),
  RenderPosition.BEFOREEND
);
render(
  siteMainElement,
  new FilterComponent().getElement(),
  RenderPosition.BEFOREEND
);
