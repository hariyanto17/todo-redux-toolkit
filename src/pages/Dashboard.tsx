import { useCallback, useRef } from "react";
import Done from "../components/Done";
import ICTrash from "../components/ICTrash";
import { todoApi } from "../store";
import { TodoData } from "../utils";

const Dashboard = () => {
  const todoRef = useRef<HTMLInputElement>(null);

  const { data: todos, isLoading, isError, error } = todoApi.useGetAllQuery();
  const [addTodo] = todoApi.useAddTodoMutation();
  const [deleteTodo] = todoApi.useDeleteTodoMutation();
  const [updateTodo] = todoApi.useUpdateTodoMutation();

  const onToggle = useCallback(
    (todo: TodoData) => updateTodo({ ...todo, done: !todo.done }),
    [updateTodo]
  );

  const onAdd = useCallback((): void => {
    const value = todoRef.current?.value || "";
    console.log("todoRed", todoRef);
    if (value !== "") {
      addTodo(value);
      todoRef.current!.value = "";
    }
  }, [addTodo]);

  const onDelete = useCallback(
    (todo: TodoData) => deleteTodo(todo),
    [deleteTodo]
  );

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>errorr</p>;

  return (
    <div className="container">
      {todos?.data.length ? (
        todos?.data?.map((todo: TodoData) => (
          <div className="todo" key={todo.uuid}>
            <p>{todo.title}</p>
            <div className="ic-container">
              <Done isDone={todo.done} onClick={() => onToggle(todo)} />
              <ICTrash onClick={() => onDelete(todo)} />
            </div>
          </div>
        ))
      ) : (
        <h1>You have no todos</h1>
      )}
      <input placeholder="Type your next todo" ref={todoRef} />
      <button onClick={onAdd}>Add</button>
    </div>
  );
};

export default Dashboard;
