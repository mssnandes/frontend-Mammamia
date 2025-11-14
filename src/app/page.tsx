import styles from './page.module.scss';
import logoImg from '../../public/Logotipo MammaMia.png';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/services/api';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function Page(){

  async function handleLogin(formData: FormData){
    "use server"

    const email = formData.get('email');
    const password = formData.get('password');
    
    if(email === "" || password === ""){
      return;
    }

    try{
      const response = await api.post('/session', {
        email,
        password
      });

      console.log(response.data);

      if(!response.data.token){
        return;
      }

      const cookieStore = await cookies();
      cookieStore.set('session', response.data.token, { 
        maxAge: 24 * 60 * 60, // 1 days
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production' 
      });

      console.log(response.data);
    }catch(err){
      console.log('Erro ao fazer login:', err);
      return;
    }

    redirect('/dashboard');

  }
  return(
    <>
      <div className={styles.containerCenter}>
        <Image 
          src={logoImg} 
          alt="Logo MammaMia" 
        />

        <section className={styles.login}>
          <form action={handleLogin}>
            <input 
              type="text" 
              required
              name='email'
              placeholder='E-mail'
              className={styles.input}
            />

            <input 
              type="password " 
              required
              name='password'
              placeholder='Senha'
              className={styles.input}
            />

            <button type='submit'>
              Login
            </button>
          </form>

          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>
        </section>
      </div>
    </>
  )
}