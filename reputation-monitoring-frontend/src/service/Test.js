import axios from "axios";
import {baseUrl} from "../../AppConfig";
const studentRootPath = baseUrl + "api/student/";

export const getStudents = () => {
  return axios.get(studentRootPath);
};

export const postStudent = (studentData) => {
  return axios.post(studentRootPath, studentData);
};