import { useEffect, useState } from 'react';
import './App.css';
import BallotCategory from './Components/BallotCategory/BallotCategory';
import Modal from './Components/Modal/Modal';

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

  const vote = (category, nomineeId, nominee) => {
    if(voteSubmitted) {
      return;
    }

    const currentBallot = ballotVote.slice();
    const currentCategoryVote = ballotVote.find((vote) => vote.category === category && vote.nomineeId === nomineeId);
    if (!!currentCategoryVote) {
      setBallotVote(currentBallot.filter((vote) => vote.category !== category));
    } else {
      setBallotVote(currentBallot.filter((vote) => vote.category !== category)
                                 .concat({category : category, nomineeId : nomineeId, nominee : nominee}));
    }
  }

  useEffect(() => {
    getBallotData();
  },[])
  
  return (
    <div className="App">
      <Modal isVisible={voteSubmitted} ballot={ballotVote}/>
      <header className="App-header">
        <img src={'https://www.svgrepo.com/show/349409/imdb.svg'} className="App-logo" alt="logo" />
        <h1>AWARDS 2022</h1>
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
