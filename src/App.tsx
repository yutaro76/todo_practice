import { useState } from 'react';

type Todo = {
  value: string;
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
    }

    // todosには今のtodoのリストが入っている。それを一度展開して、最初に新しいtodoを追加する。
    setTodos((todos) => [newTodo, ...todos]);

    // textを操作するメソッドsetTextを介して、textを空にする。
    setText('');
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
          return <li>{todo.value}</li>;
        })}
      </ul>
    </div>
  );
};