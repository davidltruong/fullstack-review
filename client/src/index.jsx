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
      reload: false
    }
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/repos',
      success: (repos) => {
        this.setState({repos: repos})
        let topRepos = repos.sort((a, b) => {
          return b.stargazers_count - a.stargazers_count;
        })
        topRepos = topRepos.slice(0, 25);
        this.setState({topRepos: topRepos})
      }
    })
  }

  forceUpdateHandler() {
    setTimeout(() => {
      window.location.reload(false)
      console.log('test')
    }, 5000);
  }

  search (term, callback) {
    console.log(`${term} was searched`);
    $.ajax({
      type: 'POST',
      url: '/repos',
      data: JSON.stringify({data: term}),
      dataType: 'JSON',
      contentType: 'application/json',
      success: function() {callback; console.log('Success')},
      error: function() {console.log('Failed')}
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)} onClick={this.forceUpdateHandler}/>
      <Table top={this.state.topRepos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));