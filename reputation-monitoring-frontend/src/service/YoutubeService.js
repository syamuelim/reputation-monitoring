import axios from "axios";
import { baseUrl } from "../../AppConfig";
const youtubeRootPath = baseUrl + "api/youtube_channel/";
const youtubeExternalPath = youtubeRootPath + "external/channel";
const youtubeExternalCommentPath =  youtubeExternalPath + "/comments";
const youtubeExternalChannelPath = youtubeExternalPath + "/Details";
const youtubeExternalVideoPath = youtubeExternalPath + "/videos";
const youtubeCreatePath = youtubeRootPath + "create";
const youtubeGetIdPath = youtubeRootPath + ":id";
const youtubeResponsePath = youtubeGetIdPath + "/response";

export const getYoutbeChannel = () => {
  return axios.get(youtubeRootPath);
};

export const getExternalVideo = (request) => {
  return axios.get(youtubeExternalVideoPath, {
    params: request,
  });
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

export const getExternalYoutbeChannelComments = (request) => {
  return axios.get(youtubeExternalCommentPath, {
    params: request,
  });
};

export const getYoutubeChannelById = (id) => {
  return axios.get(youtubeGetIdPath.replace(":id", id));
};

export const youtubeResponseCreate = (id, request) => {
  return axios.post(youtubeResponsePath.replace(":id", id), request);
};

export const postYoutubeChannel = (youtubeChannelData) => {
  return axios.post(youtubeCreatePath, youtubeChannelData);
};
