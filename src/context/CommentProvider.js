import commentContext from "./comment-context";
import useFileData from "../hooks/use-file-data";
import {useCallback, useContext, useEffect, useState} from "react";
import authContext from "./auth-context";
const CommentProvider = ({children}) => {
    const authCtx = useContext(authContext);
    const {getFileData} = useFileData();
    const [comments, setComments] = useState([]);

    const populateComments = useCallback(async () => {
        const test = localStorage.getItem('comments');
        if(!test || test.length === 0){
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
    const addComment = (type = 'new', replyId = null, commentMetaData) => {
        const {text} = commentMetaData;
      if(type === 'new'){
          const newComment = {
              id: Math.floor(Math.random() * 12000),
              createdAt: "2 montsh ago xD",
              content: text,
              score: 0,
              user: {
                  username: authCtx.username,
                  image: authCtx.image
              },
              replies: []
          }
          setComments(prevState => {
              return [...prevState, newComment];
          })

      }
      else if(type === 'reply'){
          let updatedComments;
          const parentCommentIdx = comments.findIndex(comment => comment.id === replyId);
          const parentComment = comments[parentCommentIdx];
          const parentCommentUser = parentComment.user.username;
          const newReply = {
              id: Math.floor(Math.random() * 12000),
              createdAt: "2 montsh ago xD",
              content: text,
              score: 0,
              replyingTo: parentCommentUser,
              user: {
                  username: authCtx.username,
                  image: authCtx.image
              },
          }
          parentComment.replies = [...parentComment.replies, newReply];
          updatedComments = [...comments];
          updatedComments[parentCommentIdx] = parentComment;
          setComments(updatedComments);
      }
    }

    useEffect(() => {

        populateComments();

    }, [])
    useEffect(() => {
        if(comments.length === 0){
            return;
        }
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments])
    const value = {
        comments,
        modifyScore,
        addComment
    }
  return <commentContext.Provider value={value}>{children}</commentContext.Provider>
}
export default CommentProvider;