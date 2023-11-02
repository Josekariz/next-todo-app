"use client";

type TodoitemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
  toDelete: (id: string) => void;
};

export function Todoitem({
  id,
  title,
  complete,
  toggleTodo,
  toDelete,
}: TodoitemProps) {
  return (
    <li className="flex gap-1 items-center mb-2 p-1">
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={complete}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      <label
        htmlFor={id}
        className="cursor-pointer peer-checked:line-through peer-checked:text-cyan-700 text-lg"
      >
        {title}
      </label>
      <button
        onClick={() => toDelete(id)} // Pass the id to the toDelete function
        className="btn glass p-1 text-cyan-100 text-sm rounded-sm hover:bg-cyan-600"
      >
        x
      </button>
    </li>
  );
}
