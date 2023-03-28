import Avatar from "../UI/Avatar";
import Vote from "../Vote/Vote";
import classes from "../../sass/components/Comment.module.scss";
import IconButton from "../UI/IconButton";
import replyIcon from '../../images/icon-reply.svg'
import editIcon from '../../images/icon-edit.svg'
import deleteIcon from '../../images/icon-delete.svg'
import ReplyContainer from "../Replies/ReplyContainer";
const Comment = ({id,content, createdAt, user, replies, activeComment, setActiveComment}) => {
    // const setReply = () =>{
    //     setReplyComment(id);
    // }
    const {username, image} = user;
  return (
      <>
          <div className={classes.comment}>
              <div className={classes.comment__header}><Avatar srcImg={image.png}/><span>{username}</span><span>{createdAt}</span></div>
              <div className={classes.comment__content}><p>{content}</p></div>
              <div className={classes.comment__vote}><Vote/></div>
              <div className={classes.comment__actions}>
                  {/*<IconButton onClickFn={() => setActiveComment({id, type:'editing'})} icon={editIcon}>Edit</IconButton>*/}
                  <IconButton onClickFn={() => setActiveComment({id, type:'replying'})} icon={replyIcon}>Reply</IconButton>
              </div>
          </div>
          {replies.length > 0 && <ReplyContainer setReplyComment={setActiveComment} replies={replies}/>}
      </>


  )
}
export default Comment;