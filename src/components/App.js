import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      emoji: [],
      filterMojiText: ''
    }
  }

  filterMoji = (e) => {
    this.setState({
      filterMojiText: e.target.value
    })
  }

  render() {
    const {emoji} = this.state;

    const filteredList = emoji
    .filter( item => {
      return item.keywords.toLowerCase().split(" | ").includes(this.state.filterMojiText.toLowerCase()) && this.state.filterMojiText !== " " || item.name.toLowerCase().split(" | ").indexOf(this.state.filterMojiText.toLowerCase()) > -1
    });

    console.log(filteredList);

    return (
      <div className="App">
        <input 
          type="text"
          autoComplete="off"
          className="filter-emoji" 
          onChange={this.filterMoji}
          name="name"
          value={this.state.filterMojiText}
          placeholder="Search..."/>

        <div className="emoji-wrapper">
        { this.state.filterMojiText === '' ? "" : filteredList
        .map(item => 
          <div key={item.codes} className="emoji-container"> 
            <span className="emoji-char">{item.char}</span>
            <span className="emoji-description">{item.name}</span>
          </div>
        )}
        </div>
      </div>
    );
  }

  componentDidMount(){
    fetch("https://unpkg.com/emoji.json/emoji.json")
    .then( response => response.json())
    .then( data => this.setState({ emoji: data}));
  }
}


export default App;
