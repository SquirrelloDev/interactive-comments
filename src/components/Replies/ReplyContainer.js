import classes from "../../sass/components/Comment.module.scss";
import Comment from "../Comments/Comment";

const ReplyContainer = ({replies, setReplyComment, parentId, activeComment}) => {
  return(
      <div className={classes.comment__reply}>
          {replies.map(reply => <Comment key={reply.id} id={reply.id} user={reply.user} score={reply.score} content={reply.content} createdAt={reply.createdAt} replies={[]} activeComment={activeComment} setActiveComment={setReplyComment} parentId={parentId}/> )}
      </div>
  )
}
export default ReplyContainer;