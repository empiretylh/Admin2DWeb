import axios from "axios";
// axios.defaults.baseURL = 'http://10.0.1.225:8000/'
// axios.defaults.baseURL = 'http://10.42.0.1:8000';
// axios.defaults.baseURL = "http://10.0.1.82:8000";
axios.defaults.baseURL =   'https://thaimyanmar2d.pythonanywhere.com';
// https://thaimyanmar2d.pythonanywhere.com/admin/

export const getTwoDDaliy = () => {
  return axios.get("https://api.thaistock2d.com/live");
};

export const getThreeDhistory = () => {
  return axios.get("https://api.2dboss.com/api/v2/v1/2dstock/threed-result");
};

export const getTwoDHistory = () => {
  // last 10 days
  return axios.get("https://api.thaistock2d.com/2d_result");
};

export const getTwoDHistoryByDate = (date) => {
  // last 10 days
  return axios.get("https://api.thaistock2d.com/history?date=" + date);
};

export const getLiveTwoDServerUpdate = () => {
  return axios.get("/api/livetwod/");
};

export const postLiveTwoD = (data) => {
  return axios.post("/api/livetwod/", data);
};
export const getFeeds = () => {
  return axios.get("/api/feeds/");
};

export const onLike = (data) => {
  return axios.post("/api/like/", data);
};

export const getLike = (data) => {
  return axios.get("/api/like/", data);
};

export const getSearch = ({ queryKey }) => {
  const [_, searchtext] = queryKey;
  return axios.get("/api/search/?search=" + searchtext);
};
export const register = (data) => {
  axios.defaults.headers.common = {};
  return axios.post("/auth/register/", data);
};

export const getUsers = () => {
  return axios.get("/api/profile/");
};

export const getEtsdata = (data) => {
  return axios.get("/api/gift/ets/");
};

export const postEtsData = (data) => {
  return axios.get("/api/gift/ets/", data);
};

export const getGiftImage = ({ queryKey }) => {
  const [_, type] = queryKey;
  return axios.get("/api/gift/giftimage/?type=" + type);
};

export const getAdImages = ({ queryKey }) => {
  return axios.get("/api/gift/adimages/");
};

export const getModernInternetData = () => {
  return axios.get("https://luke.2dboss.com/api/luke/twod-result-live");
};

export const deleteAdImages = (data) => {
  return axios.delete("/api/gift/adimages/?id=" + data.id);
};

export const deletePost = (data) => {
  return axios.delete("/api/feeds/?postid=" + data?.id);
};

export const getAllUsers = (data) => {
  return axios.get("/api/profile/?type=all");
};

export const sendNoti = (data) => {
  return axios.post("/api/sendnoti/", data);
};

export const deleteUser = (data) => {
  return axios.delete("/api/profile/?id=" + data?.id);
};

export const postModernInternet = (data) => {
  return axios.post("/api/moderninternet/", data);
};

export const createVIPCode = (data) => {
  return axios.post("/api/vip/createcode/", data);
};
export const getVIPCodes = (data) => {
  return axios.get("/api/vip/createcode/", data);
};

export const verifyVIPCode = (data) => {
  return axios.post("/api/vip/verifycode/", data);
};

export const getPhoneNumber = (data) => {
  return axios.get("/api/adminvibernumber/", data);
};

export const postPhoneNumber = (data) => {
  return axios.post("/api/adminvibernumber/", data);
};

export const deletePhoneNumber = (data) => {
  return axios.delete("/api/adminvibernumber/?id=" + data?.id);
};

export const postNoti = (data) => {
  return axios.post("/api/sendnoti/", data);
};

export const getShowAd = () => {
  return axios.get("/api/showad/");
};

export const postShowAd = (data)=>{
  return axios.post("/api/showad/", data)
}
