import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

export default function TaskForm({ user }) {
  const [text, setText] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (!text) return;

    Meteor.call("tasks.insert", text.trim());

    setText("");
  };

  return (
    <form onSubmit={submitHandler} className="flex gap-3  md:gap-6 m-4">
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder=""
        className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base whitespace-nowrap">
        Nova Tarefa
      </button>
    </form>
  );
}
