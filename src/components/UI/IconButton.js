import classes from "../../sass/components/IconButton.module.scss";

const IconButton = ({children, icon, danger, onClickFn}) => {
  return <button onClick={() => onClickFn()} className={!danger ? classes['ico-btn'] : `${classes['ico-btn']} ${classes['ico-btn--danger']}`}>{icon !== null && <img src={icon} alt={"Action icon"}/>}{children}</button>

}
export default IconButton;