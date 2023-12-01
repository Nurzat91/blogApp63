import Toolbar from './components/Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import Add from './containers/Add/Add';
import About from './containers/About/About';
import Contacts from './containers/Contacts/Contacts';
import PostsPage from './containers/PostsPage/PostsPage';

function App() {

  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={(<Home/>)}/>
          <Route path="/posts" element={(<Home/>)}></Route>
          <Route path="/posts/:id" element={<PostsPage/>}/>
          <Route  path="/add" element={(<Add/>)}/>
          <Route  path="/posts/:id/edit" element={(<Add/>)}/>
          <Route path="/about" element={(<About/>)}/>
          <Route  path="/contacts" element={(<Contacts/>)}/>
          <Route path="*" element={(<h1>Not Found!</h1>)}/>
        </Routes>
      </main>
    </>
  )
}

export default App
