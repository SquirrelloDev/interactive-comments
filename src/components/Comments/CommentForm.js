import classes from "../../sass/components/CommentForm.module.scss";
import Avatar from "../UI/Avatar";
import {useContext, useRef, useState} from "react";
import authContext from "../../context/auth-context";

const CommentForm = ({handleSubmit, initText=''}) => {
    const [commentText] = useState(initText);
    const commentRef = useRef();
    const authCtx = useContext(authContext);
    const submitForm = (e) => {
      e.preventDefault();
      if(commentRef.current.value === ''){
          return;
      }
      handleSubmit(commentRef.current.value);
      commentRef.current.value = '';
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