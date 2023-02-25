import styles from './index.module.scss'
import ArticleItem from "@/pages/Home/compoents/ArticleItem";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getArticleList} from "@/store/action/home";

/**
 * 文章列表组件
 * @param {String} props.channelId 当前文章列表所对应的频道ID
 * @param {String} props.aid 当前 Tab 栏选中的频道ID
 */
const ArticleList = ({ channelId, aid }) => {
    const dispatch=useDispatch()
    const current = useSelector((state) => state.home.articles[channelId])
    useEffect(() => {
        //如果页面有数据（切换tab栏） 就不必再发请求
        if (current)  return
         //频道id等于当前频道id
        if (channelId === aid) {
            dispatch(getArticleList(channelId, Date.now()))
        }
    }, [channelId, aid,dispatch,current])
    //如果不是当前频道，没有文章数据，先不渲染
    if (!current) return null;
    console.log(current);
    return (
        <div className={styles.root}>
            <div className="articles">
                {current.list.map((item) => (
                    <div className="article-item" key={item.art_id}>
                        <ArticleItem className="article-item" article={item}></ArticleItem>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ArticleList
