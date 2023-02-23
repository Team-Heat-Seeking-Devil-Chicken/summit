import React from 'react';
import { Link } from 'react-router-dom';
import { PathWidget, HorizontalScroll, Collection } from '../../components';
import styles from './Home.module.css';
import axios from 'axios';

//axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export default function Home() {
  const config = {
    headers: {
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': '*',
      // 'Access-Control-Allow-Methods': '*',
      // 'Access-Control-Allow-Credentials': true
      'Content-Type': 'authorization'
    }
  };
  function handleLogin() {
    axios
      .get('/api/auth/login/github/', config)
      .catch((err) => console.log(err));
  }

  return (
    <main>
      <h2 className={styles.heading}>Your Spires</h2>
      <Collection styles={styles.collection}>
        <HorizontalScroll>
          <PathWidget title={'Run a marathon'} complete={Math.random()} />
          <PathWidget title={'Go to Paris'} complete={Math.random()} />
          <PathWidget
            title={'Visit every AAA baseball stadium'}
            complete={Math.random()}
          />
          <PathWidget title={'Get a passport'} complete={Math.random()} />
          <PathWidget />
        </HorizontalScroll>
      </Collection>
      <a
        className={styles.signIn}
        // delete this and set up api request
        onClick={(e) => {
          e.preventDefault();

          console.log('log in initiated');
          handleLogin();
        }}
      >
        Sign in
      </a>
    </main>
  );
}
