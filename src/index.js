import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
 

// todo be able to search -> make this a function
//const charName = "Chili Dog"
//const server = "sephirot"

async function fetchIDfromSearch(charName, server) {
  const urlString = "https://xivapi.com/character/search?name=" + charName + "&server=" + server;
  let response = await fetch(urlString, { mode: 'cors' });
  let data = await response.json();
  return data.Results[0].ID;
}

async function fetchDataFromID(ID) {
  ID = await ID;
  const urlString = "https://xivapi.com/character/" + ID;
  let response = await fetch(urlString, { mode: 'cors' });
  let data = await response.json();

  console.log(urlString)
  // USE THIS TO GRAB CHARA DATA
  return data.Character; 
}

class CharBox extends React.Component {
  constructor(props) {
    super(props);
    // will store data for chara jobs and portrait url
    // initialised as array with level all 0, null url
    this.state = {
      activeJob: {ID: 1, Name: ""},
      activeJobLevel: 0,
      jobs: Array(31).fill({Level: 0, UnlockedState: {ID: 0}}),
      portraitUrl: null,
    };
  }

  render() {
    // uses data and adds it to state (does this once only)
    if (!this.state.portraitUrl) {
      fetchDataFromID(fetchIDfromSearch("Tsakha Malqir", "sephirot")).then(data => this.setState({
        activeJob: data.ActiveClassJob.UnlockedState,
        activeJobLevel: data.ActiveClassJob.Level,
        portraitUrl: data.Portrait, 
        jobs: data.ClassJobs
      }));
    }

    return (
      <div>
        <div className = 'jobList'>
          <h1>{this.state.activeJob.Name}</h1>
          <p>{this.state.activeJobLevel}</p>
        </div>
        <div className = 'portrait'>
          <img src={this.state.portraitUrl} alt="Character Portrait" width={"150"}/>
        </div>
        <div className = 'tanks'>
          <h3>Tanks</h3>
          <p>ID:{this.state.jobs[0].UnlockedState.ID} Level:{this.state.jobs[0].Level}</p>
          <p>ID:{this.state.jobs[1].UnlockedState.ID} Level:{this.state.jobs[1].Level}</p>
          <p>ID:{this.state.jobs[2].UnlockedState.ID} Level:{this.state.jobs[2].Level}</p>
          <p>ID:{this.state.jobs[3].UnlockedState.ID} Level:{this.state.jobs[3].Level}</p>
        </div>
        <div className = 'healers'>
          <h3>Healers</h3>
          <p>ID:{this.state.jobs[4].UnlockedState.ID} Level:{this.state.jobs[4].Level}</p>
          <p>ID:{this.state.jobs[5].UnlockedState.ID} Level:{this.state.jobs[5].Level}</p>
          <p>ID:{this.state.jobs[6].UnlockedState.ID} Level:{this.state.jobs[6].Level}</p>
          <p>ID:{this.state.jobs[7].UnlockedState.ID} Level:{this.state.jobs[7].Level}</p>
        </div>
        <div className = 'dps'>
          <h3>DPS</h3>
          <p>ID:{this.state.jobs[8].UnlockedState.ID} Level:{this.state.jobs[8].Level}</p>
          <p>ID:{this.state.jobs[9].UnlockedState.ID} Level:{this.state.jobs[9].Level}</p>
          <p>ID:{this.state.jobs[10].UnlockedState.ID} Level:{this.state.jobs[10].Level}</p>
          <p>ID:{this.state.jobs[11].UnlockedState.ID} Level:{this.state.jobs[11].Level}</p>
          <p>ID:{this.state.jobs[12].UnlockedState.ID} Level:{this.state.jobs[12].Level}</p>
          <p>ID:{this.state.jobs[13].UnlockedState.ID} Level:{this.state.jobs[13].Level}</p>
          <p>ID:{this.state.jobs[14].UnlockedState.ID} Level:{this.state.jobs[14].Level}</p>
          <p>ID:{this.state.jobs[15].UnlockedState.ID} Level:{this.state.jobs[15].Level}</p>
          <p>ID:{this.state.jobs[16].UnlockedState.ID} Level:{this.state.jobs[16].Level}</p>
          <p>ID:{this.state.jobs[17].UnlockedState.ID} Level:{this.state.jobs[17].Level}</p>
          <p>ID:{this.state.jobs[18].UnlockedState.ID} Level:{this.state.jobs[18].Level}</p>
          <p>ID:{this.state.jobs[19].UnlockedState.ID} Level:{this.state.jobs[19].Level}</p>
        </div>
        <div className = 'DoH'>
          <h3>DoH</h3>
          <p>ID:{this.state.jobs[20].UnlockedState.ID} Level:{this.state.jobs[20].Level}</p>
          <p>ID:{this.state.jobs[21].UnlockedState.ID} Level:{this.state.jobs[21].Level}</p>
          <p>ID:{this.state.jobs[22].UnlockedState.ID} Level:{this.state.jobs[22].Level}</p>
          <p>ID:{this.state.jobs[23].UnlockedState.ID} Level:{this.state.jobs[23].Level}</p>
          <p>ID:{this.state.jobs[24].UnlockedState.ID} Level:{this.state.jobs[24].Level}</p>
          <p>ID:{this.state.jobs[25].UnlockedState.ID} Level:{this.state.jobs[25].Level}</p>
          <p>ID:{this.state.jobs[26].UnlockedState.ID} Level:{this.state.jobs[26].Level}</p>
          <p>ID:{this.state.jobs[27].UnlockedState.ID} Level:{this.state.jobs[27].Level}</p>
        </div>
        <div className = 'DoL'>
          <h3>DoL</h3>
          <p>ID:{this.state.jobs[28].UnlockedState.ID} Level:{this.state.jobs[28].Level}</p>
          <p>ID:{this.state.jobs[29].UnlockedState.ID} Level:{this.state.jobs[29].Level}</p>
          <p>ID:{this.state.jobs[30].UnlockedState.ID} Level:{this.state.jobs[30].Level}</p>
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CharBox />)

//something like
/*
app
  header
  if !charbox
    logo
    searchbox
  if charbox 
    charbox (with info from searchbox)
  if !charbox and search done
    loading gif
  footer
*/