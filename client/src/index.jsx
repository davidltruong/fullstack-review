import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
// import Table from './components/Table.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      topRepos: []
    }
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/',
      contentType: 'application/json',
      success: (obj) => {
        console.log('test', obj)
        this.setState({repos: obj.repos})
        console.log('test', this.state.topRepos.length)
      }
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: 'POST',
      url: '/repos',
      data: JSON.stringify({data: term}),
      dataType: 'JSON',
      contentType: 'application/json',
      success: function() {console.log('Success')},
      error: function() {console.log('Failed')}
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));