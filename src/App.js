import Main from './components/Main';
import { UserContextProvider } from './components/useUserContext';

function App() {
  return (
    <>
      <UserContextProvider>
        <Main />
      </UserContextProvider>
    </>
  );
}

export default App;
