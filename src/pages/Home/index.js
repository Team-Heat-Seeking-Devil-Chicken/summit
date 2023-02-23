import React from 'react';
import { Link } from 'react-router-dom';
import { PathWidget, HorizontalScroll, Collection } from '../../components';
import styles from './Home.module.css';
import axios from 'axios';
// const dotenv = require('dotenv');
// dotenv.config({ path: '.env' });
// const process = require('process');
//axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export default function Home() {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'authorization'
    }
  };

  // function handleLogin() {
  //   // const id = process.env.REACT_APP_CLIENT_ID;
  //   // console.log(id);
  //   window.location.replace(
  //     'http://github.com/login/oauth/authorize?client_id=ca1bf5075d1ff773466b&redirect_uri=http://localhost:8080/api/auth/login/'
  //   );
  // }

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
        href={
          'http://github.com/login/oauth/authorize?client_id=ca1bf5075d1ff773466b&redirect_uri=http://localhost:8080/api/auth/login/'
        }
        // onClick={(e) => {
        //   e.preventDefault();

        //   console.log('log in initiated');
        //   handleLogin();
        // }}
      >
        Sign in
      </a>
    </main>
  );
}
