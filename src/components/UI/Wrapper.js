import Comments from "../Comments/Comments";
import CommentForm from "../Comments/CommentForm";
import classes from "../../sass/components/Wrapper.module.scss";

const Wrapper = () => {
  return (
      <div className={classes.wrapper}>

          <Comments/>
          <CommentForm/>
      </div>
  )
}
export default Wrapper;