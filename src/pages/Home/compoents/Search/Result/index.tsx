import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import {useLocation} from 'react-router-dom'
import { useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSearchResults} from "@/store/action/search";
import { InfiniteScroll } from 'antd-mobile-v5'
import {RootState} from "@/store";
import ArticleItem from "@/pages/Home/compoents/ArticleItem";
let page = 1
const SearchResult = () => {
    const location=useLocation()
    // 获取通过 URL 地址传入的查询字符串参数
    const search = new URLSearchParams(location.search)
    const key = search.get('key')!
    const dispatch = useDispatch()
    const results = useSelector((state:RootState) => state.search.results)
    // 是否有更多数据
    const [hasMore, setHasMore] = useState(true)
    // 加载状态
    const [loading, setLoading] = useState(false)
    const loadMore = async () => {
        if (loading) return
        setLoading(true)
        await dispatch(getSearchResults(key, page))
        page = page + 1
        setLoading(false)
        if (page > 5) {
            setHasMore(false)
        }
    }
    return (
        <div className={styles.root}>
            {/* 顶部导航栏 */}
            <NavBar className='navbar'>搜索结果</NavBar>

            <div className="article-list">
                {results.map((item) => (
                    <ArticleItem
                        // @ts-ignore
                        key={item.art_id}
                        article={item}
                        channelId={-1}
                    ></ArticleItem>
                ))}
            </div>
            {/* 无限加载 */}
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </div>
    )
}

export default SearchResult
