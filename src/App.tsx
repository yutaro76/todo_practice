import { useState } from 'react';

type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

export const App = () => {

  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] =useState<Filter>('all');

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

  const handleSort = (filter: Filter) => {
    setFilter(filter);
  }

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed; // removedがfalse
      case 'checked':
        return todo.checked && !todo.removed; // checkedがtrueかつremovedがtrue
      case 'unchecked':
        return !todo.checked && !todo.removed; // chekcedがfalseかつremovedがfalse
      case 'removed':
        return todo.removed; // removedがtrue;
      default:
        return todo;
    }
  })

  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed)); // removedがfalseのものだけ残す
  }

  return (
    <div>
      <select 
        defaultValue="all" 
        onChange={(e) => handleSort(e.target.value as Filter)}
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>
      {filter === 'removed' ? (
        <button 
        onClick={handleEmpty}
        disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          ごみ箱を空にする
        </button>
      ) : (
        filter !== 'checked' && (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
            <input 
              type="text" 
              value={text} 
              // disabled={filter === 'checked' || filter === 'removed'}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="submit"
              value="追加"
              // disabled={filter === 'checked' || filter === 'removed'}
              onSubmit={handleSubmit}
            />
          </form>

        )
      )
      }
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
              type="checkbox"
              disabled={todo.removed}
              checked={todo.checked}
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