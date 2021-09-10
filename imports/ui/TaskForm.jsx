import React, { useState } from "react";
import { TasksCollection } from "../api/collections/TasksCollection";

export default function TaskForm() {
  const [text, setText] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (!text) return;

    TasksCollection.insert({
      text: text.trim(),
      createdAt: new Date(),
    });

    setText("");
  };

  return (
    <form onSubmit={submitHandler} class="flex m-4">
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Adicione o título da sua tarefa"
        class="flex-grow box-border px-4 py-2 bg-transparent border border-gray-300 w-full text-base mr-4 outline-none"
      />
      <button class="bg-blue-500 whitespace-nowrap px-2 border border-gray-600" type="submit">Add Task</button>
    </form>
  );
}
