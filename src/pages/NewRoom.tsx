import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router';

import {FormEvent, useState} from 'react'

import {useAuth} from '../hooks/useAuth';

//import database
import {database} from '../services/firebase'

//import arquivos css
import '../styles/auth.scss';
import '../styles/button.scss';

// import components
import { Button } from '../components/Button';

export function NewRoom(){
    // armazena os dados do usuario
    const {user} = useAuth();

    //armazena o vlaor do imput do formulário
    const [newRoom, setNewRoom] = useState('');
    
    //hoock de navegação
    const navigate = useNavigate();

    async function hanldeCreateRoom(event: FormEvent) {
        event.preventDefault();
        //verifica se não existem espaços em branco a esquerda/direita do nome da sala
        if(newRoom === ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });

        //redireciona para tela da sala
        navigate(`/rooms/${firebaseRoom.key}`);

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
                    <h2>Criar uma nova sala</h2>
                    <form action="" onSubmit={hanldeCreateRoom}>
                        <input 
                        type="text" 
                        placeholder='Nome da sala'
                        onChange={event => setNewRoom(event.target.value)}
                        value= {newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente ? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}