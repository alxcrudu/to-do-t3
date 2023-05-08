import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { API } from "~/utils/api";

import Navbar from "~/components/Navbar";

const Home: NextPage = () => {
  const [newTask, setNewTask] = useState("");
  const [editing, setEditing] = useState({ newTitle: "", selectedId: "" });
  const [error, setError] = useState<string | null>(null);
  const { data: sessionData } = useSession();

  const { data: tasks, refetch: refetchTasks } = API.TaskRouter.getAll.useQuery(
    undefined,
    { enabled: sessionData?.user !== undefined }
  );

  const addTask = API.TaskRouter.addTask.useMutation({
    onSuccess: () => {
      void refetchTasks();
    },
  });

  const deleteTask = API.TaskRouter.deleteById.useMutation({
    onSuccess: () => {
      void refetchTasks();
    },
  });

  const editTask = API.TaskRouter.editTask.useMutation({
    onSuccess: () => {
      void refetchTasks();
    },
  });

  console.log('test')

  return (
    <>
      <Head>
        <title>To-do app</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative z-0 h-screen w-screen bg-waves-haikei bg-cover bg-bottom overflow-y-auto px-6">
        <Navbar />
        {sessionData ? (
          <>
            <div className="mt-12 flex justify-center gap-3">
              <form
                className="flex gap-1 w-full lg:w-[45em]"
                onSubmit={(e) => {
                  if(newTask.length < 1) setError('Please input your task before submitting!')
                  e.preventDefault();
                  addTask.mutate({
                    title: newTask,
                  });
                  setNewTask("");
                }}
              >
                <input
                  type="text"
                  placeholder="Add new task"
                  className="input-bordered input w-full"
                  value={newTask}
                  onChange={(e) => {
                    if(newTask.trim() != "") setError(null)
                    setNewTask(e.target.value)
                  }}
                />
                <input
                  className="btn-primary btn border-none font-light normal-case shadow-xl"
                  type="submit"
                  value="Add task"
                />
              </form>
            </div>
            <div className="w-full lg:w-[45em] grid place-items-center text-red-600 mt-2">{error}</div>
            <div className="mt-12 flex flex-col items-center gap-6 mb-12">
              {tasks?.map((task, i) => (
                <div
                  key={i}
                  className="card w-full bg-primary bg-opacity-50 shadow-xl lg:w-[45em]"
                >
                  <div className="card-body flex flex-row items-center justify-between p-4">
                    {editing.selectedId === task.id ? (
                      <>
                        <input
                          type="text"
                          value={editing.newTitle}
                          className="input-primary input input-sm"
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              newTitle: e.currentTarget.value,
                            })
                          }
                        />
                        <button
                          onClick={() => {
                            if (editing.newTitle !== task.title) {
                              editTask.mutate({
                                title: editing.newTitle,
                                id: task.id,
                              });
                            }
                            setEditing({ newTitle: "", selectedId: "" });
                          }}
                          className="btn-primary btn-sm btn rounded-full text-sm font-light normal-case"
                        >
                          update
                        </button>
                      </>
                    ) : (
                      <>
                        <p
                          onClick={() =>
                            editTask.mutate({ id: task.id, done: !task.done })
                          }
                          className={`text-primary-content cursor-pointer ${
                            task.done ? "line-through opacity-60" : ""
                          }`}
                        >
                          {task.title}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setEditing({
                                newTitle: task.title ?? "",
                                selectedId: task.id,
                              })
                            }
                            className="btn-primary btn-sm btn rounded-full border-none text-sm font-light normal-case"
                          >
                            edit
                          </button>
                          <button
                            onClick={() =>
                              editTask.mutate({ id: task.id, done: !task.done })
                            }
                            className="btn-primary btn-sm btn rounded-full text-sm font-light text-green-500"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => deleteTask.mutate({ id: task.id })}
                            className="btn-primary btn-sm btn rounded-full text-sm font-light text-red-500"
                          >
                            X
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {tasks && tasks.length == 0 && (
                <div className="flex w-full justify-center text-sm opacity-60">
                  <p className="">You currently have no tasks ✅</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="mt-6 flex w-full justify-center">
            <p className="">Sign in to add or view your tasks...</p>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
