import React from 'react';

const Table = (props) => (
  <table>
    <tr>
      <td>id</td>
      <td>name</td>
      <td>owner</td>
      <td>stargazers_count</td>
    </tr>
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
  </table>
)

export default Table;