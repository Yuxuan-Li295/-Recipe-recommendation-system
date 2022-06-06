import axios from 'axios';

const rootURL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';

export default async function checkUser(userName, password, callback) {
  const response = await axios.get(`${rootURL}/login/${userName}/${password}`, {
  });
  const result = response.data;
  console.log(result.success);
  return callback(result.success, result.data, result.error);
}
