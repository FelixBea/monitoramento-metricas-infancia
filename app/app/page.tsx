import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Monitoramento de métricas da infância API</h1>
    <Link href='/login'>Login</Link>
    <Link href='/criancas'>Lista de crianças</Link>
    </div>
  );
}
