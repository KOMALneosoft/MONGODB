import axios from "axios";
import { MAIN_URL } from "./Url";
let token = localStorage.getItem("_token");

export function getPosts() {
  return axios.get(`${MAIN_URL}fetchpost`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function addUser(data) {
  return axios.post(`${MAIN_URL}adduser`, data);
}
export function verify() {
  return axios.get(`${MAIN_URL}verify`);
}
export function login(data) {
  return axios.post(`${MAIN_URL}login`, data);
}
// export function deletePosts(){
//     return axios.post(`${MAIN_URL}posts/deletepost/:id`);
// }
