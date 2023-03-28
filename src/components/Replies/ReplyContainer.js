import classes from "../../sass/components/Comment.module.scss";
import Comment from "../Comments/Comment";

const ReplyContainer = ({replies, setReplyComment}) => {
  return(
      <div className={classes.comment__reply}>
          {replies.map(reply => <Comment key={reply.id} id={reply.id} user={reply.user} content={reply.content} createdAt={reply.createdAt} replies={[]} setActiveComment={setReplyComment}/> )}
      </div>
  )
}
export default ReplyContainer;