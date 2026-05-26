"use client";

import styles from "./LoginForm.module.css";
import { signin } from '../actions/auth';
import { useActionState } from 'react';

export const LoginForm = () => {
  const [state, signinFormAction, isPending] = useActionState(signin, null);

  console.log(state);

  return (
    <form className={styles.login} action={signinFormAction}>
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
      <button type="submit">Entrar</button>
    </form>
  );
};
