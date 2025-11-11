import styles from './page.module.scss';
import logoImg from '../../public/Logotipo MammaMia.png';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/services/api';
import { redirect } from 'next/navigation';

export default function Page(){

  async function handleLogin(formData: FormData){
    "use server"

    const email = formData.get('email');
    const password = formData.get('password');
    
    if(email === '' || password === ''){
      console.log('Preencha todos os campos');
      return;
    }

    try{
      const response = await api.post('/session', {
        email,
        password
      });

      if(!response.data.token){
        return;
      }

      console.log(response.data);
    }catch(err){
      console.log('Erro ao fazer login:', err);
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