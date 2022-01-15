import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../general/Error';
import axios from 'axios';

const RegisterPage = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      setError(null);
      const response = await axios.post('/register', { username, password });
      if (response.data === 'UserAlreadyExists') setError({ bolded: 'שגיאה', msg: 'שם משתמש כבר קיים' });
      if (response.data === 'Registered') navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="max-w-md w-full bg-gray-900 rounded p-6">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="mb-4" dir="rtl">
              <p className="text-gray-400">לא יודע מה לרשום כאן</p>
              <h2 className="text-xl font-bold text-white">הרשם</h2>
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="text"
                placeholder="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200" type="submit">
                הרשם
              </button>
            </div>
            {error && <Error bolded={error.bolded} msg={error.msg} />}

            <div className="flex justify-end text-white">התחבר</div>
          </form>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
