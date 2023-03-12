import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import { useHistory } from 'react-router'
import styles from './index.module.scss'
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {useParams} from 'react-router'
import {getArticleInfo} from "@/store/action/article";

const Article = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const Params = useParams<{ id: string }>()

    // 获取动态路由参数
    const articleId = Params.id

    useEffect(() => {
        dispatch(getArticleInfo(articleId))
    })
    return (
        <div className={styles.root}>
            <div className="root-wrapper">
                {/* 顶部导航栏 */}
                <NavBar
                    onLeftClick={() => history.go(-1)}
                    extra={
                        <span>
              <Icon type="icongengduo" />
            </span>
                    }
                >
                    文章详情
                </NavBar>

                <>
                    <div className="wrapper">
                        <div className="article-wrapper">
                            {/* 文章描述信息栏 */}
                            <div className="header">
                                <h1 className="title">{'测试文字1234'}</h1>

                                <div className="info">
                                    <span>{'2020-10-10'}</span>
                                    <span>{10} 阅读</span>
                                    <span>{10} 评论</span>
                                </div>

                                <div className="author">
                                    <img src={''} alt="" />
                                    <span className="name">{'张三'}</span>
                                    <span className="follow">关注</span>
                                </div>
                            </div>

                            {/* 文章正文内容区域 */}
                            <div className="content">
                                <div className="content-html dg-html">测试内容123</div>
                                <div className="date">发布文章时间：{'2020-10-10'}</div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    )
}

export default Article
