import React from "react";

export default function Navbar({ pendingTasksTitle, user, logoutHandler }) {
  return (
    <header className="text-gray-600 body-font shadow-md">
      <div className="md:mx-8  mb-4 flex flex-wrap p-5 items-center">
        <a className="flex title-font font-medium items-center  text-gray-900">
          📝️
          <h1 className="ml-2 text-2xl md:text-3xl">To Do List</h1>
          <span className="ml-3 text-xl  font-normal md:text-2xl">{pendingTasksTitle}</span>
        </a>
        {user && (
          <button
            onClick={logoutHandler}
                className=" ml-auto bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded text-sm md:text-base whitespace-nowrap"
          >
            {user.username} 🚪
          </button>
        )}
      </div>
    </header>
  );
}
