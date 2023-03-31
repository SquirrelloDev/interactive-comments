import ReactDOM from "react-dom";
import classes from "../../sass/components/Modal.module.scss";
import {useContext} from "react";
import commentContext from "../../context/comment-context";
const Overlay = () => {
  return <div className={classes.modal__backdrop}></div>
}

const ModalContent = ({children}) => {
  return <div className={classes.modal__content}>
      {children}
  </div>
}

export const DeletePrompt = ({parentId, commentId, closeModalFn}) => {
    const commentCtx = useContext(commentContext);
    const deleteComment = (parentId, commentId) => {
        commentCtx.deleteComment(parentId, commentId);
    }
    const closeModal = () => {
      closeModalFn();
    }
 return (
     <div className={classes.delete}>
         <h3 className={classes.delete__heading}>Delete comment</h3>
         <p className={classes.delete__text}>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
         <div className={classes.delete__btns}>
             <button onClick={closeModal} className={classes.delete__btns__cancel}>No, cancel</button>
             <button onClick={() => deleteComment(parentId, commentId)} className={classes.delete__btns__confirm}>Yes, delete</button>
         </div>
     </div>
 )
}

const DeleteModal = ({children}) => {
  return(
      <div>
          {ReactDOM.createPortal(<Overlay/>, document.getElementById('modal'))}
          {ReactDOM.createPortal(<ModalContent>{children}</ModalContent>, document.getElementById('modal'))}
      </div>

  )
}
export default DeleteModal;