import { useState } from 'react';
import './App.css';
import Authenticated from './Routes/Authenticated/Authenticated.component';
import Unauthenticated from './Routes/Authenticated/Unauthenticated/Unauthenticated.component';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">{user ? <Authenticated /> : <Unauthenticated />}</div>
  );
}

export default App;
