import classes from "../../sass/components/Vote.module.scss";
import plusIcon from "../../images/icon-plus.svg";
import minusIcon from "../../images/icon-minus.svg";
import {useEffect, useReducer} from "react";
const Vote = ({commentId,score, parentId}) => {
  const updateScore = (state, action) => {
        if(action.type === 'UP'){
            if(state.voteState === 'upvote'){
                return {
                    voteState: null,
                    score: state.score - 1
                }
            }
            if(state.voteState === 'downvote'){
                return{
                    voteState: 'upvote',
                    score: state.score + 2
                }
            }
            return {
                voteState: 'upvote',
                score: state.score + 1
            };
        }
        if(action.type === 'DOWN'){
            if (state.voteState === 'downvote'){
                return {
                    voteState: null,
                    score: state.score + 1
                }
            }
            if(state.voteState === 'upvote'){
                return {
                    voteState: 'downvote',
                    score: state.score - 2
                }
            }
            return {
                voteState: 'downvote',
                score: state.score - 1
            }
        }
        return state;
  }
  const [voteData, dispatchFn] = useReducer(updateScore, {
      voteState: null,
      score: score
  })
    useEffect(() =>{
        const commentsData = JSON.parse(localStorage.getItem('comments'));
        // console.log(commentsData);
        const parentComment = commentsData.find((comment) => {
            return comment.id === parentId;
        })
        const rootComment = !parentComment ? commentsData.find(comment => comment.id === commentId) : null;

        

        console.log(rootComment);
    }, [voteData, commentId]);
  return (
      <div className={classes.vote}>
          <button onClick={() => dispatchFn({type: 'UP'})} className={classes.vote__btn}><img src={plusIcon} alt={"Upvote icon"}/></button>
          <div className={classes.vote__score}><span>{voteData.score}</span></div>
          <button onClick={() => dispatchFn({type: 'DOWN'})} className={classes.vote__btn}><img src={minusIcon} alt={"Downvote icon"}/></button>
      </div>
  )
}
export default Vote;