import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import {useHistory} from 'react-router'
import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {useParams} from 'react-router'
import {getArticleComments, getArticleInfo, getMoreCommentList} from "@/store/action/article";
import {RootState} from "@/store";
import dayjs from "dayjs";
import classNames from "classnames";
import {throttle} from "lodash";
import NoComment from "@/pages/Article/components/NoComment";
import CommentItem from "@/pages/Article/components/CommentItem";
import {InfiniteScroll} from "antd-mobile-v5";
import CommentFooter from "@/pages/Article/components/CommentFooter";
import {Drawer} from "antd-mobile";
import Share from "@/pages/Article/components/Share";

const Article = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const Params = useParams<{ id: string }>()
    const info = useSelector((state: RootState) => {
        // @ts-ignore
        return state.article.info
    })
    const comment = useSelector((state: RootState) => {
        // @ts-ignore
        return state.article.comment
    })

    // 获取动态路由参数
    const articleId = Params.id

    useEffect(() => {
        //获取文章信息
        dispatch(getArticleInfo(articleId))

        // 请求评论列表数据
        dispatch(getArticleComments({
            type: 'a',
            source: articleId
        }))
    }, [dispatch, articleId])

    // 是否显示顶部信息
    const [isShowAuthor, setIsShowAuthor] = useState(false)
    const authorRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const onScroll = throttle(function () {
            const rect = authorRef.current?.getBoundingClientRect()!
            if (rect && rect.top <= 0) {
                setIsShowAuthor(true)
            } else {
                setIsShowAuthor(false)
            }
        }, 300)
        document.addEventListener('scroll', onScroll)
        return () => {
            document.removeEventListener('scroll', onScroll)
        }
    }, [])

    const hasMore = comment.last_id !== comment.end_id
    const loadMore = async () => {
        await dispatch(getMoreCommentList(articleId, comment.last_id))
    }
    //评论跳转
    const commentRef = useRef<HTMLDivElement>(null)
    const isShowComment = useRef(false)
    const onShowComment = () => {
        if (isShowComment.current) {
            window.scrollTo(0, 0);
        } else {
            window.scrollTo(0, commentRef.current!.offsetTop)
        }
        isShowComment.current = !isShowComment.current
    }
    //分享
    // 分享抽屉状态
    const [shareDrawerStatus, setShareDrawerStatus] = useState({
        visible: false
    })

// 打开分享抽屉
    const onOpenShare = () => {
        setShareDrawerStatus({
            visible: true
        })
    }

// 关闭分享抽屉
    const onCloseShare = () => {
        setShareDrawerStatus({
            visible: false
        })
    }

    return (
        <div className={styles.root}>
            <div className="root-wrapper">
                {/* 顶部导航栏 */}
                <NavBar
                    className='navbar'
                    onLeftClick={() => history.go(-1)}
                    extra={
                        <span onClick={onOpenShare}>
                           <Icon type="icongengduo"/>
                        </span>
                    }
                >
                    {isShowAuthor ? (
                        <div className="nav-author">
                            <img src={info.aut_photo} alt=""/>
                            <span className="name">{info.aut_name}</span>
                            <span
                                className={classNames(
                                    'follow',
                                    info.is_followed ? 'followed' : ''
                                )}
                            >
                             {info.is_followed ? '已关注' : '关注'}
                             </span>
                        </div>
                    ) : (
                        ''
                    )}
                </NavBar>

                <>
                    <div className="wrapper">
                        <div className="article-wrapper">
                            {/* 文章描述信息栏 */}
                            <div className="header">
                                <h1 className="title">{info.title}</h1>

                                <div className="info">
                                    <span>{dayjs(info.pubdate).format('YYYY-MM-DD')}</span>
                                    <span>{info.read_count} 阅读</span>
                                    <span>{info.comm_count} 评论</span>
                                </div>

                                <div className="author" ref={authorRef}>
                                    <img src={info.aut_photo} alt=""/>
                                    <span className="name">{info.aut_name}</span>
                                    <span
                                        className={classNames(
                                            'follow',
                                            info.is_followed ? 'followed' : ''
                                        )}
                                    >
                    {info.is_followed ? '已关注' : '关注'}
                  </span>
                                </div>
                            </div>

                            {/* 文章正文内容区域 */}
                            <div className="content">
                                <div
                                    className="content-html dg-html"
                                    dangerouslySetInnerHTML={{__html: info.content}}
                                ></div>
                                <div className="date">
                                    发布文章时间：{dayjs(info.pubdate).format('YYYY-MM-DD')}
                                </div>
                            </div>
                        </div>
                        <div className="comment" ref={commentRef}>
                            {/* 评论总览信息 */}
                            <div className="comment-header">
                                <span>全部评论（{info.comm_count}）</span>
                                <span>{info.like_count} 点赞</span>
                            </div>
                            {/* 评论列表 */}
                            {info.comm_count === 0 ? (
                                <NoComment></NoComment>
                            ) : (
                                comment.results?.map((item: any) => (
                                    <CommentItem key={item.com_id} comment={item}></CommentItem>
                                ))
                            )}
                            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
                        </div>
                    </div>
                </>
                <CommentFooter onShowComment={onShowComment} onOpenShare={onOpenShare}></CommentFooter>
            </div>
            {/* 分享抽屉 */}
            <Drawer
                className="drawer-share"
                position="bottom"
                style={{ minHeight: document.documentElement.clientHeight }}
                // @ts-ignore
                children={' '}
                sidebar={
                    <Share onClose={onCloseShare} />
                }
                open={shareDrawerStatus.visible}
                onOpenChange={onCloseShare}
            />
        </div>
    )
}

export default Article
