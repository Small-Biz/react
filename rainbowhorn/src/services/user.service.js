import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8090/api/hello';
const API_URL_ADMIN = 'http://localhost:8090/admin/hello';
const API_URL_USER = 'http://localhost:8090/user/hello';

class UserService {
  getPublicContent() {
    return axios.get(API_URL);
  }

  getUserBoard() {
    return axios.get(API_URL_USER, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL_ADMIN, { headers: authHeader() });
  }
}

export default new UserService();