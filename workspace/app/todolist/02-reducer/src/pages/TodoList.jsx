import TodoItem from "@pages/TodoItem";
import PropTypes from "prop-types";

function TodoList({ itemList, toggleDone, deleteItem }) {
  const list = itemList.map((item) => (
    <TodoItem
      key={item._id}
      item={item}
      toggleDone={toggleDone}
      deleteItem={deleteItem}
    />
  ));
  return <ul className="todolist">{list}</ul>;
}

TodoList.propTypes = {
  itemList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    })
  ).isRequired,
  toggleDone: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default TodoList;
