import { prisma } from "@/db";
import Link from "next/link";
import { Todoitem } from "../components/Todoitem";
import { revalidatePath } from "next/cache";





async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.todo.update({ where: { id }, data: { complete } });
}


async function toDelete(id: string) {
  "use server";
  try {
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });
    
    if (existingTodo) {
      await prisma.todo.delete({ where: { id } });
    
      revalidatePath("/")
    } else {
      console.error(`Todo with id ${id} does not exist.`);
    }
  } catch (error) {
    console.error('An error occurred while deleting the todo:', error);
  }
}

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
          className="border border-cyan-300 text-cyan-300 px-4 py-1 rounded hover:bg-cyan-700 focus-within:bg-cyan-700 outline-none"
        >
          New
        </Link>
      </header>

      <ul className="pl-4">
        {todos && todos.map((todo) => (
          <Todoitem key={todo.id} {...todo} toggleTodo={toggleTodo} toDelete={toDelete} />
        ))}
      </ul>
    </>
  );
}
