import { prisma } from "@/db";
import Link from "next/link";
import { Todoitem } from '../components/Todoitem';

function getTodo() {
  return prisma.todo.findMany();
}

export default async function Home() {
  const todos = await getTodo();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          href="/new"
          className="border border-cyan-300 text-cyan-300 px-2 py-1 rounded hover:bg-cyan-700 focus-within:bg-cyan-700 outline-none"
        >
          New
        </Link>
      </header>

      <ul className="pl-4">
        {todos.map((todo) => (
          <Todoitem key={todo.id} {...todo}/>
        ))}
      </ul>
    </>
  );
}
