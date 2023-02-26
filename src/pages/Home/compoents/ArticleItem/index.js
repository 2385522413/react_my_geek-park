import classnames from 'classnames'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import Img from '@/components/Image'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import dayjs from "dayjs";
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
const ArticleItem = ({ article }) => {
    const {
        cover: { type, images },
        title,
        aut_name,
        comm_count,
        pubdate,
    } = article
    //const isLogin = useSelector((state) => !!state.login.token)
    return (
        <div className={styles.root}>
            <div
                className={classnames(
                    'article-content',
                    type === 3 ? 't3' : '',
                    type === 0 ? 'none-mt' : ''
                )}
            >
                <h3>{title}</h3>
                {type !== 0 && (
                    <div className="article-imgs">
                        {images.map((item, i) => (
                            <div className="article-img-wrapper" key={i}>
                                <Img src={item} alt="" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
                <span>{aut_name}</span>
                <span>{comm_count} 评论</span>
                <span>{dayjs().from(pubdate)}</span>

                <span className="close">
          { <Icon type="iconbtn_essay_close" />}
        </span>
            </div>
        </div>
    )
}

export default ArticleItem
