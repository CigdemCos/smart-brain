import React from "react";
import './Origin.css';

const Origin = ({
      age,
      gender,
      appearance,
      appearancePercent,
      appearance2,
      appearancePercent2,
      appearance3,
      appearancePercent3,
      appearance4,
      appearancePercent4,
      appearance5,
      appearancePercent5,
      appearance6,
      appearancePercent6,
      appearance7,
      appearancePercent7
}) => {
  return (

    <div className="tc pa2 center">
   
 <article className="br3 ba b--white-30 mv4 w-100 w-150-m w-75-l mw7 shadow-5 center">
     <main className="pa4 gray-80">

      <div className="mt4 f4 white">
        This person is about <span>{age}</span> years old, Gender: <span>{gender}</span>
      </div>
      <div className="mv2 f4 white">
        {appearance} in <span>{appearancePercent}%</span>
      </div>
      <div className=" mv2 f4 white">
        {appearance2} in <span>{appearancePercent2}%</span>      
        </div>
      <div className=" mv2 f4 white">
        {appearance3} in <span>{appearancePercent3}%</span>
      </div>
      <div className=" mv2 f4 white">
        {appearance4} in <span>{appearancePercent4}%</span>
      </div>
      <div className=" mv2 f4 white">
        {appearance5} in <span>{appearancePercent5}%</span>
      </div>
      <div className=" mv2 f4 white">
        {appearance6} in <span>{appearancePercent6}%</span>
      </div>
      <div className=" mv2 f4 white">
        {appearance7} in <span>{appearancePercent7}%</span> 
      </div>
      </main>
      </article>
    </div>
  );
}

export default Origin;