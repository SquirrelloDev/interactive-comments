import Avatar from "../UI/Avatar";
import Vote from "../Vote/Vote";
import classes from "../../sass/components/Comment.module.scss";
import IconButton from "../UI/IconButton";
import replyIcon from '../../images/icon-reply.svg'
import editIcon from '../../images/icon-edit.svg'
import deleteIcon from '../../images/icon-delete.svg'
import ReplyContainer from "../Replies/ReplyContainer";
import {useContext, useState} from "react";
import authContext from "../../context/auth-context";
import CommentForm from "./CommentForm";
import commentContext from "../../context/comment-context";
import DeleteModal, {DeletePrompt} from "../UI/DeleteModal";
import useTimeFormat from "../../hooks/use-time-format";
const Comment = ({id,content, createdAt, user, score, replies, activeComment, setActiveComment, replyingTo = null, parentId = null}) => {
    const authCtx = useContext(authContext);
    const commentCtx = useContext(commentContext);
    const [modalVisible, setModalVisible] = useState(false);
    const formattedTime = useTimeFormat(createdAt);
    const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === id;
    const isEditing = activeComment && activeComment.type ==='editing' && activeComment.id === id;
    const replyId = parentId ? parentId : id;
    const {username, image} = user;
    const isUserComment = username === authCtx.username;
    const replyMention = replyingTo ? `@${replyingTo}` : '';
    const createReply = (text) => {
      commentCtx.addComment('reply', replyId, id,  text);
      setActiveComment(null);
    };
    const editComment = (text) => {
      commentCtx.modifyScore('EDIT', replyId, id, null, text);
        setActiveComment(null);
    }

  return (
      <>
          {!isEditing &&
              <div className={classes.comment}>
              <div className={classes.comment__header}><Avatar srcImg={image.png}/><span>{username}</span> {isUserComment && <span className={classes.comment__header__badge}>you</span>} <span>{formattedTime}</span> </div>
              <div className={classes.comment__content}><p><span>{replyMention}</span> {content}</p></div>
              <div className={classes.comment__vote}><Vote commentId={id} score={score} parentId={parentId}/></div>
              <div className={classes.comment__actions}>
                  {isUserComment &&
                      <>
                          <IconButton danger onClickFn={() => setModalVisible(true)} icon={deleteIcon}>Delete</IconButton>
                          <IconButton onClickFn={() => setActiveComment({id, type:'editing'})} icon={editIcon}>Edit</IconButton>
                      </>
                  }
                  {!isUserComment && <IconButton onClickFn={() => setActiveComment({id, type:'replying'})} icon={replyIcon}>Reply</IconButton> }
              </div>
          </div>
          }
          {isEditing && <CommentForm initText={content} handleSubmit={editComment}/>}
          {isReplying && <CommentForm handleSubmit={createReply}/>}
          {replies.length > 0 && <ReplyContainer activeComment={activeComment} setReplyComment={setActiveComment} replies={replies} parentId={id}/>}
          {modalVisible && <DeleteModal><DeletePrompt parentId={replyId} commentId={id} closeModalFn={() => setModalVisible(false)}/></DeleteModal>}
      </>


  )
}
export default Comment;