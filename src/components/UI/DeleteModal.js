import ReactDOM from "react-dom";
import classes from "../../sass/components/Modal.module.scss";
const Overlay = () => {
  return <div className={classes.modal__backdrop}></div>
}

const ModalContent = ({children}) => {
  return <div className={classes.modal__content}>
      {children}
  </div>
}

const DeletePrompt = (props) => {
 return (
     <div className={classes.delete}>
         <h3 className={classes.delete__heading}>Delete comment</h3>
         <p className={classes.delete__text}>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
         <div className={classes.delete__btns}>
             <button onClick={() => console.log('hej')} className={classes.delete__btns__cancel}>No, cancel</button>
             <button className={classes.delete__btns__confirm}>Yes, delete</button>
         </div>
     </div>
 )
}

const DeleteModal = () => {
  return(
      <div>
          {ReactDOM.createPortal(<Overlay/>, document.getElementById('modal'))}
          {ReactDOM.createPortal(<ModalContent><DeletePrompt/></ModalContent>, document.getElementById('modal'))}
      </div>

  )
}
export default DeleteModal;