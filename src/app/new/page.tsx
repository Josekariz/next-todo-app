import Link from "next/link";
import { prisma } from "@/db";
import React from "react";
import { redirect } from "next/navigation";

async function createTodo(data: FormData) {
  "use server";
  const title = data.get("title")?.valueOf();

  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }
  await prisma.todo.create({
    data: {
      title,
      complete: false,
    },
  });

  redirect("/");
}

export default function page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New</h1>
      </header>

      <form action={createTodo} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          className="border border-cyan-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-cyan-100"
        />
        <div className="flex gap-8 justify-center">
          <Link
            href=".."
            className="border border-cyan-300 text-cyan-300 px-4 py-1 rounded hover:bg-cyan-700 focus-within:bg-cyan-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-cyan-300 text-cyan-300 px-4 py-1 rounded hover:bg-cyan-700 focus-within:bg-cyan-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
