import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, About, SignIn, SignUp, Dashboard, Articles } from './pages'
import { Footer, Header, RoutePrivate } from './components'


function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/sign-in' element={<SignIn />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route element={<RoutePrivate />}>
            <Route path='/dashboard' element={<Dashboard />}></Route>
          </Route>
          <Route path='/articles' element={<Articles />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
