import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Feed = () => {
  const [task, setTask] = useState("");
  const [usertask, setUserTask] = useState([]);

  const onsubmithandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/user/task", {
        task,
      });
      toast.success(response.data.message);
      await gettask();
      setTask("");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const gettask = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/task");
      setUserTask(res.data.task);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gettask();
  }, []);

  // Task delete Method

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/user/task/${id}`,
      );
      toast.success(res.data.message);

      setUserTask((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.log(error);

      toast.error("failed to task deleted");
    }
  };

  // delete Many
  const allTaskdelete = async () => {
    try {
      const res = await axios.delete("http://localhost:3000/api/user/task");
      toast.success(res.data.message);
      setUserTask([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-600 flex justify-center items-start p-3">
      <div className="w-full sm:w-96 bg-gray-200 rounded-xl p-4">
        {/* Heading */}
        <h1 className="text-white text-2xl font-bold text-center bg-green-500 py-2 px-4 rounded">
          MY Task
        </h1>

        {/* Add Task UI */}
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
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />

          <button
            className="bg-blue-500 text-white py-3 rounded-md cursor-pointer active:opacity-80"
            type="submit"
          >
            Add
          </button>
        </form>

        {/* Filter UI */}

        <div className="flex justify-evenly items-center mt-5">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            All
          </button>

          <button className="bg-white text-black py-2 px-4 rounded-md">
            Pending
          </button>

          <button className="bg-white text-black py-2 px-4 rounded-md">
            Completed
          </button>
        </div>
        {/* Clear Button */}
        <div className="flex justify-center items-center mt-5">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md cursor-pointer"
            onClick={() => {
              allTaskdelete();
            }}
          >
            Clear All Tasks
          </button>
        </div>

        {/* Task Info */}
        <p className="mt-5 text-sm">
          You have 0 task(s) and completed 0% out of 100%
        </p>

        {/* Task List UI */}
        <div className="flex flex-col gap-3 mt-5">
          {usertask.map((elem, idx) => {
            return (
              <div
                className="w-full bg-white py-3 px-3 rounded-md flex justify-between items-center"
                key={idx}
              >
                <div className="flex gap-3 items-center">
                  <input type="checkbox" />
                  <p>{elem.task}</p>
                </div>

                <span
                  className="cursor-pointer"
                  onClick={() => {
                    deleteTask(elem._id);
                  }}
                >
                  🗑️
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
