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
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Adicione o título da sua tarefa"
      />
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
}
