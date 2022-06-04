import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Table from './components/Table.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      topRepos: [],
      bool: false
    }
  }

  componentDidMount() {
    this.get25();
  }

  get25() {
    $.ajax({
      type: 'GET',
      url: '/repos',
      success: (repos) => {
        let topRepos = repos.sort((a, b) => {
          return b.stargazers_count - a.stargazers_count;
        })
        topRepos = topRepos.slice(0, 25);
        this.setState({repos: repos, topRepos: topRepos})
      }
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: 'POST',
      url: '/repos',
      data: JSON.stringify({data: term}),
      contentType: 'application/json',
      success: () => {setTimeout(() => {
        this.get25();
      }, 1000);},
      error: function() {console.log('Failed Search')}
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <Table top={this.state.topRepos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));