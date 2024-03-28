

import React, { useState, useEffect } from 'react';

export function Home() {
    return (
        <>
          <p1>Hello World</p1>
        </>
        
        
    );
}

function App(){
    const [data, setData] = useState(null);
  
    useEffect(() => {
      fetch('http://localhost:5050/user/')
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(error));
    }, []);
  
    return (
      <div>
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
      </div>
    );
  
  }
