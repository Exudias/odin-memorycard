import { useEffect, useState } from 'react';
import './App.css'
import fetchData from './fetchData';

function App() {
  const [version, setVersion] = useState("");
  const [champions, setChampions] = useState({});

  useEffect(() => {
    const versionURL = '/api/versions.json';
    const championsURL = '/cdn/14.13.1/data/en_US/champion.json';

    Promise.resolve(fetchData(versionURL))
      .then(fetchedVersion => {
        setVersion(fetchedVersion[0]); 
      })
      .catch(error => {
        console.error('Error in promise chain: ', error);
      });

    Promise.resolve(fetchData(championsURL))
      .then(fetchedChamions => {
        setChampions(fetchedChamions); 
      })
      .catch(error => {
        console.error('Error in promise chain: ', error);
      });
  }, []);

  return (
    <>
      {Object.keys(champions).length > 0 && <h1>Champions #: {Object.keys(champions.data).length}</h1>}
      {version && <h1>Version: {version}</h1>}
    </>
  )
}

export default App
