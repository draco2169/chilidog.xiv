import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
 

// todo be able to search -> make this a function
//const charName = "Chili Dog"
//const server = "sephirot"
//const urlstring = "https://xivapi.com/character/search?name=" + charName + "&server=" + server;

async function fetchIDfromSearch(charName, server) {
  const urlString = "https://xivapi.com/character/search?name=" + charName + "&server=" + server;
  let response = await fetch(urlString, { mode: 'cors' });
  let data = await response.json();
  return data.Results[0].ID;
}

async function fetchDataFromID(ID) {
  ID = await ID;
  const urlString = "https://xivapi.com/character/"+ID;
  let response = await fetch(urlString, { mode: 'cors' });
  let data = await response.json();

  // USE THIS TO GRAB CHARA DATA
  return data.Character; 
}

class CharaBox extends React.Component {
  constructor(props) {
    super(props);
    // will store data for chara jobs and portrait url
    // initialised as array with level all 0, null url
    this.state = {
        jobs: Array(31).fill({"Level": 0}),
        portraitUrl: null,
    };
}

  render() {
    // uses data and adds it to state (does this once only)
    if (!this.state.portraitUrl) {
      fetchDataFromID(fetchIDfromSearch("Chili Dog", "sephirot")).then(data => this.setState({portraitUrl: data.Portrait, jobs: data.ClassJobs}));
    }

    return (
      <div>
        <div className='Joblist'>
          <h1>Warrior:</h1>
          <p>{this.state.jobs[1].Level}</p>
        </div>
        <div className='portrait'>
          <img src={this.state.portraitUrl} alt=""/>
        </div>
      </div>
      
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CharaBox />)