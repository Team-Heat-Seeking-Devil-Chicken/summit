import React from 'react';
import { Link } from 'react-router-dom';
import { PathWidget, HorizontalScroll, Collection } from '../../components';
import styles from './Home.module.css';

export default function Home() {
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
        href={`https://github.com/login/oauth/authorize?client_id=ca1bf5075d1ff773466b&redirect_uri=http://localhost:8080/api/auth`}
      >
        Sign in
      </a>
    </main>
  );
}
