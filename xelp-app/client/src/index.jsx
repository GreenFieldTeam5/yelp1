import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Search from './Search.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	searchInput: ''
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
  }

  handleSearchInputChange(e) {
  	this.setState({searchInput: e.target.value});
  	console.log(e.target.value);
  }

  handleSearchButtonClick() {
  	console.log(`doing axios call with search input: ${this.state.searchInput}`);
  	axios.get(`/search/${this.state.searchInput}`)
  		.then(function (response) {
    		console.log(response);
  		})
  		.catch(function (error) {
	    	console.log(error);
	  	});
  }

  render() {
    return (
    	<div>
      	<div> Title Page </div>
      	<Search searchInput={this.state.searchInput} handleSearchInputChange={this.handleSearchInputChange} 
      		handleSearchButtonClick={this.handleSearchButtonClick} />
      </div>
    )
  }
}

ReactDOM.render( <App />, document.getElementById('app'));
