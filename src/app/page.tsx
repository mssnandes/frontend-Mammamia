import styles from './page.module.scss';
import logoImg from '../../public/Logotipo MammaMia.png';
import Image from 'next/image';
import Link from 'next/link';


export default function Page(){
  return(
    <>
      <div className={styles.containerCenter}>
        <Image 
          src={logoImg} 
          alt="Logo MammaMia" 
        />

        <section className={styles.login}>
          <form action="">
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