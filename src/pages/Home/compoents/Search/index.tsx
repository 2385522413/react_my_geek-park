import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import classnames from 'classnames'
import {useHistory} from 'react-router'
import styles from './index.module.scss'
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addSearchList, clearHistories, clearSuggestions, getSuggestList} from "@/store/action/search";
import {RootState} from "@/store";
import {Dialog} from "antd-mobile-v5";

const Search = () => {
    const history = useHistory()
    const [key, setKey] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const timeRef = useRef(-1)
    const dispatch = useDispatch()
    const {suggestions,historys} = useSelector((state: RootState) => {
        return state.search
    })
    //清空历史记录
    const onClearHistory=()=>{
        // 清空历史记录
        Dialog.confirm({
            title: '温馨提示',
            content: '你确定要清空记录吗？',
            onConfirm: function () {
                dispatch(clearHistories())
            },
        })
    }
    //搜索
    const onSearch=(keyword:string)=>{
        dispatch(addSearchList(keyword))
         //跳转搜索页
        history.push('/search/result?key=' + keyword)
    }
    //清空输入框
    const onClose=()=>{
        setKey('');
        setIsSearching(false);
        //清楚redux数据
        dispatch(clearSuggestions())
    }
    //高亮处理
    const highLight=(str:string,keyword:string)=>{
        const reg=new RegExp(keyword,'gi')
        return str.replace(reg, (match) => {
            return `<span style="color: red;">${match}</span>`
        })
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value
        clearInterval(timeRef.current)
        setKey(text)
        timeRef.current = window.setTimeout(() => {
            if (text) {
                setIsSearching(true)
                dispatch(getSuggestList(text));
            }else {
                setIsSearching(false)
            }
        }, 500)
    }
    useEffect(() => {
        return () => {
            clearInterval(timeRef.current)
        }
    }, [])
    return (
        <div className={styles.root}>
            {/* 顶部导航栏 */}
            <NavBar
                className="navbar"
                onLeftClick={() => history.go(-1)}
                extra={
                    <span className="search-text"  onClick={() => onSearch(key)}>搜索</span>
                }
            >
                <div className="navbar-search">
                    <Icon type="iconbtn_search" className="icon-search"/>

                    <div className="input-wrapper">
                        {/* 输入框 */}
                        <input type="text" placeholder="请输入关键字搜索" value={key} onChange={onChange}/>

                        {/* 清空输入框按钮 */}
                        <Icon type="iconbtn_tag_close" className="icon-close" onClick={()=>{
                            onClose()
                        }}/>
                    </div>
                </div>
            </NavBar>

            {/* 搜索历史 */}
            <div className="history" style={{display: isSearching?'none':'block'}}>
                <div className="history-header">
                    <span>搜索历史</span>
                    <span onClick={onClearHistory}>
                        <Icon type="iconbtn_del"/>清除全部
                     </span>
                </div>

                <div className="history-list">
                    {historys.map((item, index) => {
                        return (
                            <span
                                className="history-item"
                                key={index}
                                onClick={() => onSearch(item)}
                            >
                              {index !== 0 && <span className="divider"></span>}{item}
                             </span>
                        )
                    })}
                </div>
            </div>

            {/* 搜素建议结果列表 */}
            <div className={classnames('search-result', isSearching?'show':false)}>
                {suggestions.map((item, index) => {
                    return (
                        <div className="result-item" key={index}  onClick={()=>{onSearch(item)}}>
                            <Icon className="icon-search" type="iconbtn_search"/>
                            <div className="result-value"
                                 dangerouslySetInnerHTML={{ __html: highLight(item, key) }}
                            ></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Search
