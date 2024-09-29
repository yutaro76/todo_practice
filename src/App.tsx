import { useState } from 'react';

type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

export const App = () => {

  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // todosステート（todoのリスト）を更新する関数
  // イベントリスナー（onsubmit）に渡す関数をコールバック関数という。
  const handleSubmit = () => {
    
    // 何も入力されていなければリターン
    if (!text) return;

    // 新しいtodoを作成
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(), 
      checked: false,
      removed: false,
    }

    // todosには今のtodoのリストが入っている。それを一度展開して、最初に新しいtodoを追加する。
    setTodos((todos) => [newTodo, ...todos]);

    // textを操作するメソッドsetTextを介して、textを空にする。
    setText('');
  };

  const handleEdit = (id: number, value: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value: value };
        }
        // 新しい値が入ったtodoをtodosに返し、それが変数のnewTodosに格納される
        return todo;
      });

      return newTodos;
    }

    )
  }

  const handleCheck = (id: number, checked: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked };
        }
        return todo;
      });

      return newTodos;
    });
  };

  const handleRemove = (id: number, removed: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, removed };
        }
        return todo;
      });
      return newTodos;
    });
  };

  return (
    <div>
      <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <input 
        type="text" 
        value={text} 
        onChange={(e) => handleChange(e)} />
        <input
          type="submit"
          value="追加"
          onSubmit={handleSubmit}
        />
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
              type="checkbox"
              checked={todo.checked}
              disabled={todo.removed}
              onChange={() => handleCheck(todo.id, !todo.checked)}
              />
              <input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
              <button onClick={() => handleRemove(todo.id, !todo.removed)}>
                {/* removedの初期の値はfalse。falseでは削除が表示され、trueでは復元が表示される */}
                {todo.removed ? '復元' : '削除'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};