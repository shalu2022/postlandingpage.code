import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Post from './components/Post'
import SinglePost from './components/SinglePost'

function App(props) {
  return (
    <BrowserRouter>
    {/* <Post /> */}
    <Routes>
    <Route path={'/'} element={ <Post itemsPerPage={5}/>} />
      <Route path={'/singlepost/:id'} element={<SinglePost />} />
    </Routes>
    </BrowserRouter>
      
    
  );
}

export default App;
