import React from "react";

const AddTask = ({ title, setTitle, onsubmithandler }) => {
  return (
    <form
      className="flex flex-col gap-4 mt-5"
      onSubmit={(e) => {
        onsubmithandler(e);
      }}
    >
      <input
        type="text"
        placeholder="Add new task..."
        className="w-full border border-blue-300 py-3 px-3 rounded-md outline-none bg-white"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <button
        className="bg-blue-500 text-white py-3 rounded-md cursor-pointer active:opacity-80"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default AddTask;
