import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return(
		<div>
	 	 <p className='white f3 mb5 fw5'>
	 	 	{'This app will detect face in your picture. Upload a photo!'}

	 	 </p>
	 	 <div className='center'>
	 	  <div className='form center pa4 br3 shadow-5'>
	 	   <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} placeholder="Image URL" />
	 	   <button 
	 	   	className='w-30 grow f4 link ph3 pv2 dib white bg-red'
	 	   	onClick={onButtonSubmit}
	 	   	>Detect</button>
		  </div>
	 	 </div>
		</div>

		);
}

export default ImageLinkForm;