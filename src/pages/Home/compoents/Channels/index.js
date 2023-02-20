import Icon from "@/components/Icon";
import styles from "./index.module.scss";
import {useSelector} from "react-redux";
import classNames from "classnames";
import {useState} from "react";
import classnames from "classnames";

/**
 * 频道管理组件
 * @param {Number} props.tabActiveIndex 用户选中的频道的索引
 * @param {Function} props.onClose 关闭频道管理抽屉时的回调函数
 * @param {Function} props.onChannelClick 当点击频道列表中的某个频道时的会带哦函数
 */
const Channels = ({onClose,index,onChange}) => {
    // 控制普通/编辑模式的状态
    const [editable, setEditable] = useState(false)
    const userChannels = useSelector((state) => state.home.userChannels);
    const optionChannels = useSelector((state) => {
        // 推荐频道 = 所有频道 - 我的频道
        const {userChannels, allChannels} = state.home;
        return allChannels.filter((item) => {
            const idx = userChannels.findIndex((v) => v.id === item.id);
            if (idx === -1) {
                return true;
            } else {
                return false;
            }
        });
    });

    return (
        <div className={styles.root}>
            {/* 顶部栏：带关闭按钮 */}
            <div className="channel-header">
                <Icon type="iconbtn_channel_close" onClick={onClose}/>
            </div>

            {/* 频道列表 */}
            <div className="channel-content">
                {/* 当前已选择的频道列表 */}
                <div className={classnames('channel-item', editable ? 'edit' : '')}>
                    <div className="channel-item-header">
                        <span className="channel-item-title">我的频道</span>
                        <span className="channel-item-title-extra">
                        {editable ? '点击删除频道' : '点击进入频道'}
                          </span>
                        <span className="channel-item-edit" onClick={() => setEditable(!editable)}>
                        {editable ? '保存' : '编辑'}
                          </span>
                    </div>

                    <div className="channel-list">
                        {userChannels.map((item,i) => (
                            <span   className={classNames('channel-list-item', {
                                selected: index === i,
                            })}
                                    key={item.id}
                                    onClick={() => {
                                        if (editable) return
                                        // 修改高亮
                                        onChange(i)
                                        // 关闭弹层
                                        onClose()
                                    }}>
                                      {item.name}
                                 <Icon type="iconbtn_tag_close" />
                                   </span>
                        ))
                        }
                    </div>
                </div>

                {/* 推荐的频道列表 */}
                <div className="channel-item">
                    <div className="channel-item-header">
                        <span className="channel-item-title">频道推荐</span>
                        <span className="channel-item-title-extra">点击添加频道</span>
                    </div>
                    <div className="channel-list">
                        {optionChannels.map((item) => (
                            <span className="channel-list-item" key={item.id}>
                                  + {item.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Channels;
