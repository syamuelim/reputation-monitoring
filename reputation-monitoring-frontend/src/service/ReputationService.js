import axios from "axios";
import { baseUrl } from "../../AppConfig";
const reputationRootPath = baseUrl + "api/reputation/";
const reputationGetIdPath = reputationRootPath + ":id";

export const getReputationById = (id, startDate, endDate) => {
  return axios.get(reputationGetIdPath.replace(":id", id), {
    params: {
      startDate: startDate,
      endDate: endDate,
    },
  });
};

export const createReputation = (request) => {
  return axios.post(reputationRootPath, request);
};
