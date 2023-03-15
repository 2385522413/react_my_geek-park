import Icon from '@/components/Icon'
import { RootState } from '@/store'
import {useDispatch, useSelector} from 'react-redux'
import styles from './index.module.scss'
import {collectAritcle, likeAritcle} from "@/store/action/article";

type Props= {
    onShowComment?: () => void
    onOpenShare?: () => void
    onComment?: () => void
}
const CommentFooter = ({onShowComment,onOpenShare,onComment}:Props) => {
    // @ts-ignore
    const info = useSelector((state: RootState) => state.article.info)
    //点赞
    const dispatch=useDispatch()
    const onLike = async () => {
        await dispatch(likeAritcle(info.art_id, info.attitude))
    }
    //收藏
    const onCollected = async () => {
        await dispatch(collectAritcle(info.art_id, info.is_collected))
    }
    return (
        <div className={styles.root}>
            <div className="input-btn" onClick={onComment}>
                <Icon type="iconbianji" />
                <span>去评论</span>
            </div>
            <>
                <div className="action-item" onClick={onShowComment}>
                    <Icon type="iconbtn_comment" />
                    <p>评论</p>
                    <span className="bage">{info.comm_count}</span>
                </div>
                {/* 'iconbtn_like2' */}
                <div className="action-item" onClick={onLike}>
                    <Icon
                        type={info.attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'}
                    />
                    <p>点赞</p>
                </div>
            </>
            <div className="action-item" onClick={onCollected}>
                {/* 'iconbtn_collect' */}
                <Icon
                    type={info.is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'}
                />
                <p>收藏</p>
            </div>
            <div className="action-item" onClick={onOpenShare}>
                <Icon type="iconbtn_share" />
                <p>分享</p>
            </div>
        </div>
    )
}

export default CommentFooter
