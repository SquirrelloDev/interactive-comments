import classes from "../../sass/components/Vote.module.scss";

const Vote = () => {
  return (
      <div className={classes.vote}>
          <button className={classes.vote__btn}>+</button>
          <div className={classes.vote__score}><span>12</span></div>
          <button className={classes.vote__btn}>-</button>
      </div>
  )
}
export default Vote;