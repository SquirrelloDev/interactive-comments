import CommentCointainer from "../Comments/CommentCointainer";
import CommentForm from "../Comments/CommentForm";
import classes from "../../sass/components/Wrapper.module.scss";

const Wrapper = () => {
  return (
      <div className={classes.wrapper}>
          <CommentCointainer/>
          <CommentForm/>
      </div>
  )
}
export default Wrapper;