import Avatar from "../UI/Avatar";
import Vote from "../Vote/Vote";
import classes from "../../sass/components/Comment.module.scss";
import IconButton from "../UI/IconButton";
import replyIcon from '../../images/icon-reply.svg'
import editIcon from '../../images/icon-edit.svg'
import deleteIcon from '../../images/icon-delete.svg'
import ReplyContainer from "../Replies/ReplyContainer";
import {useContext} from "react";
import authContext from "../../context/auth-context";
const Comment = ({id,content, createdAt, user, replies, activeComment, setActiveComment}) => {
    const authCtx = useContext(authContext);
    // const setReply = () =>{
    //     setReplyComment(id);
    // }

    const {username, image} = user;
    const isUserComment = username === authCtx.username;
  return (
      <>
          <div className={classes.comment}>
              <div className={classes.comment__header}><Avatar srcImg={image.png}/><span>{username}</span> {isUserComment && <span className={classes.comment__header__badge}>you</span>} <span>{createdAt}</span> </div>
              <div className={classes.comment__content}><p>{content}</p></div>
              <div className={classes.comment__vote}><Vote/></div>
              <div className={classes.comment__actions}>
                  {isUserComment &&
                      <>
                          <IconButton danger icon={deleteIcon}>Delete</IconButton>
                          <IconButton onClickFn={() => setActiveComment({id, type:'editing'})} icon={editIcon}>Edit</IconButton>
                      </>
                      }
                  {!isUserComment && <IconButton onClickFn={() => setActiveComment({id, type:'replying'})} icon={replyIcon}>Reply</IconButton> }
              </div>
          </div>
          {replies.length > 0 && <ReplyContainer setReplyComment={setActiveComment} replies={replies}/>}
      </>


  )
}
export default Comment;