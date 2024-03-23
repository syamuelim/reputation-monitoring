import axios from "axios";
import {baseUrl} from "../../AppConfig";
const influencerRootPath = baseUrl + "api/kol/";
const influencerGetIdPath = influencerRootPath + ":id";

export const getInfluencers = () => {
  return axios.get(influencerRootPath);
};

export const getInfluencerById = (id) => {
  return axios.get(influencerGetIdPath.replace(":id", id));
};


export const postInfluencers = (influencerData) => {
  return axios.post(influencerRootPath, influencerData);
};
