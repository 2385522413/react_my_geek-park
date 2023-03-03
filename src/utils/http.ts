import axios, {AxiosError} from "axios";
import {Toast} from "antd-mobile";
import {getTokenInfo, removeTokenInfo, setTokenInfo} from "@/utils/storage";
import store from "@/store";
import {history} from "@/utils/history";
import {logout, saveToken} from "@/store/action/login";

const baseURL = "http://toutiao.itheima.net/v1_0";
// 1. 创建新的 axios 实例
const http = axios.create({
    timeout: 5000,
    baseURL
});

// 2. 设置请求拦截器和响应拦截器
http.interceptors.request.use((config) => {
    // 获取缓存中的 Token 信息
    const token = getTokenInfo().token;
    if (token) {
        // 设置请求头的 Authorization 字段
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});
http.interceptors.response.use(response => {
        return response.data;
    },
    async (err: AxiosError<{message:string}>) => {
        // 如果是网络错误
        if (!err.response) {
            Toast.info("网络繁忙，请稍后重试");
            return Promise.reject(err);
        }

        // 如果有响应,但是不是401错误
        if (err.response.status !== 401) {
            Toast.info(err.response.data.message);
            return Promise.reject(err);
        }

        const {token, refresh_token} = getTokenInfo();
        // 如果是401错误
        // 如果没有token或者刷新token
        if (!token || !refresh_token) {
            // 跳转到登录页，并携带上当前正在访问的页面，等登录成功后再跳回该页面
            history.replace("/login", {
                from: history.location.pathname || "/home"
            });
            return Promise.reject(err);
        }
        // 如果有token，且是401错误
        try {
            // 通过 Refresh Token 换取新 Token
            // 特别说明：这个地方发请求的时候，不能使用新建的 http 实例去请求，要用默认实例 axios 去请求！
            // 否则会因 http 实例的请求拦截器的作用，携带上老的 token 而不是 refresh_token
            const res = await axios.put(`${baseURL}/authorizations`, null, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${refresh_token}`
                }
            });

            // 将新换到的 Token 信息保存到 Redux 和 LocalStorage 中
            const tokenInfo = {
                token: res.data.token,
                refresh_token
            };
            setTokenInfo(tokenInfo);
            store.dispatch(saveToken(tokenInfo));

            // 重新发送之前因 Token 无效而失败的请求
            return http(err.config);
        } catch (error) {
            // 如果换取token失败
            removeTokenInfo()
            store.dispatch(logout({
                token: '',
                refresh_token: '',
            }));
            // 跳转到登录页，并携带上当前正在访问的页面，等登录成功后再跳回该页面
            history.replace("/login", {
                from: history.location
            });
            Toast.info("登录信息失效");
            return Promise.reject(error);
        }
    }
);

// 3. 导出该 axios 实例
export default http;
