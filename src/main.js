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

const renderTask = (taskListElement, task) => {
  const onEditButtonClick = () => {
    taskListElement.replaceChild(
      taskEditComponent.getElement(),
      taskComponent.getElement()
    );
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();

    taskListElement.replaceChild(
      taskComponent.getElement(),
      taskEditComponent.getElement()
    );
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent
    .getElement()
    .querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  render(
    boardComponent.getElement(),
    new SortComponent.getElement(),
    RenderPosition.BEFOREEND
  );
  render(
    boardComponent.getElement(),
    new TasksComponent.getElement(),
    RenderPosition.BEFOREEND
  );

  const taskListElement = boardComponent
    .getElement()
    .querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount).forEach((task) => {
    renderTask(taskListElement, task);
  });

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(
    boardComponent.getElement(),
    loadMoreButtonComponent.getElement(),
    RenderPosition.BEFOREEND
  );

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTaskCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks
      .slice(prevTaskCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.remove();
    }
  });
};

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
