import axios from "axios";
import { baseUrl } from "../../AppConfig";
const audienceRootPath = baseUrl + "api/audience/";
const audienceGetPath = audienceRootPath + ":id";


export const getAudience = (id) => {
  return axios.get(audienceGetPath.replace(":id", id));
};
