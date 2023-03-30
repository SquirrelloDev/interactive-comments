import commentContext from "./comment-context";
import useFileData from "../hooks/use-file-data";
import {useCallback, useEffect, useState} from "react";
const CommentProvider = ({children}) => {
    const {getFileData} = useFileData();
    const [comments, setComments] = useState([]);

    const populateComments = useCallback(async () => {
        const test = localStorage.getItem('comments');
        if(test.length === 0){
            const commentsData = await getFileData('./data.json');
            setComments(commentsData.comments);
        }
        else{
            setComments(JSON.parse(localStorage.getItem('comments')));
        }
    }, [getFileData])

    const modifyScore = (parentId, commentId, score) =>{
        let updatedComments;
        const parentCommentIndex = comments.findIndex((comment) => {
            return comment.id === parentId;
        })
        const parentComment = comments[parentCommentIndex];
        const rootCommentIndex = !parentComment ? comments.findIndex(comment => comment.id === commentId) : -1;
        const rootComment = comments[rootCommentIndex];
        if(parentComment){
            const childCommentIndex = parentComment.replies.findIndex(reply => reply.id === commentId);
            const childComment = parentComment.replies[childCommentIndex];
            const updatedScoreComment = {
                ...childComment,
                score: score
            }
            parentComment.replies[childCommentIndex] = updatedScoreComment;
            updatedComments = [...comments];
            console.log(parentComment)
            updatedComments[parentCommentIndex] = parentComment;
            console.log(updatedComments);
            setComments(updatedComments);
        }
        else if(rootComment){
            const updatedComment = {
                ...rootComment,
                score: score
            }
            updatedComments = [...comments];
            updatedComments[rootCommentIndex] = updatedComment;
            setComments(updatedComments);
        }
    }

    useEffect(() => {

        populateComments();

    }, [])
    useEffect(() => {
        // if(localStorage.getItem('comments')){
        //     return;
        // }
        if(comments.length === 0){
            return;
        }
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments])
    const value = {
        comments,
        modifyScore
    }
  return <commentContext.Provider value={value}>{children}</commentContext.Provider>
}
export default CommentProvider;