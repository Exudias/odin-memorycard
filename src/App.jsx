import { useEffect, useState } from 'react';
import './App.css'
import fetchData from './fetchData';
import { STORAGE_CHAMPIONS_KEY, DIFFICULTIES } from './constants';
import Game from './components/Game';
import shuffle from './shuffle';
import { preloadImage } from './preloadImages';
import Help from './components/Help'
import Copyright from './components/Copyright'

function App() {
  const [champions, setChampions] = useState(JSON.parse(sessionStorage.getItem(STORAGE_CHAMPIONS_KEY)) ?? {});
  const [difficulty, setDifficulty] = useState(1);
  const [caching, setCaching] = useState(true);
  const [dummy, setDummy] = useState(0);

  function updateChampions(newChampions)
  {
    setChampions(newChampions);
    sessionStorage.setItem(STORAGE_CHAMPIONS_KEY, JSON.stringify(newChampions));
  }

  useEffect(() => {
    if (Object.keys(champions).length <= 0) return;
    const imageURLs = Object.keys(champions.data).map((id) => `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`);
    Promise.all(imageURLs.map(preloadImage))
    .then(() => setCaching(false))
    .catch((err) => {
      console.error("Failed caching! ", err);
      setCaching(false);
    });
  }, [champions]);

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

  function handleSetDifficulty(id)
  {
    setDifficulty(id);
    document.title = "League of Memory | " + DIFFICULTIES[id].name;
  }

  const loaded = Object.keys(champions).length > 0;

  if (loaded && !caching)
  {
    const randomChamps = getNRandomFromObject(champions.data, DIFFICULTIES[difficulty].cardCount);
    return <>
      <div className="controls-menu">
        <button onClick={() => setDummy(dummy + 1)}>Try new</button>
        {Object.keys(DIFFICULTIES).map((key) => 
          <button key={key} onClick={() => handleSetDifficulty(key)} disabled={difficulty == key}>{DIFFICULTIES[key].name}</button>
        )}
      </div>
      <Help/>
      <Game champions={randomChamps} difficulty={difficulty}/>
      <Copyright/>
    </>
  }
  
  return <h1 className='loading-title'>Loading...</h1>;
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
