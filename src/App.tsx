import{BrowserRouter,Route,Routes} from 'react-router-dom'
import HomePage from './page/home-page'


function App() {
  

  return (
    <>
      <h1 className="">React 19</h1>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
