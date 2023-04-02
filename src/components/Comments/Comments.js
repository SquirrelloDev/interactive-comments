import Comment from "./Comment";
import {useContext, useState} from "react";
import commentContext from "../../context/comment-context";

const Comments = () => {
    const [activeComment, setActiveComment] = useState(null);
    const commentCtx= useContext(commentContext);
    return (
        <div>
            {commentCtx.comments.map(comment => <Comment key={comment.id} id={comment.id}  replies={comment.replies} score={comment.score} content={comment.content} user={comment.user} createdAt={comment.createdAt}
            activeComment={activeComment} setActiveComment={setActiveComment}/>)}
        </div>

    )
}
export default Comments;