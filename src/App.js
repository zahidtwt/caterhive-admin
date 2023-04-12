import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Authenticated from './Routes/Authenticated/Authenticated.component';
import Unauthenticated from './Routes/Unauthenticated/Unauthenticated.component';
import { getOwnData } from './services/caterer';

function App() {
  const [user, setUser] = useState(null);

  const getUser = useCallback(async () => {
    const user = await getOwnData();

    setUser(user);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) getUser();
  }, [getUser]);

  return (
    <div className="App">{user ? <Authenticated /> : <Unauthenticated />}</div>
  );
}

export default App;
