import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';
import { useNavigate } from 'react-router';

import {useParams} from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';

import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';


type RoomParams = {
    id: string;
}

export function AdminRoom(){

    //hoock de navegação
    const navigate = useNavigate();

    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id!;
    const {questions, title} = useRoom(roomId);

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });

        navigate('/')
    }

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm("tem certezxa que deseja excluir essa pergunta ?")){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        });
    }

    async function handleHighlightQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        });
    }
    
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main >
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span> {questions.length} pergunta (s)</span>}
                </div>

                <div className="question-list">
                    {questions.map(question =>{
                        return (
                            < Question 
                                key={question.id}
                                content={question.content}
                                author={question.author} 
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}>
                                
                                {!question.isAnswered && (
                                    <>
                                        <Button type="button" onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </Button> 

                                        <Button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                                            <img src={answerImg} alt="Dar destaque a pergunta" />
                                        </Button> 
                                    </>
                                )}

                                <Button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </Button> 
                            </ Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}