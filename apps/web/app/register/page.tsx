
'use client';

import { useState } from 'react';
import styles from './register.module.css';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegistrationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos del nuevo usuario
    console.log('Registrando usuario con:', { fullName, email });
    // Redirigir al dashboard o a la página principal de la app
  };

  return (
    <main className={styles.main}>
      <div className={styles.authContainer}>
        <h1 className={styles.title}>Completa tu Perfil</h1>
        <p className={styles.subtitle}>
          Solo necesitamos un par de datos más para crear tu cuenta.
        </p>
        <form onSubmit={handleRegistrationSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="fullName" className={styles.label}>Nombre Completo</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@example.com"
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Guardar y Continuar
          </button>
        </form>
      </div>
    </main>
  );
}
