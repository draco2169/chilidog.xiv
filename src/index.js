import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
 



// todo be able to search -> make this a function
//const charName = "Chili Dog"
//const server = "sephirot"


// this is broken? -> xivpai lodestone raw endpoints do not work anymore
// consider using https://github.com/xivapi/xivapi-js
// https://github.com/xivapi/nodestone?tab=readme-ov-file#readme

// const character = await this.characterParser.parse({ params: { characterId: id } });
// console.log(character);


// atm using standalone parser nodestone -> simply run standalone with yarn run express:start in folder.
// figure out how to cloud deploy (droplet?) (google cloud?)

async function fetchIDfromSearch(charName, server) {
  console.log(charName);
  const urlString = "http://localhost:8080/character/search?name=" + charName + "&server=" + server;
  let response = await fetch(urlString, { mode: 'cors' });
  let data = await response.json();
  return data.List[0].ID; 
}

async function fetchDataFromID(ID) {
  ID = await ID;
  const urlString = "http://localhost:8080/character/" + ID + "?data=CJ";
  let response = await fetch(urlString, { mode: 'cors' });
  let data = await response.json();

  console.log(urlString)
  // USE THIS TO GRAB CHARA DATA
  return data; 
}


// For now this stays
class CharBox extends React.Component {
  constructor(props) {
    super(props);
    // will store data for chara jobs and portrait url
    // initialised as array with level all 0, null url
    this.state = {
      formName: "Chili Dog",
      server: "Sephirot",
      charName: "",
      activeJob: null,
      activeJobLevel: 0,
      jobs: {Paladin: {Unlockstate: "", Level: 0}},
      portraitUrl: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleServerChange = this.handleServerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({formName: event.target.value})
  }

  handleServerChange(event) {
    this.setState({server: event.target.value})
  }

  handleSubmit(event) {
    this.setState({portraitUrl: null})
    event.preventDefault();
  }

  render() {
    // uses data and adds it to state (does this once only)
    // change this 
    if (!this.state.portraitUrl) {
      fetchDataFromID(fetchIDfromSearch(this.state.formName, this.state.server)).then(data => this.setState({
        activeJob: data.Character.ActiveClassjob,
        activeJobLevel: data.Character.Level,
        portraitUrl: data.Character.Portrait, 
        jobs: data.ClassJobs,
        charName: data.Name
      }));
    }

    console.log(this.state.activeJob)
    console.log(this.state.portraitUrl)
    console.log(this.state.jobs);
    return (
      <div className='display'>
        <div className = 'portrait'>
          <div className = 'portraitInner'>
            <h1>{this.state.charName}</h1>
            <p>{this.state.jobs.Paladin.Unlockstate} {this.state.jobs.Paladin.Level}</p>
            <img src={this.state.activeJob} alt="Active Job" width={"100"}/>
            <p>{this.state.activeJobLevel}</p> 
            <div className = 'char'>
              <img src={this.state.portraitUrl} alt="Character Portrait" width={"350"}/>
            </div>
          </div>
          <div className = 'form'>
            <form onSubmit = {this.handleSubmit}>
              <label>
                Name:
                <input type = 'text' value = {this.state.formName} onChange = {this.handleInputChange} />
              </label>
              <br />
              <label>
                Server:
                <select value = {this.state.server} onChange = {this.handleServerChange}>
                  <option value = "Bismarck">Bismarck</option>
                  <option value = "Ravana">Ravana</option>
                  <option value = "Sephirot">Sephirot</option>
                  <option value = "Sophia">Sophia</option>
                  <option value = "Zurvan">Zurvan</option>
                </select>
              </label>
              <input type = 'submit' value = 'Search!' />
            </form>
          </div>
        </div>
        {/* <div className = 'jobList'>
          <div className = 'tanksDps'>
            <div className = 'tanks'>
              <h3>Tanks</h3>
              <p>{this.state.jobs.Paladin.Unlockstate} {this.state.jobs.Paladin.Level}</p>
              <p>{this.state.jobs[3].UnlockState} {this.state.jobs[3].Level}</p>
              <p>{this.state.jobs[3].UnlockState} {this.state.jobs[3].Level}</p>
              <p>{this.state.jobs[3].UnlockState} {this.state.jobs[3].Level}</p>
            </div>
            <div className = 'dps'>
            <h3>DPS</h3>
              <p>{this.state.jobs[8].UnlockState} {this.state.jobs[8].Level}</p>
              <p>{this.state.jobs[9].UnlockState} {this.state.jobs[9].Level}</p>
              <p>{this.state.jobs[10].UnlockState} {this.state.jobs[10].Level}</p>
              <p>{this.state.jobs[11].UnlockState} {this.state.jobs[11].Level}</p>
              <p>{this.state.jobs[12].UnlockState} {this.state.jobs[12].Level}</p>
              <p>{this.state.jobs[13].UnlockState} {this.state.jobs[13].Level}</p>
              <p>{this.state.jobs[14].UnlockState} {this.state.jobs[14].Level}</p>
              <p>{this.state.jobs[15].UnlockState} {this.state.jobs[15].Level}</p>
              <p>{this.state.jobs[16].UnlockState} {this.state.jobs[16].Level}</p>
              <p>{this.state.jobs[17].UnlockState} {this.state.jobs[17].Level}</p>
              <p>{this.state.jobs[18].UnlockState} {this.state.jobs[18].Level}</p>
              <p>{this.state.jobs[19].UnlockState} {this.state.jobs[19].Level}</p>
            </div>
          </div>
          <div className = 'healersOther'>
            <div className = 'healers'>
              <h3>Healers</h3>
              <p>{this.state.jobs[4].UnlockState} {this.state.jobs[4].Level}</p>
              <p>{this.state.jobs[5].UnlockState} {this.state.jobs[5].Level}</p>
              <p>{this.state.jobs[6].UnlockState} {this.state.jobs[6].Level}</p>
              <p>{this.state.jobs[7].UnlockState} {this.state.jobs[7].Level}</p>
            </div>
            <div className = 'DoH'>
            <h3>DoH</h3>
              <p>{this.state.jobs[20].UnlockState} {this.state.jobs[20].Level}</p>
              <p>{this.state.jobs[21].UnlockState} {this.state.jobs[21].Level}</p>
              <p>{this.state.jobs[22].UnlockState} {this.state.jobs[22].Level}</p>
              <p>{this.state.jobs[23].UnlockState} {this.state.jobs[23].Level}</p>
              <p>{this.state.jobs[24].UnlockState} {this.state.jobs[24].Level}</p>
              <p>{this.state.jobs[25].UnlockState} {this.state.jobs[25].Level}</p>
              <p>{this.state.jobs[26].UnlockState} {this.state.jobs[26].Level}</p>
              <p>{this.state.jobs[27].UnlockState} {this.state.jobs[27].Level}</p>
            </div>
            <div className = 'DoL'>
            <h3>DoL</h3>
              <p>{this.state.jobs[28].UnlockState} {this.state.jobs[28].Level}</p>
              <p>{this.state.jobs[29].UnlockState} {this.state.jobs[29].Level}</p>
              <p>{this.state.jobs[30].UnlockState} {this.state.jobs[30].Level}</p>
            </div>
          </div>       
        </div> */}
        <div className = 'footer'>
          <a href = "https://github.com/draco2169/chilidog.xiv" title = "Github Link" target = "_blank">@github.com/draco2169/chilidog.xiv</a>
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