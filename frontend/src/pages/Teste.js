import React, { useState, useEffect, useContext } from 'react';

import api from '../api';


export default function Teste() {

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

      <button type="button" class="btn btn-primary position-relative">
  Inbox
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    99+
    <span class="visually-hidden">unread messages</span>
  </span>
</button>

    </>
  );
}