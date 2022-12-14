import Ballot from '../Ballot/Ballot';

const BallotCategory = ({category, ballotVote, categoryNomination}) => {
    return (
        <section>
            <div>
                <h1>{category.title}</h1>
            </div>
            <div className="ballot-container">
                {
                    category.items.map((nomination) => 
                        <Ballot isNominated={nomination.id===categoryNomination?.nominee}
                                vote={() => ballotVote(nomination.id)}
                                key={nomination.id} 
                                nomination={nomination}
                        />)
                }
            </div>
        </section>
    )
}

export default BallotCategory;