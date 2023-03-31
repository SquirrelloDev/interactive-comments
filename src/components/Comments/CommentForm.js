import classes from "../../sass/components/CommentForm.module.scss";
import Avatar from "../UI/Avatar";
import {useContext, useRef, useState} from "react";
import authContext from "../../context/auth-context";
import commentContext from "../../context/comment-context";

const CommentForm = ({replyId = null, formMode = null, handleSubmit, initText=''}) => {
    const [commentText, setCommentText] = useState(initText);
    const commentRef = useRef();
    const authCtx = useContext(authContext);
    const submitForm = (e) => {
      e.preventDefault();
      handleSubmit(commentRef.current.value);
    }
  return(
      <form onSubmit={submitForm} className={classes.form}>
          <textarea ref={commentRef} className={classes['form__comment-text']} defaultValue={commentText} placeholder={"Add a comment..."}/>
          <div className={classes['form__bottom-section__avatar']}>
              <Avatar srcImg={authCtx.image.png}/>
          </div>
              <button className={classes['form__bottom-section__btn']}>Send</button>
      </form>
  )
}
export default CommentForm;