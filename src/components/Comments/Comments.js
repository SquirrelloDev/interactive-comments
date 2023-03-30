import Comment from "./Comment";
import useFileData from "../../hooks/use-file-data";
import {useCallback, useContext, useEffect, useState} from "react";
import authContext from "../../context/auth-context";
import commentContext from "../../context/comment-context";

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const authCtx = useContext(authContext);
    const commentCtx= useContext(commentContext);

    const populateInitCommentData = useCallback(() => {
            setComments(commentCtx.comments);
    }, [commentCtx.comments])
    useEffect(() =>{
        populateInitCommentData();
    }, [populateInitCommentData])
    return (
        <div>
            {commentCtx.comments.map(comment => <Comment key={comment.id} id={comment.id} replies={comment.replies} score={comment.score} content={comment.content} user={comment.user} createdAt={comment.createdAt}
            activeComment={activeComment} setActiveComment={setActiveComment}/>)}
        </div>

    )
}
export default Comments;