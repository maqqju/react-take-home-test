const Modal = ({isVisible, ballot}) => {
    return (
        <div className={isVisible ? 'overlay showing' : 'overlay'}>
            <div className="modal">
                <div>
                    <h1>Vote Submitted Successfully!</h1>
                </div>
                <div>
                    {ballot?.map((ballotNomination) => 
                        <img src={ballotNomination.nominee.photoUrL} alt={ballotNomination.nominee.title}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modal;