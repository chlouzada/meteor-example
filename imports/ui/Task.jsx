import React from "react";

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  return (
    <li className="flex items-center p-4 border-b border-gray-200 ">
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span className="flex-grow ml-2">{task.text}</span>
      <button
        className="justify-self-end bg-red-700 px-2 border border-gray-600 rounded"
        onClick={() => onDeleteClick(task)}
      >
        &times;
      </button>
    </li>
  );
};
