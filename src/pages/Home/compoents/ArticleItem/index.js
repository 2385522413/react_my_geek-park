import classnames from "classnames";
import Icon from "@/components/Icon";
import styles from "./index.module.scss";
import Img from "@/components/Image";
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {setFeedbackAction} from "@/store/action/home";
import {useHistory} from "react-router-dom";

const ArticleItem = ({article,channelId}) => {
    const history = useHistory()
    const dispatch=useDispatch()
    const {
        cover: {type, images},
        title,
        aut_name,
        comm_count,
        pubdate
    } = article;
    const isLogin = useSelector((state) => !!state.login.token);
    return (
        <div className={styles.root} onClick={()=>{
            history.push('/article/'+article.art_id)
        }}>
            <div
                className={classnames(
                    "article-content",
                    type === 3 ? "t3" : "",
                    type === 0 ? "none-mt" : ""
                )}
            >
                <h3>{title}</h3>
                {type !== 0 && (
                    <div className="article-imgs">
                        {images.map((item, i) => (
                            <div className="article-img-wrapper" key={i}>
                                <Img src={item} alt=""/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={classnames("article-info", type === 0 ? "none-mt" : "")}>
                <span>{aut_name}</span>
                <span>{comm_count} 评论</span>
                <span>{dayjs().from(pubdate)}</span>

                <span className="close">
          {isLogin && <Icon type="iconbtn_essay_close" onClick={()=>{dispatch(setFeedbackAction(
              {
                  visible:true,
                  articleId:article.art_id,
                  channelId
              }
          ))}}/>}
        </span>
            </div>
        </div>
    );
};

export default ArticleItem;
