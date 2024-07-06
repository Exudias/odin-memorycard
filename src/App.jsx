import { useEffect, useState } from 'react';
import './App.css'
import fetchData from './fetchData';

function App() {
  const [version, setVersion] = useState("");
  const [champions, setChampions] = useState({});

  useEffect(() => {
    const versionURL = '/api/versions.json';

    Promise.resolve(fetchData(versionURL))
      .then(fetchedVersion => {
        setVersion(fetchedVersion[0]); 
        Promise.resolve(fetchData(`/cdn/${fetchedVersion[0]}/data/en_US/champion.json`))
        .then(fetchedChamions => {
          setChampions(fetchedChamions); 
        })
        .catch(error => {
          console.error('Error in promise chain: ', error);
        });
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
