import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

function Todo(props) {
  return (
    <div id="main">
      <div id="container">
        <ul>
          <li>
            <h2>쇼핑 목록</h2>
            <TodoInput addItem={props.addItem} />
            <TodoList
              itemList={props.itemList}
              toggleDone={props.toggleDone}
              deleteItem={props.deleteItem}
            />
            {/* <TodoList {...props} /> */}
            {/* 무작정 다 넘겨버리는 건 좋은 생각은 아니다~ 하위 컴포넌트에서 쓰면 안되는 게 있을 수 있음 */}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Todo;
