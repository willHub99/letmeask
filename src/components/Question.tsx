import '../styles/question.scss'
import cx from 'classnames'

import {ReactNode} from 'react'

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

export function Question({
    content,
    author,
    children,
    isAnswered = false,
    isHighlighted = false,
}: QuestionProps){
    return (
        <div className={cx('question', {answered: isAnswered}, {highlight: isHighlighted && !isAnswered})}>
            <p>{content}</p>

            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt="user image"/>
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}