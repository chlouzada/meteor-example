import React from "react";

export default function Navbar({ pendingTasksTitle, user, logoutHandler }) {
  return (
    <header className="text-gray-600 body-font shadow-md">
      <div className="md:mx-8  mb-4 flex flex-wrap p-5 items-center">
        <a className="flex title-font font-medium items-center text-gray-900">
          📝️
          <h1 className="ml-3 text-xl">To Do List</h1>
          <span className="ml-3 text-xl">{pendingTasksTitle}</span>
        </a>
        {user && (
          <button
            onClick={logoutHandler}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base ml-auto"
          >
            {user.username} 🚪
          </button>
        )}
      </div>
    </header>
  );
}
