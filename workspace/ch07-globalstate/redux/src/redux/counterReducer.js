import { COUNTER_ACTION } from "@redux/counterActionCreator";

const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case COUNTER_ACTION.UP:
      // 불변성 안 지킨 잘못된 예
      // state.count += action.payload.step;
      // return state;

      // 새로운 객체로 만들어서 반환해야 함
      return { ...state, count: state.count + action.payload.step };

    case COUNTER_ACTION.DOWN:
      return { ...state, count: state.count - action.payload.step };

    case COUNTER_ACTION.RESET:
      return { ...state, count: 0 };

    default:
      return state;
  }
}

export default counterReducer;
