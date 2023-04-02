import {act, render, screen} from "@testing-library/react";
import CommentProvider from "../../context/CommentProvider";
import Comment from "../Comments/Comment";
import userEvent from "@testing-library/user-event";

describe('<Vote/>', ()=>{
    describe('upvotes', () =>{
        test('upvotes the comment', () =>{
            render(<CommentProvider>
                <Comment id={1} replies={[]} score={0} content={'Nice job'} createdAt={new Date().toISOString()} user={{username: 'John Doe', image: {png: ''}}}/>
            </CommentProvider>)
            const commentBtns = screen.getAllByRole('button');
            const score = screen.getByText('0');
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() =>{
                userEvent.click(commentBtns[0]);
            })

            expect(score).toHaveTextContent('1');

        })
        test('rollback an upvote', ()=>{
            render(<CommentProvider>
                <Comment id={1} replies={[]} score={0} content={'Nice job'} createdAt={new Date().toISOString()} user={{username: 'John Doe', image: {png: ''}}}/>
            </CommentProvider>)
            const commentBtns = screen.getAllByRole('button');
            const score = screen.getByText('0');
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() =>{
                userEvent.click(commentBtns[0]);
                userEvent.click(commentBtns[0]);
            })
            expect(score).toHaveTextContent('0');
        })
        test('upvote a comment that is already downvoted', () =>{
            render(<CommentProvider>
                <Comment id={1} replies={[]} score={0} content={'Nice job'} createdAt={new Date().toISOString()} user={{username: 'John Doe', image: {png: ''}}}/>
            </CommentProvider>)
            const commentBtns = screen.getAllByRole('button');
            const score = screen.getByText('0');
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() =>{
                userEvent.click(commentBtns[1]);
                userEvent.click(commentBtns[0]);
            })

            expect(score).toHaveTextContent('1');

        })
    })
    describe('downvotes', ()=>{
        test('downvotes the comment', () =>{
            render(<CommentProvider>
                <Comment id={1} replies={[]} score={0} content={'Nice job'} createdAt={new Date().toISOString()} user={{username: 'John Doe', image: {png: ''}}}/>
            </CommentProvider>)
            const commentBtns = screen.getAllByRole('button');
            const score = screen.getByText('0');
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() =>{
                userEvent.click(commentBtns[1]);
            })

            expect(score).toHaveTextContent('-1');

        })
        test('downvote a comment that is already upvoted', () =>{
            render(<CommentProvider>
                <Comment id={1} replies={[]} score={0} content={'Nice job'} createdAt={new Date().toISOString()} user={{username: 'John Doe', image: {png: ''}}}/>
            </CommentProvider>)
            const commentBtns = screen.getAllByRole('button');
            const score = screen.getByText('0');
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() =>{
                userEvent.click(commentBtns[0]);
                userEvent.click(commentBtns[1]);
            })

            expect(score).toHaveTextContent('-1');

        })
        test('rollback a downvote', ()=>{
            render(<CommentProvider>
                <Comment id={1} replies={[]} score={0} content={'Nice job'} createdAt={new Date().toISOString()} user={{username: 'John Doe', image: {png: ''}}}/>
            </CommentProvider>)
            const commentBtns = screen.getAllByRole('button');
            const score = screen.getByText('0');
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() =>{
                userEvent.click(commentBtns[1]);
                userEvent.click(commentBtns[1]);
            })
            expect(score).toHaveTextContent('0');
        })
    })
})