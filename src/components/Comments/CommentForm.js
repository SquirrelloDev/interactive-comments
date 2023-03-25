import classes from "../../sass/components/CommentForm.module.scss";
import Avatar from "../UI/Avatar";

const CommentForm = () => {
  return(
      <form className={classes.form}>
          <textarea className={classes['form__comment-text']} placeholder={"Add a comment..."}/>
          <div className={classes['form__bottom-section']}>
              <Avatar/>
              <button className={classes['form__bottom-section__btn']}>Send</button>
          </div>
      </form>
  )
}
export default CommentForm;