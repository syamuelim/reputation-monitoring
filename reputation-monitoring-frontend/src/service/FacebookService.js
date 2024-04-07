import axios from "axios";
import { facebookUrl } from "../../AppConfig";

// {
//     "data": [
//         {
//             "access_token": "EAAJjmJ...",
//             "category": "App Page",
//             "category_list": [
//                 {
//                     "id": "2301",
//                     "name": "App Page"
//                 }
//             ],
//             "name": "Metricsaurus",
//             "id": "134895793791914",  // capture the Page ID
//             "tasks": [
//                 "ANALYZE",
//                 "ADVERTISE",
//                 "MODERATE",
//                 "CREATE_CONTENT",
//                 "MANAGE"
//             ]
//         }
//     ]
// }
export const getPageId = (accessToken) => {
    return axios.get(facebookUrl + "me/accounts", {
        params: {
            access_token: accessToken
        }
    });
};

// {
//     "instagram_business_account": {
//         "id": "17841405822304914"  // Connected IG User ID
//     },
//     "id": "134895793791914"  // Facebook Page ID
// }
export const getInstagramUserId = (fbPageId, accessToken) => {
    return axios.get(facebookUrl + fbPageId, {
        params: {
            fields: "instagram_business_account",
            access_token: accessToken
        }
    })
};

// {
//     "business_discovery": {
//         "followers_count": 456364,
//             "media_count": 2141,
//                 "id": "17841401441775531" //businessAccountId
//     },
//     "id": "17841462821063699" igUserId
// }
export const getBusinessAccount = (igUserId, accountName, accessToken) => {
    return axios.get(facebookUrl + igUserId, {
        params: {
            fields: `business_discovery.username(${accountName}){followers_count,media_count,username,website,name,profile_picture_url,biography,media{comments_count,like_count,timestamp,caption,id, media_url}}`,
            access_token: accessToken
        }
    })
};