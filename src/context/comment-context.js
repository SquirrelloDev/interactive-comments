import React from "react";
const initalValue = {
    comments: [],
    addRootComment: () =>{},
    addReply: () =>{},
    upvote: () =>{},
    downvote: () =>{},
}
const commentContext = React.createContext(initalValue);
export default commentContext;