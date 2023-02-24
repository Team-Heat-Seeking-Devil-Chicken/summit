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
  const [userbaseCards, setUserbaseCards] = useState([]);

  //fetches main user card and populates
  useEffect(function() {
    async function getMainUserCards() {
      let response = await fetch('/api/goal/1');
      let mainUserSpires = await response.json();
      console.log('mainUserSpires: ', mainUserSpires);
      const mainUserArray = mainUserSpires.map((spire) => {
        return <PathWidget title={spire.title} />;
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
    console.log('hello Im here');
    async function getUserbaseCards() {
      let response = await fetch('/api/allGoals');
      console.log('response: ', response);
      let userbaseSpires = await response.json();
      console.log('userbaseSpires: ', userbaseSpires);

      // fetch username for userId
      // let userResponse = await fetch('api/users/getUsers');
      // let names = await response.json();
      // console.log(names);

      // organize spires by users
      const spiresOrganized = {};
      const goalArray = [];
      userbaseSpires.forEach((element) => {
        if (spiresOrganized[element.userId])
          spiresOrganized[element.userId].push(element.title);
        else spiresOrganized[element.userId] = [element.title];
      });
      console.log('spires organized: ', spiresOrganized);
      let allCards = Object.values(spiresOrganized)
        .flat()
        .map((title) => {
          return <PathWidget title={title} />;
        });
      setUserbaseCards(allCards);
      // creates set of cards for each user
      const newSpireSet = [];
      Object.values(spiresOrganized).forEach((key) => {
        newSpireSet.push(
          spiresOrganized[key].map((title) => {
            <PathWidget title={title} />;
          })
        );
      });

      console.log('newSpireSet: ', newSpireSet);

      // setUserbaseCards(newSpireSet);

      // compile user spire sets into one array
      const userSpireContainers = [];
      Object.keys(spiresOrganized).forEach((key) => {
        userSpireContainers.push(
          <div>
            <h2 className={styles.heading}>{userId}</h2>
            <Collection styles={styles.collection}>
              <HorizontalScroll>{newSpireSet[key]}</HorizontalScroll>
            </Collection>
          </div>
        );
      });

      setUserbaseCards(userSpireContainers);
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
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>{userbaseCards}</div>
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
