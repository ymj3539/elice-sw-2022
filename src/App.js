import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href='/'
          onClick={(evt) => {
            console.log('evt', evt);
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
function Nav(props) {
  console.log('data', props.data);
  const list = props.data.map((e) => {
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
  // const list = [
  //   <li>
  //     <a href='/read/1'>html</a>
  //   </li>,
  //   <li>
  //     <a href='/read/2'>css</a>
  //   </li>,
  // ];
  return (
    <nav>
      <ol>{list}</ol>
    </nav>
  );
}

function Article(props) {
  console.log('props', props.title);
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}
function createHandler() {
  alert('creat!');
}
function App() {
  //최초의 한번만 WELCOME이고 그 다음부터는 바뀔 수 있다.
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
    console.log('topic ', topic);
    content = <Article title={topic.title} body={topic.body}></Article>;
  }
  return (
    <div>
      <Header
        onSelect={() => {
          setMode('WELCOME');
        }}
      ></Header>
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
        <Button variant='outlined'>Delete</Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
