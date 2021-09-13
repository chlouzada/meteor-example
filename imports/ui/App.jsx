import React, { useState, Fragment } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from '/imports/db/TasksCollection';
import { Task } from "./Task.jsx";
import TaskForm from "./TaskForm.jsx";
import { LoginForm } from "./LoginForm.jsx";
import Navbar from "./Navbar.jsx";

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  const userFilter = user ? { userId: user._id } : {};

  const completedFilter = { isChecked: { $ne: true } };

  const pendingOnlyFilter = { ...completedFilter, ...userFilter };

  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }
    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  });

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }

    return TasksCollection.find(pendingOnlyFilter).count();
  });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

  const toggleChecked = ({ _id, isChecked }) => {
    // TasksCollection.update(_id, {
    //   $set: {
    //     isChecked: !isChecked,
    //   },
    // });
    Meteor.call("tasks.setIsChecked", _id, !isChecked);
  };

  const deleteTask = ({ _id }) => {
    // TasksCollection.remove(_id);
    Meteor.call("tasks.remove", _id);
  };

  const handleFilterButton = () => {
    setHideCompleted(!hideCompleted);
  };

  return (
    <div>
      <Navbar
        pendingTasksTitle={pendingTasksTitle}
        user={user}
        logoutHandler={logout}
      />

      <div className="container flex flex-col flex-grow mx-auto overflow-auto bg-white">
        {user ? (
          <Fragment>
            <TaskForm user={user} />

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
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
