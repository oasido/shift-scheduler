import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Msg from '../general/Msg';
import axios from 'axios';
import { useUserContext } from '../useUserContext';

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
      <section className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="max-w-md w-full bg-gray-900 rounded p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="mb-4" dir="rtl">
              <p className="text-gray-400">לא יודע מה לרשום כאן</p>
              <h2 className="text-xl font-bold text-white">התחבר לפוקסיט</h2>
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="text"
                placeholder="שם משתמש"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
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
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
                type="submit"
              >
                התחבר
              </button>
            </div>
            {error && <Msg bolded={error.bolded} msg={error.msg} status={false} />}

            <div className="flex justify-end text-white">הרשם</div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
