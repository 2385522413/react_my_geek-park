import NavBar from '@/components/NavBar'
import NoComment from '../NoComment'
import CommentFooter from '../CommentFooter'
import styles from './index.module.scss'
import {Comment} from "@/store/reducers/article";
import CommentItem from "@/pages/Article/components/CommentItem";
import {useEffect, useState} from "react";
import http from "@/utils/http";
import {InfiniteScroll} from "antd-mobile-v5";

/**
 * 回复评论界面组件
 * @param {Object} props.originComment 原评论数据
 * @param {String} props.articleId 文章ID
 * @param {Function} props.onClose 关闭抽屉的回调函数
 */
type Props = {
    articleId?: string
    onClose?: () => void
    originComment: Comment
}
const CommentReply = ({articleId, onClose, originComment}: Props) => {
    useEffect(() => {
        const fetchDate = async () => {
            const res = await http.get('/comments', {
                params: {
                    type: 'c',
                    source: originComment.com_id
                }
            })
            setReplyList(res.data)
        }
        fetchDate()
    }, [originComment])

    const [replyList, setReplyList] = useState({
        end_id: '',
        last_id: '',
        results: [] as Comment[],
        total_count: 0,
    })
    const hasMore = replyList.last_id !== replyList.end_id
    const loadMore = async () => {
        const res = await http.get('/comments', {
            params: {
                type: 'c',
                source: originComment.com_id,
                offset:replyList.last_id
            }
        })
        setReplyList({
            ...res.data,
            results: [...replyList.results,...res.data.results]
        })
    }
    return (
        <div className={styles.root}>
            <div className="reply-wrapper">

                {/* 顶部导航栏 */}
                <NavBar className="transparent-navbar" onLeftClick={onClose}>
                    <div>{originComment.reply_count}条回复</div>
                </NavBar>

                {/* 原评论信息 */}
                <div className="origin-comment">
                    <CommentItem type="reply" comment={originComment}></CommentItem>
                </div>

                {/* 回复评论的列表 */}
                <div className="reply-list">
                    <div className="reply-header">全部回复</div>
                    {
                        originComment.reply_count === 0 ? (
                            <NoComment/>
                        ) : (
                            replyList.results.map((item) =>
                                <CommentItem type="reply" comment={item} key={item.com_id}></CommentItem>
                            ))
                    }
                    <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
                </div>

                {/* 评论工具栏，设置 type="reply" 不显示评论和点赞按钮 */}
                <CommentFooter type='reply'/>
            </div>

        </div>
    )
}

export default CommentReply
