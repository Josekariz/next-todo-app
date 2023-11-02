type TodoitemProps = {
  id: string;
  title: string;
  complete: Boolean;
};

export function Todoitem({ id, title, complete }: TodoitemProps) {
  return (
    <li className="flex gap-1 items-center ">
      <input id={id} type="checkbox" className="cursor-pointer peer" />
      <label htmlFor={id} className="cursor-pointer peer-checked:line-through peer-checked:text-cyan-700" >{title}</label>
    </li>
  );
}
