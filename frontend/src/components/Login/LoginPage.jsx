import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Msg from '../general/Msg';
import axios from 'axios';
import { useUserContext } from '../useUserContext';
import logo from './../../logos/logo__full-white.svg';

const LoginPage = () => {
  let navigate = useNavigate();

  const { user, refresh } = useUserContext();

  if (user && user.isAuthenticated === true) {
    refresh();
    navigate('/');
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post('/login', { username, password });
      if (response.data === 'loginSuccessful') {
        refresh();
        setError(null);
        navigate('/');
      }
    } catch (error) {
      console.error(error.message);
      setError({
        bolded: 'שגיאה',
        msg: `שם משתמש או סיסמא לא נכונים.`,
      });
    }
  };

  return (
    <>
      <section className="flex items-center justify-center min-h-screen m-2 background">
        <div className="w-full max-w-md py-12 m-2 bg-gray-900 rounded px-7 drop-shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="mb-4" dir="rtl">
              <img src={logo} alt="shift scheduler's logo" />
              <h2 className="text-xl font-bold text-center text-white">ServIT שלום!</h2>
            </div>
            <div dir="rtl">
              <input
                className="w-full p-4 text-sm text-gray-600 border border-gray-200 rounded bg-gray-50 focus:outline-none"
                type="text"
                placeholder="שם משתמש"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div dir="rtl">
              <input
                className="w-full p-4 text-sm text-gray-600 border border-gray-200 rounded bg-gray-50 focus:outline-none"
                type="password"
                placeholder="סיסמא"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                className="w-full py-4 text-sm font-bold transition duration-200 bg-blue-600 rounded hover:bg-blue-700 text-gray-50"
                type="submit"
              >
                התחבר
              </button>
            </div>
            {error && <Msg bolded={error.bolded} msg={error.msg} status={false} />}
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
