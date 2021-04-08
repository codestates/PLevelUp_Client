// import React, { useEffect, useState } from 'react';
// import SignUpForm from '../../components/auth/SignUpForm.js';
// import { useDispatch, useSelector } from 'react-redux';
// import { changeField } from '../../modules/login';
// // import { changeField, initializeForm, signup } from '../../modules/auth';
// import { check } from '../../modules/user';
// import { withRouter } from 'react-router-dom';

// const SignUpFormContainer = ({ history }) => {
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();
//   // const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
//   //   form: auth.signup,
//   //   auth: auth.auth,
//   //   authError: auth.authError,
//   //   user: user.user,
//   // }));
//   const onChange = e => {
//     const { name, value } = e.target;
//     dispatch(
//       changeField({
//         form: 'signup',
//         key: name,
//         value,
//       }),
//     );
//   };
//   const onSubmit = async e => {
//     e.preventDefault();
//     const { email, password, passwordConfirm, username } = form;
//     if (
//       email === '' ||
//       password === '' ||
//       passwordConfirm === '' ||
//       username === ''
//     ) {
//       setError(`빈칸 없이 모두 입력해주세요`);
//       return;
//     }
//     if (password !== passwordConfirm) {
//       setError('비밀번호를 확인이 일치하지 않습니다.');
//       return;
//     }
//     dispatch(signup({ email, password, username }));
//   };

//   useEffect(() => {
//     // dispatch(initializeForm('signup'));
//   }, [dispatch]);

//   useEffect(() => {
//     if (authError) {
//       console.log('오류발생');
//       console.log(authError);
//       if (authError.response.status === 409) {
//         setError('이미 존재하는 이메일입니다.');
//       }
//       return;
//     }
//     if (auth) {
//       console.log('회원가입 성공');
//       console.log(auth);
//       // dispatch(check()); //onSubmit 시 로그인 되어 토큰이 쿠키에 담아 발급됨
//       // 이후 auth에 res.data가 생기게 되고, auth 생겼을 때
//       // check() 실행되면서 로그인 유저정보가 기록된다.
//     }
//   }, [auth, authError, dispatch]);

//   useEffect(() => {
//     // localStorag를 통한 로그인(&새로고침) 시 해당 user를 체크하여 보여준다.
//     if (user) {
//       console.log('Check API 성공');
//       console.log(user);
//       // history.push('/'); // 홈화면으로이동
//       try {
//         localStorage.setItem('user', JSON.stringify(user));
//       } catch (e) {
//         console.log('localStorage is not working');
//       }
//     }
//   }, [history, user]);

//   return (
//     <SignUpForm
//       onChange={onChange}
//       onSubmit={onSubmit}
//       error={error}
//       form={form}
//     />
//   );
// };

// export default withRouter(SignUpFormContainer);
