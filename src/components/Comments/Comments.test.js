import {render, screen} from "@testing-library/react";
import Comment from "./Comment";
import App from "../../App";
import Comments from "./Comments";
import AuthProvider from "../../context/AuthProvider";
import CommentProvider from "../../context/CommentProvider";
import {useContext, useState} from "react";
import commentContext from "../../context/comment-context";
import ReplyContainer from "../Replies/ReplyContainer";
import userEvent from "@testing-library/user-event";
import CommentForm from "./CommentForm";
import Wrapper from "../UI/Wrapper";

const dummy_replies=[
    {
        "id": 3,
        "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        "createdAt": "2023-03-06",
        "score": 4,
        "replyingTo": "maxblagun",
        "user": {
            "image": {
                "png": "./images/avatars/image-ramsesmiron.png",
                "webp": "./images/avatars/image-ramsesmiron.webp"
            },
            "username": "ramsesmiron"
        }
    },
    {
        "id": 4,
        "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        "createdAt": "2023-03-07",
        "score": 2,
        "replyingTo": "ramsesmiron",
        "user": {
            "image": {
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
        }
    }
]

const DummyCommentContainer = ({children}) =>{
    const [activeComment, setActiveComment] = useState(null);
    return <Comment id={1} replies={[]} score={0} content={'Nice job'} activeComment={activeComment} setActiveComment={setActiveComment} createdAt={new Date().toISOString()} user={{username: 'John Doe', image: {png: ''}}}/>
}

describe("<Comments>", () =>{
    test('populates comment',  async ()=>{
        render(
            <AuthProvider>
                <CommentProvider>
                    <Comment id={1} replies={dummy_replies} score={0} content={'Nice job'} createdAt={new Date().toISOString()} user={{username: 'John Doe', image: {png: ''}}}/>
                </CommentProvider>
            </AuthProvider>)

        const commentText = await screen.findByText(/Nice job/i);
        expect(commentText).toBeInTheDocument();
})
    test('populates replies', () => {
        render(<AuthProvider>
            <CommentProvider>
                <ReplyContainer replies={dummy_replies} parentId={2}/>
            </CommentProvider>
        </AuthProvider>)
    })

    test('renders reply form', async () =>{
        render(
            <AuthProvider>
                <CommentProvider>
                    <DummyCommentContainer/>
                </CommentProvider>
            </AuthProvider>)
        const replyBtn = screen.getAllByRole('button');
        console.log(replyBtn[2]);
        await userEvent.click(replyBtn[2]);
        const replyForm = screen.getByText(/send/i);
        expect(replyForm).toBeInTheDocument();

    })
})


const DummyWrapper = () => {
    const commentCtx = useContext(commentContext);
    const addNewComment = (text) => {
        commentCtx.addComment('new',null, null, text)
    }
    return <DummyCommentContainer/>
}

describe('<CommentForm/>', () =>{
    test('creates new root comment', async () =>{
        render(<AuthProvider>
            <CommentProvider>
                <Wrapper/>
            </CommentProvider>
        </AuthProvider>)
        const formTextArea = screen.getByRole('textbox');
        const formSendButton = screen.getByRole('button', {name: /send/i});

        await userEvent.type(formTextArea, "Lorem ipsum dolor sit amet");
        await userEvent.click(formSendButton);
        const newRootComment = await screen.findByText('Lorem ipsum dolor sit amet');
        expect(newRootComment).toBeInTheDocument();
    })
    test('creates new reply', async ()=>{
        render(
            <AuthProvider>
                <CommentProvider>
                    <DummyCommentContainer/>
                </CommentProvider>
            </AuthProvider>)
        const replyBtn = screen.getAllByRole('button');

        console.log(replyBtn[2]);
        await userEvent.click(replyBtn[2]);
        const replyFormBtn = screen.getByRole('button', {name: /send/i});
        const formTextArea = screen.getByRole('textbox');
        await userEvent.type(formTextArea, 'Lorem ipsum dolor sit amet');
        await userEvent.click(replyFormBtn);
        const replyComment = await screen.findByText('Lorem ipsum dolor sit amet');
        expect(replyComment).toBeInTheDocument();
    })
})