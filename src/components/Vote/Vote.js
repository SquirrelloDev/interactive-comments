import classes from "../../sass/components/Vote.module.scss";
import plusIcon from "../../images/icon-plus.svg";
import minusIcon from "../../images/icon-minus.svg";
const Vote = () => {
  return (
      <div className={classes.vote}>
          <button className={classes.vote__btn}><img src={plusIcon} alt={"Upvote icon"}/></button>
          <div className={classes.vote__score}><span>12</span></div>
          <button className={classes.vote__btn}><img src={minusIcon} alt={"Downvote icon"}/></button>
      </div>
  )
}
export default Vote;