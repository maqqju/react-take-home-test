import { useEffect, useState } from 'react';
import './App.css';
import BallotCategory from './Components/BallotCategory/BallotCategory';

const API_URL = `http://localhost:8080/api/getBallotData`

function App() {
  const [ballotCategories,setBallotCategories] = useState([]);
  const [voteSubmitted,setVoteSubmitted] = useState(false);
  const [ballotVote, setBallotVote] = useState([]);


  const getBallotData = async () => {
    const response = await fetch(API_URL, {mode: 'cors'});
    const data = await response.json();
    setBallotCategories(data.items);
  }

  const vote = (category, nominee) => {
    if(voteSubmitted) {
      return;
    }

    const currentBallot = ballotVote.slice();
    const currentCategoryVote = ballotVote.find((vote) => vote.category === category && vote.nominee === nominee);
    if (!!currentCategoryVote) {
      setBallotVote(currentBallot.filter((vote) => vote.category !== category));
    } else {
      setBallotVote(currentBallot.filter((vote) => vote.category !== category)
                                 .concat({category : category, nominee : nominee}));
    }
  }

  useEffect(() => {
    getBallotData();
  },[])

  useEffect(() => {
    console.log(ballotVote);
  },[ballotVote])

  useEffect(() => {
    voteSubmitted && alert(`Congratulations! You voted for: \n ${ballotVote.map((vote) => vote.nominee).join("\n")}`);
  },[voteSubmitted,ballotVote])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={'https://www.svgrepo.com/show/349409/imdb.svg'} className="App-logo" alt="logo" />
        <h1>AWARDS 2021</h1>
      </header>
      <div>
        {ballotCategories?.length
          ? (
            ballotCategories.map((category) => 
              <BallotCategory 
                key={category.id} 
                category={category}
                ballotVote={vote.bind(null,category.id)}
                categoryNomination={ballotVote.find((categoryVote) => categoryVote.category === category.id)}
                />)
          ):(
            <span>No ballots found</span>
          )}
      </div>
      <button className="btnVote" onClick={() => ballotVote.length && setVoteSubmitted(true)}>Submit Ballot</button>
    </div>
  );
}

export default App;
