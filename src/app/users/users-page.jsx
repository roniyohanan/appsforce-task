import React, { useEffect, useState } from 'react';
import { getUsers } from '../../fetchData';
import UserCard from './user-card';
import styles from './users.module.scss';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);

  const setData = async () => {
    const data = (await getUsers()).results;
    const allUsers = data.map((user)=>{
      return {
        name: `${user.name.title} ${user.name.first} ${user.name.first}`,
        email: user.email,
        image: user.picture.medium,
        location: `${user.location.country} ${user.location.city} ${user.location.street.name} ${user.location.street.number}`,
        uuid: user.login.uuid,
      }
    })
    setUsers(allUsers);
  }

  useEffect(() => {
    setData();
  }, []);

 const onDelete = (i) =>{
  const newData = users.slice(0,i).concat(users.slice(i+1))
  setUsers(newData);
 }

 const onUpdate = (i, info) =>{
  const newData = users;
  newData[i] = info;
  setUsers(newData);
 }

  return (
    <div className={styles.root}>
      {users.map((user, i)=><UserCard key={user.uuid} userData={user} index={i} onDelete={onDelete} onUpdate={onUpdate}/>)}
    </div>
  )
}