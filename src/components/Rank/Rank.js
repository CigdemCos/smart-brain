import React from 'react';
import './Rank.css';

const Rank = ({name,entries}) => {
	return(
		<div>
	 	 <div className='white f3 center-rank '>
	 	 <p className="mt0 ttc">
	 	 {`Hello ${name}!`}
	 	 </p>
	 	 <p className="mt0">
	 	 	{`Number of Uploaded Photos:  ${entries}`}
	 	 </p>
	 
	 	 </div>
	 	  
		</div>

		);
}

export default Rank;