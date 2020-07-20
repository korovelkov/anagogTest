import React from 'react';
import { IUser } from '../../../redux/user/types';

import './style.scss';

interface IProps {
  users: IUser[];
}

function UsersList(props: IProps) {
  const { users } = props;
  return (
    <div>
      <div>Users</div>
      <ul className="UsersList__list">
        {users.map(user => (
          <li className="UsersList__item" key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
