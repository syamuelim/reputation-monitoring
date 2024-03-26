import axios from "axios";
import { baseUrl } from "../../AppConfig";
const instagramRootPath = baseUrl + "api/instagram/";
const instagramGetIdPath = instagramRootPath + ":id";
const instagramCreatePostPath = instagramGetIdPath + "/posts";
const instagramCreatePostResponsePath = instagramGetIdPath + "/response";
const instagramGetPostIdPath = instagramRootPath + "post/:id";
const instagramGetPostCountPath = instagramRootPath + "post/:id/Count";

export const getInstagramUserById = (id) => {
  return axios.get(instagramGetIdPath.replace(":id", id), {
    params: { 
        startDate: startDate, 
        endDate: endDate
    },
  });
};

export const getInstagramPostPyId = (id, page, itemPerPage) => {
  return axios.get(instagramGetPostIdPath.replace(":id", id), {
    params: { 
        page: page, 
        itemPerPage: itemPerPage
    },
  });
};

export const getInstagramPostCountById = (id) => {
  return axios.get(instagramGetPostCountPath.replace(":id", id)
  );
};

export const createInstagramPostsResponse = (id, response) => {
  return axios.post(instagramCreatePostResponsePath.replace(":id", id), response
  );
};
