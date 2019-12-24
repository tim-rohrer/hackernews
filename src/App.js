import React, {useState, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
import Search from './components/Search';
import Table from './components/Table';

function App() {

  const DEFAULT_QUERY = 'catalina';
  const PATH_BASE = 'https://hn.algolia.com/api/v1';
  const PATH_SEARCH = '/search';
  const PARAM_SEARCH = 'query=';

  const [list, setList] = useState([])
  const [result, setResult] = useState(null)
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY)

  const onDismiss = objectID => {
    const updatedList = list.filter( item => {
      return item.objectID !== objectID
    })
    setList(updatedList)
  }

  const onSearchChange = event =>
    setSearchTerm(event.target.value)

  const setSearchTopStories = data => {
    console.log("Hacker News Stories: ", data)
    setResult(data);
  }

  useEffect( () => {
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setSearchTopStories(data))
      .catch(error => error);
  },[searchTerm])

  if (!result) { return null; }

  return (
    <div className="page">
      <div className="interactions">
        <Search
          value={searchTerm}
          onChange={onSearchChange}
        >
          Search:
        </Search>
        </div>
        <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={onDismiss}
        />
      </div>
  );
}

export default App;