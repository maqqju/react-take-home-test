const Ballot = ({nomination, vote, isNominated}) => {
  return (
    <div className={isNominated ? 'ballot nominated' : 'ballot'}>
      <div>
        <strong>{nomination.title}</strong>
      </div>
      <div>
        <img src={nomination.photoUrL} alt={nomination.id}/>
      </div>
      <div>
        <button onClick={() => vote()}>{isNominated ? 'Deselect Nominee' : 'Select Nominee'}</button>
      </div>
    </div>
  )
}

export default Ballot;