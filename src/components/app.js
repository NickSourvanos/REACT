import React from 'react'

const App = ({clickPlus, clickMinus, getCounter}) => 

  <div>

    
    <h1> {getCounter} </h1>


    <div 
      onClick={ e => {
        console.log("click ++")
        clickPlus()
      }} >  
      ++ 
    </div>

    <div 
      onClick={ e => {
        console.log("click --")
        clickMinus()
      }} >  
      -- 
    </div>


    


  </div>
   
export default App