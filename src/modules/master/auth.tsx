import produce from 'immer';
import { ActionType, createAction, createReducer } from 'typesafe-actions';

const MASTER_CHANGE_FIELD = 'master-auth/MASTER_CHANGE_FIELD';
const MASTER_INITIALIZE_FORM = 'master-auth/MASTER_INITIALIZE_FORM';

type ChangeFieldProps = {
  form: string;
  key: string;
  value: string;
};

export const masterChangeField = createAction(
  MASTER_CHANGE_FIELD,
)<ChangeFieldProps>();

export const masterInitializeForm = createAction(
  MASTER_INITIALIZE_FORM,
)<string>();

const actions = { masterChangeField, masterInitializeForm };
type AuthAction = ActionType<typeof actions>;

export type MasterSignUpReqType = {
  [index: string]: string;
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
};

export type MasterLoginReqType = {
  [index: string]: string;
  email: string;
  password: string;
};
type AuthState = {
  [index: string]: MasterSignUpReqType | MasterLoginReqType;
  signUp: MasterSignUpReqType;
  login: MasterLoginReqType;
};

const initialState: AuthState = {
  signUp: {
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    email: '',
    password: '',
  },
};

export const masterAuth = createReducer<AuthState, AuthAction>(initialState, {
  [MASTER_CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
    produce(state, draft => {
      draft[form][key] = value;
    }),
  [MASTER_INITIALIZE_FORM]: (state, { payload: form }) => ({
    ...state,
    form: initialState[form],
  }),
});
