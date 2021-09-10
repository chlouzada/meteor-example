import React, { useState, Fragment } from "react";
import { Meteor } from 'meteor/meteor';
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/collections/TasksCollection";
import { Task } from "./Task.jsx";
import TaskForm from "./TaskForm.jsx";
import { LoginForm } from "./LoginForm.jsx";

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const completedFilter = { isChecked: { $ne: true } };

  const user = useTracker(() => Meteor.user());

  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? completedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch()
  );

  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked,
      },
    });
  };

  const deleteTask = ({ _id }) => {
    TasksCollection.remove(_id);
  };

  const handleFilterButton = () => {
    setHideCompleted(!hideCompleted);
  };

  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(completedFilter).count()
  );

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

  return (
    <div>
      <header className="bg-gradient-to-r from-blue-400 to-purple-900 p-4 shadow-sm">
        <h1 className="text-2xl mr-4">📝️ To Do List {pendingTasksTitle}</h1>
      </header>

      <div className="flex flex-col flex-grow overflow-auto bg-white">
        {user ? (
        <Fragment>
          <TaskForm />

          <div className="flex justify-center">
            <button
              onClick={handleFilterButton}
              className="bg-blue-500 border rounded border-gray-600 px-2 py-1"
            >
              {hideCompleted ? "Show All" : "Hide completed"}
            </button>
          </div>

          <ul className="list-none px-4">
            {tasks.map((task) => (
              <Task
                key={task._id}
                task={task}
                onCheckboxClick={toggleChecked}
                onDeleteClick={deleteTask}
              />
            ))}
          </ul>
        </Fragment>
        ) : (<LoginForm/>) }
      </div>
    </div>
  );
};
