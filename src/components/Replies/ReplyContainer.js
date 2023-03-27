import classes from "../../sass/components/Comment.module.scss";
import Comment from "../Comments/Comment";

const ReplyContainer = ({replies}) => {
  return(
      <div className={classes.comment__reply}>
          {replies.map(reply => <Comment replies={[]}/> )}
      </div>
  )
}
export default ReplyContainer;