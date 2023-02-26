import Icon from '@/components/Icon'
import {Modal, Toast} from "antd-mobile";
import { useState } from 'react'
import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {reportArticle, setFeedbackAction, unLikeArticle} from "@/store/action/home";

/**
 * 举报反馈菜单
 */
const FeedbackActionMenu = () => {
    const list=[
        {id:0,title:'其他问题'},
        {id:1,title:'标题夸张'},
        {id:2,title:'低俗色情'},
        {id:3,title:'错别字多'},
        {id:4,title:'旧文重复'},
        {id:5,title:'内容不实'},
        {id:6,title:'广告软文'},
        {id:7,title:'影响心情'},
        {id:8,title:'违法犯罪'},
    ]
    const feedbackAction = useSelector(state => state.home.feedbackAction)
    const dispatch = useDispatch();
    // 举报类型：normal 不感兴趣或拉黑作者 | junk 垃圾内容
    const [type, setType] = useState('normal')

    // 关闭弹框时的事件监听函数
    const onClose = () => {
        dispatch(setFeedbackAction({
            visible:false,
            articleId:''
        }))
        setType("normal")
    }
 //不感兴趣
    const unLike= async ()=>{
        await dispatch(unLikeArticle(feedbackAction.articleId))
        onClose();
        Toast.success("减少为你推荐此类文章")
    }
    //举报
    const report=async (id)=>{
        await dispatch(reportArticle(feedbackAction.articleId,id))
        onClose();
        Toast.success("举报成功")
    }
    return (
        <div className={styles.root}>
            <Modal
                className="more-action-modal"
                title=""
                transparent
                maskClosable
                footer={[]}
                onClose={onClose}
                visible={feedbackAction.visible}
            >
                <div className="more-action">
                    {/* normal 类型时的菜单内容 */}
                    {type === 'normal' && (
                        <>
                            <div className="action-item" onClick={unLike}>
                                <Icon type="iconicon_unenjoy1" /> 不感兴趣
                            </div>
                            <div className="action-item" onClick={() => setType('junk')}>
                                <Icon type="iconicon_feedback1" />
                                <span className="text">反馈垃圾内容</span>
                                <Icon type="iconbtn_right" />
                            </div>
                            <div className="action-item">
                                <Icon type="iconicon_blacklist" /> 拉黑作者
                            </div>
                        </>
                    )}

                    {/* junk 类型时的菜单内容 */}
                    {type === 'junk' && (
                        <>
                            <div className="action-item" onClick={() => setType('normal')}>
                                <Icon type="iconfanhui" />
                                <span className="back-text">反馈垃圾内容</span>
                            </div>

                            {
                                list.map((item)=>
                                    <div key={item.id} className="action-item" onClick={()=>{report(item.id)}}>{item.title}</div>
                                )
                            }
                        </>
                    )}
                </div>
            </Modal>
        </div>
    )
}

export default FeedbackActionMenu
