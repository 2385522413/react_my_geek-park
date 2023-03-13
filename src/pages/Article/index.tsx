import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import { useHistory } from 'react-router'
import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {useParams} from 'react-router'
import {getArticleComments, getArticleInfo} from "@/store/action/article";
import {RootState} from "@/store";
import dayjs from "dayjs";
import classNames from "classnames";
import {throttle} from "lodash";
import NoComment from "@/pages/Article/components/NoComment";

const Article = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const Params = useParams<{ id: string }>()
    const info = useSelector((state: RootState) => {
        // @ts-ignore
        return state.article.info
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
    },[dispatch,articleId])

    // 是否显示顶部信息
    const [isShowAuthor, setIsShowAuthor] = useState(false)
    const authorRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const onScroll = throttle(function () {
            const rect = authorRef.current?.getBoundingClientRect()!
            if (rect.top <= 0) {
                setIsShowAuthor(true)
            } else {
                setIsShowAuthor(false)
            }
        },300)
        document.addEventListener('scroll', onScroll)
        return () => {
            document.removeEventListener('scroll', onScroll)
        }
    }, [])


    return (
        <div className={styles.root}>
            <div className="root-wrapper">
                {/* 顶部导航栏 */}
                <NavBar
                    className='navbar'
                    onLeftClick={() => history.go(-1)}
                    extra={
                        <span>
                           <Icon type="icongengduo" />
                        </span>
                    }
                >
                    {isShowAuthor ? (
                        <div className="nav-author">
                            <img src={info.aut_photo} alt="" />
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
                                    <img src={info.aut_photo} alt="" />
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
                                    dangerouslySetInnerHTML={{ __html: info.content }}
                                ></div>
                                <div className="date">
                                    发布文章时间：{dayjs(info.pubdate).format('YYYY-MM-DD')}
                                </div>
                            </div>
                        </div>
                        <NoComment></NoComment>
                    </div>
                </>
            </div>
        </div>
    )
}

export default Article
