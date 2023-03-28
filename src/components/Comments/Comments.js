import Comment from "./Comment";
import useFileData from "../../hooks/use-file-data";
import {useCallback, useEffect, useState} from "react";

const Comments = () => {
    const {fileData} = useFileData('./data.json');
    const [comments, setComments] = useState([]);
    const populateInitCommentData = useCallback(() => {
        if(!localStorage.getItem('comments')){
            localStorage.setItem('comments', JSON.stringify(fileData.comments))
        }
        else{
            console.warn("Comments already populated")
            setComments(JSON.parse(localStorage.getItem('comments')));
        }

    }, [fileData])
    useEffect(() =>{
        populateInitCommentData();
    }, [populateInitCommentData])
    return (
        <div>
            {comments.map(comment => <Comment key={comment.id} id={comment.id} replies={comment.replies} content={comment.content} user={comment.user} createdAt={comment.createdAt}/>)}
        </div>

    )
}
export default Comments;