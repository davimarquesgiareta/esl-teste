import React, { useState, useEffect, useContext } from 'react';

import api from '../api';
import { Context } from '../Context/AuthContext';


export default function Teste() {
  const { handleLogout } = useContext(Context);

  const [users, setUsers] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/teste');

      setUsers(data);
    })();
  }, []);

  console.log(users)

  return (
    <>
      <ul>
        {users.msg}
      </ul>

      <button type="button" className="btn btn-primary position-relative">
  Inbox
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    99+
    <span className="visually-hidden">unread messages</span>
  </span>
</button>
<br/>
<button type="button" onClick={handleLogout}>Sair</button>
    </>
  );
}