import { useNavigate } from 'react-router';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

//import arquivos css
import '../styles/auth.scss';
import '../styles/button.scss';

// import components
import { Button } from '../components/Button';

import {useAuth} from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
 
// impotr context   

export function Home(){
    //hoock de navegação
    const navigate = useNavigate();

    // armazena os dados do usuario
    const {user, signInWithGoogle} = useAuth();

    //armazena dados da sala que o usuario que acessar 
    const [roomCode, setRoomCode] = useState(''); 

    async function  handleRommCreate() {
        //verifica se o usuario esta logado para acessa a sala de criação de sala
        if(!user){
            await signInWithGoogle();
        }
        //redireciona para tela de criação de sala
        navigate('/rooms/new')
      }

      async function handleKoinRoomUpdate(event: FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exist');
            return;
        }

        if(roomRef.val().endedAt){
            alert("room already ended");
            return;
        }

        navigate(`/rooms/${roomCode}`)
      }


    return (
        <div id="page-auth" >
            <aside>
                <img width="500" height="500" src={illustrationImg}  alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie sala de Q&amp;A ao-vivo</strong>
                <p>Tire dúvidas da sua audiencia em tempo real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img width="150" height="80" src={logoImg} alt="letmeask" />
                    <button className="create-room" onClick={handleRommCreate}>
                        <img src={googleIconImg} alt="Logo do google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form action="" onSubmit={handleKoinRoomUpdate}>
                        <input 
                        type="text" 
                        placeholder='Digite o código da sala'
                        onChange = {event => setRoomCode(event.target.value)}
                        value= {roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}