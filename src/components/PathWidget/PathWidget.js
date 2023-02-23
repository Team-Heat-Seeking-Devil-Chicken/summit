import React from 'react';
import { useState, useEffect } from 'react';
import styles from './PathWidget.module.css';
import { ProgressBar } from '../../components';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PathWidget({ complete, title, data }) {

  const [cardToggle, setCardToggle] = useState(false);
  const [toggleType, setToggleType] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [dataInput, setDataInput] = useState('');
  

  
  useEffect(() => {
    if (title) setTitleInput(title);
    if (data) setDataInput(data);
  }, [])

  //delete card
  function handleDeleteCard() {
    axios.delete('api/goal/cardId', data)
  }

  //update card
  function handleEditCard() {
    axios.patch('api/goal/cardId', data)
    setCardToggle(false);
  }
  // create card toggle
  
  function handleCardToggle() {
    setCardToggle(true);
  }


  // handlePostRequest
  function handlePostRequest(data) {
    axios.post('/api/goal', data);
    setCardToggle(false);
  }

  if (cardToggle)
    return (
      <div>
       <div className={styles.wrapper}>
          <form>
              <section className={styles.heading}>
                <input 
                  type ="text" 
                  name="title" 
                  placeholder='Title' 
                  value={titleInput}
                  onChange={e => setTitleInput(e.target.value)}
                ></input>
              </section>
          
            <div className={styles.content}>
            <input 
              type ="text" 
              name="data" 
              placeholder='Steps' 
              value={dataInput}
              onChange={e => setDataInput(e.target.value)}>
            </input>
            <button 
            onClick={
              (e) => {
                e.preventDefault();

                if(toggleType === 'create') {
                  const newSpire = {
                    title: titleInput,
                    user: 36,
                    description: dataInput
                  }
                  console.log('new spire: ', newSpire);
                  setCardToggle(false);
                  //handlePostRequest(newSpire)
                }  
                if(toggleType === 'edit') {
                  const editedSpire = {
                    title: titleInput,
                    spireID: 36,
                    description: dataInput
                  }
                  console.log('edited spire: ', editedSpire);
                  setCardToggle(false);
                  //handleEditCard(editedSpire)
                }           
              }
            }
            >Submit</button> 
            </div>
          </form> 
        </div>
      </div>
    )

  if (!complete && !data && !title)
    return (
      <div onClick={ () => {
          setToggleType('create');
          handleCardToggle()
        }
      } 
      className={styles.wrapper}>
        <span style={{ margin: '0 auto' }}>+</span>
        <span style={{ margin: '0 auto' }}>Add a new path</span>      
      </div>
    );

  return (
    //<Link to="/profile">
    <div className={styles.wrapper}>
      <section className={styles.heading}>
        <h4>{title}</h4>
      </section>
      <div className={styles.content}>
        <h6>Next:</h6>
      </div>
      <div className={styles.progressBar}>
        <ProgressBar progress={complete} />
      </div>
      <div onClick = {handleDeleteCard} className="delete-button">
        <button>Delete</button>
      </div>
      <div 
      onClick={() => {
        setToggleType('edit');
        handleCardToggle();
      }
      } 
      className="edit-button"
      >
        <button>Edit</button>
      </div>
    </div>
    // {/* //</Link> */}
  );
}

export default PathWidget;
