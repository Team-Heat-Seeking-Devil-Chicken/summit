import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PathWidget, HorizontalScroll, Collection } from '../../components';
import styles from './Home.module.css';
import axios from 'axios';
// const dotenv = require('dotenv');
// dotenv.config({ path: '.env' });
// const process = require('process');
//axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export default function Home() {
  const [cardAdded, setCardAdded] = useState(true);

  const [mainUserCards, setMainUserCards] = useState('');
  const [userbaseCards, setUserbaseCards] = useState('');

  // fetches main user card and populates
  useEffect(function() {
    async function getMainUserCards() {
      let response = await fetch('/api/goal/1');
      let mainUserSpires = await response.json();
      console.log('mainUserSpires: ', mainUserSpires);
      const mainUserArray = mainUserSpires.map((spire) => {
        <PathWidget title={spire.title} description={title.description} />;
      });
      mainUserArray.splice(4, 0, <PathWidget />);
      setMainUserCards(
        <div>
          <h2 className={styles.heading}>Heat Seeking Devil Chicken Spires</h2>
          <Collection styles={styles.collection}>
            <HorizontalScroll>{mainUserArray}</HorizontalScroll>
          </Collection>
        </div>
      );
    }
    // call useeffect functions
    try {
      getMainUserCards();
    } catch (error) {
      console.error(error);
    }
  }, []);

  // fetches all userbase cards and populates
  useEffect(function() {
    async function getUserbaseCards() {
      let response = await fetch('/allGoals');
      let userbaseSpires = await response.json();
      console.log('userbaseSpires: ', userbaseSpires);
      const userbaseArray = userbaseSpires.map((spire) => {});
      setUserbaseCards(userbaseSpires);
    }
    // call useeffect functions
    try {
      getUserbaseCards();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <main>
      {mainUserCards}

      <a
        className={styles.signIn}
        // delete this and set up api request
        // href={
        //   'http://github.com/login/oauth/authorize?client_id=ca1bf5075d1ff773466b&redirect_uri=http://localhost:8080/api/auth/login/'
        // // }
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
