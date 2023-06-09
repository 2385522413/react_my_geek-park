import styles from './index.module.scss'
import ArticleItem from "@/pages/Home/compoents/ArticleItem";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getArticleList} from "@/store/action/home";
import {InfiniteScroll, PullToRefresh} from "antd-mobile-v5";
import {RootState} from "@/store";
/**
 * 文章列表组件
 * @param {String} props.channelId 当前文章列表所对应的频道ID
 * @param {String} props.aid 当前 Tab 栏选中的频道ID
 */
type Props={
    channelId:number
    aid?:number
}
const ArticleList = ({ channelId, aid }:Props) => {
    const dispatch=useDispatch()
    const current = useSelector((state:RootState) => state.home.articles[channelId])
    useEffect(() => {
        //如果页面有数据（切换tab栏） 就不必再发请求
        if (current)  return
         //频道id等于当前频道id
        if (channelId === aid) {
            dispatch(getArticleList(channelId, Date.now()+''))
        }
    }, [channelId, aid,dispatch,current])

    //下拉加载更多
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const loadMore = async () => {
        // 在加载中，不需要加载
        if (loading) return
        // 如果不是当前频道，不加载数据
        if (channelId !== aid) return
        // 没有更多数据的处理
        if (!current.timestamp) {
            setHasMore(false)
            return
        }
        setLoading(true)
        try {
            await dispatch(getArticleList(channelId, current.timestamp,true))
        }finally {
            setLoading(false)
        }
    }

    //如果不是当前频道，没有文章数据，先不渲染
    if (!current) return null;
    //下拉刷新
    const onRefresh = () => {
        setHasMore(true)
        dispatch(getArticleList(channelId, Date.now()+""))
    }
    return (
        <div className={styles.root}>
            <div className="articles">
                <PullToRefresh
                    // @ts-ignore
                    onRefresh={onRefresh}>
                    {current.list.map((item) => (
                        <div className="article-item" key={item.art_id}>
                            <ArticleItem article={item} channelId={channelId}></ArticleItem>
                        </div>
                    ))}
                </PullToRefresh>
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
            </div>
        </div>
    )
}

export default ArticleList
