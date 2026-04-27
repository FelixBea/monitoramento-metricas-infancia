import styles from "./LoginForm.module.css";

export const LoginForm = () => {
  return (
    <form className={styles.login}>
      <fieldset className={styles.fieldset}>
        <div className={styles.field}>
          <label>
            <div>Usuário:</div>
            <input type="text" name="user" aria-label="usuário"></input>
          </label>
        </div>
        <div className={styles.field}>
          <label>
            <div>Senha:</div>
            <input
              type="password"
              name="password"
              aria-label="password"
            ></input>
          </label>
        </div>
      </fieldset>
      <button>Entrar</button>
    </form>
  );
};
