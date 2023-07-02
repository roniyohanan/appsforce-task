import axios from 'axios';

export async function getUsers() {
    return (
      await axios({
        method: 'get',
        url: 'https://randomuser.me/api/?results=10',
      })
    ).data;
  }