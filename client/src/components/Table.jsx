import React from 'react';

const Table = (props) => (
  <table id='table'>
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>owner</th>
        <th>stargazers_count</th>
      </tr>
    </thead>
    <tbody>
    {props.top.map((repo) => {
      return (
        <tr>
          <td>{repo.id}</td>
          <td>
            <a href={repo.git_url}>{repo.name}</a>
          </td>
          <td>{repo.owner}</td>
          <td>{repo.stargazers_count}</td>
        </tr>
      )
    })}
    </tbody>
  </table>
)

export default Table;