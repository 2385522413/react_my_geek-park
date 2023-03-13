import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from "@/store";
import {Provider} from "react-redux";
import '@/index.css'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

ReactDOM.render(
    <Provider store={store}>
        <App></App>
    </Provider>
    ,
  document.getElementById('root')
)
