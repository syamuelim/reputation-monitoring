import axios from "axios";
import {baseUrl} from "../../AppConfig";
const studentRootPath = baseUrl + "api/kol/";
const influencerGetIdPath = studentRootPath + ":id";

export const getStudents = () => {
  return axios.get(studentRootPath);
};

export const getInfluencerById = (id) => {
  return axios.get(influencerGetIdPath.replace(":id", id));
};


export const postStudent = (studentData) => {
  return axios.post(studentRootPath, studentData);
};
