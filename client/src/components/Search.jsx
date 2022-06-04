import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }

    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search(callback) {
    this.props.onSearch(this.state.term, callback);
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.term} onChange={this.onChange}/>
      <button onClick={() => {
        this.search(this.props.onClick());
        console.log('updated')
      }}> Add Repos </button>
    </div>)
  }
}

export default Search;