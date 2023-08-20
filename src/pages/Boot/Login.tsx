import React from 'react';
import {useState} from 'react';
import Error from '@components/Basic/Error';
import loginSubmit from '@ipc/Login/loginSubmit';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onChangeInput = e => {
    const {value, name} = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const onSubmit = async e => {
    setSubmitting(true);
    e.preventDefault();
    try {
      await loginSubmit({email: email, password: password});
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setSubmitting(false);
  };

  return (
    <div className="h-100">
      <form
        method="post"
        onSubmit={onSubmit}
        className="d-flex-column  justify-content-between h-100"
      >
        <div>
          <div className="mb-3">
            <input
              className=""
              name="email"
              placeholder="E-Mail"
              value={email}
              onChange={onChangeInput}
            ></input>
          </div>
          <div>
            <input
              className=""
              name="password"
              placeholder="PassWord"
              value={password}
              type="password"
              onChange={onChangeInput}
            ></input>
          </div>
        </div>
        <div>
          <Error content={error} className="mb-4" />
          {submitting ? (
            <div className="w-100 btn bg-gray-300 text-white">
              <p> 로그인 중... </p>
            </div>
          ) : (
            <button className="w-100 btn-contained-blue" type="submit">
              <p> 로그인 </p>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
