import styles from './../page.module.scss';
import logoImg from '../../../public/Logotipo MammaMia.png';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/services/api';
import { redirect } from 'next/navigation'; 

export default function Signup(){

    async function handleRegister(formData: FormData){
        "use server"
        
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        if(email === '' || password === '' || name === ''){
            return;
        }

        try{
            await api.post('/users', {
                name,
                email,
                password
            })
        }catch(err){
            console.log(err);
        }

        redirect('/');
    }

    return(
    <>
        <div className={styles.containerCenter}>
            <Image 
                src={logoImg} 
                alt="Logo MammaMia" 
            />

            <section className={styles.login}>
                <h1>Cadastrando sua conta</h1>
                <form action={handleRegister}>

                    <input 
                    type="text" 
                    required
                    name='name'
                    placeholder='Nome'
                    className={styles.input}
                    />

                    <input 
                    type="text" 
                    required
                    name='email'
                    placeholder='E-mail'
                    className={styles.input}
                    />

                    <input 
                    type="password" 
                    required
                    name='password'
                    placeholder='Senha'
                    className={styles.input}
                    />

                    <button type='submit'>
                    Cadastrar
                    </button>
                </form>

                <Link href="/" className={styles.text}>
                    Ja possui uma conta? Faça o login
                </Link>
            </section>
        </div>
    </>
    )
}