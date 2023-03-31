import Comments from "../Comments/Comments";
import CommentForm from "../Comments/CommentForm";
import classes from "../../sass/components/Wrapper.module.scss";
import {useContext} from "react";
import commentContext from "../../context/comment-context";

const Wrapper = () => {
    const commentCtx = useContext(commentContext);
    const addNewComment = (text) => {
        commentCtx.addComment('new',null,{text: text})
    }
  return (
      <div className={classes.wrapper}>

          <Comments/>
          <CommentForm handleSubmit={addNewComment}/>
      </div>
  )
}
export default Wrapper;