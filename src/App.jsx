import { useEffect, useState } from 'react';
import './App.css'
import fetchData from './fetchData';
import { STORAGE_CHAMPIONS_KEY } from './constants';
import Game from './components/Game';
import shuffle from './shuffle';

function App() {
  const [champions, setChampions] = useState(JSON.parse(sessionStorage.getItem(STORAGE_CHAMPIONS_KEY)) ?? {});

  function updateChampions(newChampions)
  {
    setChampions(newChampions);
    sessionStorage.setItem(STORAGE_CHAMPIONS_KEY, JSON.stringify(newChampions));
  }

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_CHAMPIONS_KEY)) return;

    const versionURL = '/api/versions.json';

    Promise.resolve(fetchData(versionURL))
      .then(fetchedVersion => {
        Promise.resolve(fetchData(`/cdn/${fetchedVersion[0]}/data/en_US/champion.json`))
        .then(fetchedChamions => {
          updateChampions(fetchedChamions); 
        })
        .catch(error => {
          console.error('Error in promise chain: ', error);
        });
      })
      .catch(error => {
        console.error('Error in promise chain: ', error);
      });
  }, []);

  const loaded = Object.keys(champions).length > 0;

  const randomChamps = getNRandomFromObject(champions.data, 16);

  return (loaded ? 
    <>
      <Game champions={randomChamps}/>
    </>
    :
    <h1>Loading...</h1>
  )
}

function getNRandomFromObject(obj, N)
{
  const entries = Object.entries(obj);
  const shuffled = [...entries];
  shuffle(shuffled);

  const selectedEntries = shuffled.slice(0, N);

  return Object.fromEntries(selectedEntries);
}

export default App
