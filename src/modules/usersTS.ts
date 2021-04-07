//액션타입
const CHANGE_FIELD = 'users/CHANGE_FIELD' as const;
const INITIALIZE_FORM = 'users/INITIALIZE_FORM' as const;
const LOGIN = 'users/LOGIN' as const;

//액션 생성 함수
export const changeField = () => ({
  type: CHANGE_FIELD,
});

export const login = (accessToken: string) => ({
  type: LOGIN,
  payload: accessToken,
});

type UserAction = ReturnType<typeof login> | ReturnType<typeof changeField>;

type UserState = {
  isLoggedIn: boolean;
  accessToken: string;
};

const initialState: UserState = {
  isLoggedIn: false,
  accessToken: '',
};

function users(state: UserState = initialState, action: UserAction) {
  switch (action.type) {
    case LOGIN:
      return { isLoggedIn: true, accessToken: action.payload };
    default:
      return state;
  }
}

export default users;
