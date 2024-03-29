import axios from "axios";
import { baseUrl } from "../../AppConfig";
const youtubeRootPath = baseUrl + "api/youtube_channel/";
const youtubeExternalPath = youtubeRootPath + "external/channel";
const youtubeExternalChannelPath = youtubeExternalPath + "/Details";
const youtubeCreatePath = youtubeRootPath + "create";
const youtubeGetIdPath = youtubeRootPath + ":id";

export const getYoutbeChannel = () => {
  return axios.get(youtubeRootPath);
};

export const getExternalYoutbeChannels = (request) => {
  return axios.get(youtubeExternalPath, {
    params: request,
  });
};

export const getExternalYoutbeChannelDetails = (request) => {
  return axios.get(youtubeExternalChannelPath, {
    params: request,
  });
};

export const getYoutubeChannelById = (id) => {
  return axios.get(youtubeGetIdPath.replace(":id", id));
};

export const postYoutubeChannel = (youtubeChannelData) => {
  return axios.post(youtubeCreatePath, youtubeChannelData);
};
