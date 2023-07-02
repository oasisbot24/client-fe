import Title from '@components/Basic/Title';
import React from 'react';
import {useState} from 'react';
import loginSubmit from '@ipc/Login/loginSubmit';
import Error from '@components/Basic/Error';

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

  const onSubmit = e => {
    setSubmitting(true);
    e.preventDefault();
    loginSubmit({email: email, password: password}, setError, setSubmitting);
  };

  return (
    <div>
      <Title className="text-blue-400 fs-2 mb-3"> LOGIN </Title>
      <div className="card">
        <form method="post" onSubmit={onSubmit}>
          <div className="mb-3">
            <Title className="fs-4 mb-5">E-Mail</Title>
            <input
              name="email"
              placeholder="E-Mail"
              value={email}
              onChange={onChangeInput}
            ></input>
          </div>
          <div className="mb-3">
            <Title className="fs-4 mb-5">PassWord</Title>
            <input
              name="password"
              placeholder="PassWord"
              value={password}
              type="password"
              onChange={onChangeInput}
            ></input>
          </div>
          {submitting ? (
            <div className="w-100 btn bg-gray-300 text-white">
              <p> 로그인 중... </p>
            </div>
          ) : (
            <button className="w-100 btn-contained-blue" type="submit">
              <p> 로그인 </p>
            </button>
          )}
          <Error content={error} className="mt-4" />
        </form>
      </div>
    </div>
  );
};

export default Login;
