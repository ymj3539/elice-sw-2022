import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from 'styled-components';

function Header(props) {
  return (
    <header className={props.className}>
      <h1>
        <a
          href='/'
          onClick={(evt) => {
            evt.preventDefault();
            props.onSelect();
          }}
        >
          WWW
        </a>
      </h1>
    </header>
  );
}

const HeaderStyled = styled(Header)`
  border-bottom: 1px solid gray;
  color: red;
`;

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}
function Nav(props) {
  const liTags = props.data.map((e) => {
    return (
      <li key={e.id}>
        <a
          href={'/read/' + e.id}
          onClick={(evt) => {
            evt.preventDefault();
            props.onSelect(e.id);
          }}
        >
          {e.title}
        </a>
      </li>
    );
  });
  return (
    <nav>
      <ol>{liTags}</ol>
    </nav>
  );
}
function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  console.log(mode, id);
  const topics = [
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
  ];
  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title='Welcome' body='Hello, WEB!'></Article>;
  } else if (mode === 'READ') {
    const topic = topics.filter((e) => {
      if (e.id === id) {
        return true;
      } else {
        return false;
      }
    })[0];
    content = <Article title={topic.title} body={topic.body}></Article>;
  }
  return (
    <div>
      <HeaderStyled
        onSelect={() => {
          setMode('WELCOME');
        }}
      ></HeaderStyled>
      <Nav
        data={topics}
        onSelect={(id) => {
          setMode('READ');
          setId(id);
        }}
      ></Nav>
      {content}
      <ButtonGroup>
        <Button
          variant='outlined'
          onClick={() => {
            alert('create!');
          }}
        >
          Create
        </Button>
        <Button variant='outlined'>Update</Button>
      </ButtonGroup>
      <Button variant='outlined'>Delete</Button>
    </div>
  );
}

export default App;
