import Icon from '@/components/Icon'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import styles from './index.module.scss'

const CommentFooter = () => {
    // @ts-ignore
    const info = useSelector((state: RootState) => state.article.info)
    return (
        <div className={styles.root}>
            <div className="input-btn">
                <Icon type="iconbianji" />
                <span>去评论</span>
            </div>
            <>
                <div className="action-item">
                    <Icon type="iconbtn_comment" />
                    <p>评论</p>
                    <span className="bage">{info.comm_count}</span>
                </div>
                {/* 'iconbtn_like2' */}
                <div className="action-item">
                    <Icon
                        type={info.attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'}
                    />
                    <p>点赞</p>
                </div>
            </>
            <div className="action-item">
                {/* 'iconbtn_collect' */}
                <Icon
                    type={info.is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'}
                />
                <p>收藏</p>
            </div>
            <div className="action-item">
                <Icon type="iconbtn_share" />
                <p>分享</p>
            </div>
        </div>
    )
}

export default CommentFooter
