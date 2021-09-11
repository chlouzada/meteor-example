import React, { useState } from "react";
import { TasksCollection } from "../api/collections/TasksCollection";

export default function TaskForm({ user }) {
  const [text, setText] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (!text) return;

    TasksCollection.insert({
      text: text.trim(),
      userId: user._id,
      createdAt: new Date(),
    });

    setText("");
  };

  return (
    <form onSubmit={submitHandler} className="flex m-4">
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Adicione o título da sua tarefa"
        className="flex-grow box-border px-4 py-2 bg-transparent border border-gray-300 w-full text-base mr-4 outline-none"
      />
      <button
        className="bg-blue-500 whitespace-nowrap px-2 border border-gray-600 rounded"
        type="submit"
      >
        Add Task
      </button>
    </form>
  );
}
