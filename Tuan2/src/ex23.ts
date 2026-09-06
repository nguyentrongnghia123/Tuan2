interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function getCompletedTodos() {
  try {
    console.log("Đang lấy danh sách todos...");
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos: Todo[] = await response.json();

    const completedTodos = todos.filter((todo) => todo.completed === true);
    console.log(
      `Đáp án (Lấy 3 todos đã hoàn thành trong tổng số ${completedTodos.length}):`,
    );
    console.log(completedTodos.slice(0, 3));
  } catch (err: any) {
    console.log("Lỗi:", err.message);
  }
}

getCompletedTodos();
