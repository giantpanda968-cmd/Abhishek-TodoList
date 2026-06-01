import React from "react";
import AddTask from "../components/addTask";
import FilterTask from "../components/filterTask";
import ListTask from "../components/listTask";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const BASE_URL = "https://todolist-backend-rvaq.onrender.com";

const Feed = () => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState([]);
  const [filter, setFilter] = useState("All");

  const onsubmithandler = async (e) => {
    e.preventDefault();
    try {
      if (title.trim() === "") {
        alert("⚠️ Your Task is Empty");
      } else {
        await axios.post(
          `${BASE_URL}/api/task`,
          { title },
          { withCredentials: true },
        );
        await response();

        setTitle("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const response = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/task`, {
        withCredentials: true,
      });

      setTask(res.data.task);
    } catch{
      Navigate("/login");
    }
  };
  useEffect(() => {
    response();
  }, []);

  const clearAlltask = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/task`, { withCredentials: true });
      await response();
    } catch (error) {
      console.log(error);
    }
  };

  const deletetask = async (idx) => {
    try {
      await axios.delete(`${BASE_URL}/api/task/${idx}`, {
        withCredentials: true,
      });
      await response();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-600 flex justify-center items-start p-3">
      <div className="w-full sm:w-96 bg-gray-200 rounded-xl p-4">
        {/* Input Section */}

        <h1 className="text-white text-2xl font-bold text-center bg-green-500 py-2 px-4 rounded">
          MY Task
        </h1>

        <AddTask
          title={title}
          setTitle={setTitle}
          onsubmithandler={onsubmithandler}
        />

        {/* Filter Buttons */}
        <FilterTask filter={filter} setFilter={setFilter} />

        {/* Clear Button */}
        <div className="flex justify-center items-center mt-5">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md cursor-pointer"
            onClick={clearAlltask}
          >
            Clear All Tasks
          </button>
        </div>

        {/* Task Info */}
        <p className="mt-5 text-sm">
          You have {task.length} task(s) and completed 33% out of 100%
        </p>

        {/* Task List */}

        <ListTask task={task} deletetask={deletetask} />
      </div>
    </div>
  );
};

export default Feed;
