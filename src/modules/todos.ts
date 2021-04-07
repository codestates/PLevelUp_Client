//액션 타입

/*as const는 const assertions라는 TypeScript 문법입니다. 
이 문법을 사용하면 우리가 추후 액션 생성함수를 통해 
액션 객체를 만들게 됐을 때 type의 TypeScript 타입이 
string이 되지 않고 실제값을 가르키게 됩니다 */
const ADD_TODO = 'todos/ADD_TODO' as const;
const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const;
const REMOVE_TODO = 'todos/REMOVE_TODO' as const;

//액션 생성 함수

export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: text,
});

export const toggleTodo = (id: number) => ({
  type: TOGGLE_TODO,
  payload: id,
});
export const removeTodo = (id: number) => ({
  type: REMOVE_TODO,
  payload: id,
});

//액션들의 타입스크립트 타입 준비
//여기서의 "type"은 TypeScript의 타입을 의미합니다.
//나중에 우리가 리듀서를 작성 할 때 action 파라미터의 타입을 설정하기 위해서
//우리가 만든 모든 액션들의 TypeScript 타입을 준비해주어야 합니다.
//ReturnType 은 함수에서 반환하는 타입을 가져올 수 있게 해주는 유틸 타입입니다.
type TodosAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof toggleTodo>
  | ReturnType<typeof removeTodo>;

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodoState = Todo[];

const initialState: TodoState = [
  { id: 1, text: '타입스크립트 배우기', done: true },
  { id: 2, text: '타입스크립트와 리덕스 함께 사용해보기', done: true },
  { id: 3, text: '투두리스트 만들기', done: false },
];

//리듀서 구현

function todos(
  state: TodoState = initialState,
  action: TodosAction,
): TodoState {
  switch (action.type) {
    case ADD_TODO:
      const nextId = Math.max(...state.map(todo => todo.id)) + 1;
      return state.concat({
        id: nextId,
        text: action.payload,
        done: false,
      });
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
      );
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

export default todos;
