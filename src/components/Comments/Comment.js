import Avatar from "../UI/Avatar";
import Vote from "../Vote/Vote";
import classes from "../../sass/components/Comment.module.scss";
import IconButton from "../UI/IconButton";
import replyIcon from '../../images/icon-reply.svg'

const Comment = () => {
  return (
      <div className={classes.comment}>
          <div className={classes.comment__header}><Avatar/><span>amyrobson</span><span>1 month ago</span></div>
          <div className={classes.comment__content}><p>Cum signiferumque phasellus vero nec purus massa ac mazim augue. Consequat aliquet commune suavitate integer varius. Alterum molestie corrumpit magna possim tamquam tempor. Possit option himenaeos definiebas blandit recteque tale. Lacus suspendisse periculis discere verterem reprimique explicari.</p></div>
          <div className={classes.comment__vote}><Vote/></div> <div className={classes.comment__actions}><IconButton icon={replyIcon}>Reply</IconButton></div>
      </div>
  )
}
export default Comment;