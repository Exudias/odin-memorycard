import { useEffect, useState } from 'react';
import './App.css'
import fetchData from './fetchData';
import { STORAGE_CHAMPIONS_KEY, STORAGE_VERSION_KEY } from './constants';
import Game from './components/Game';

function App() {
  const [version, setVersion] = useState(sessionStorage.getItem(STORAGE_VERSION_KEY) ?? "");
  const [champions, setChampions] = useState(JSON.parse(sessionStorage.getItem(STORAGE_CHAMPIONS_KEY)) ?? {});

  function updateVersion(newVersion)
  {
    setVersion(newVersion);
    sessionStorage.setItem(STORAGE_VERSION_KEY, newVersion);
  }

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
        updateVersion(fetchedVersion[0]); 
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

  return (loaded ? 
    <>
      <Game/>
    </>
    :
    <h1>Loading...</h1>
  )
}

export default App
