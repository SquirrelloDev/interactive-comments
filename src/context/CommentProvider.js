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
        console.log(parentId, commentId);
        if(parentComment && !rootComment){
            const childCommentIndex = parentComment.replies.findIndex(reply => reply.id === commentId);
            const childComment = parentComment.replies[childCommentIndex];
            const updatedScoreComment = {
                    ...childComment,
                    score: score
                }
            parentComment.replies[childCommentIndex] = updatedScoreComment;
            updatedComments = [...comments];
            updatedComments[parentCommentIndex] = parentComment;
            setComments(updatedComments);
        }
        else if(rootComment && !parentComment){
            const updatedComment = {
                    ...rootComment,
                    score: score
                }
            updatedComments = [...comments];
            updatedComments[rootCommentIndex] = updatedComment;
            setComments(updatedComments);
        }
    }
    const addComment = (type = 'new', replyId = null, childId=null, text) => {
      if(type === 'new'){
          const newComment = {
              id: Math.floor(Math.random() * 12000),
              createdAt: new Date().toISOString(),
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
          const commentUser = replyId !== childId ? parentComment.replies.find(reply => reply.id === childId).user.username : parentComment.user.username;
          const newReply = {
              id: Math.floor(Math.random() * 12000),
              createdAt: new Date().toISOString(),
              content: text,
              score: 0,
              replyingTo: commentUser,
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
    const editComment = (parentId, commentId, text) => {
        let updatedComments;
        const parentCommentIdx = comments.findIndex(comment => comment.id === parentId);
        const parentComment = comments[parentCommentIdx];
        console.log(parentId, commentId);
        if(parentId !== commentId){
            //reply
            const replyIdx = parentComment.replies.findIndex(reply => reply.id === commentId);
            const reply = parentComment.replies[replyIdx];

            const updatedReply = {
                ...reply,
                content: text
            }
            console.log(updatedReply)
            updatedComments = [...comments]
            parentComment.replies[replyIdx] = updatedReply;
            console.log(parentComment[replyIdx]);
            updatedComments[parentCommentIdx] = parentComment;
            console.log(updatedComments[parentCommentIdx])
            setComments(updatedComments);
        }
        else{
            //root
            const updatedRootComment = {
                ...parentComment,
                content: text
            }
            updatedComments = [...comments];
            updatedComments[parentCommentIdx] = updatedRootComment;
            setComments(updatedComments);

        }
    }
  const deleteComment = (parentId,commentId) => {
      let updatedComments;
      const parentCommentIndex = comments.findIndex((comment) => {
          return comment.id === parentId;
      })
      const parentComment = comments[parentCommentIndex];
      if(parentId !== commentId){
          //comment type: reply
          const newReplies = parentComment.replies.filter(reply => reply.id !== commentId);
          parentComment.replies = newReplies;
          updatedComments = [...comments];
          updatedComments[parentCommentIndex] = parentComment;
          setComments(updatedComments);
      }
      else{
          const newComments = comments.filter(comment => comment.id !== commentId);
          setComments(newComments);
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
        addComment,
        editComment,
        deleteComment
    }
  return <commentContext.Provider value={value}>{children}</commentContext.Provider>
}
export default CommentProvider;