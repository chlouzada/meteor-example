import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/collections/TasksCollection";
import { Task } from "./Task.jsx";
import TaskForm from "./TaskForm.jsx";

export const App = () => {
  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
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

  return (
    <div>
      <header class="bg-gradient-to-r from-blue-400 to-purple-900 p-4 shadow-sm">
        <h1 class="text-2xl mr-4">📝️ To Do List</h1>
      </header>

      <div class="flex flex-col flex-grow overflow-auto bg-white">
        <TaskForm />

        <ul class="list-none px-4">
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={toggleChecked}
              onDeleteClick={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
