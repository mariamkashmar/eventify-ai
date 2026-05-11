import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CreateEventPage from './Pages/CreateEventPage'
import AllEventsPage from './Pages/AllEventsPage'
import Signing from './Pages/SigningPage'
import SigningPage from './Pages/SigningPage'
import MyeventsPage from './Pages/MyeventsPage'
import EventDetailsPage from './Pages/EventDetailsPage'
import MyTicketsPage from './Pages/MyTicketsPage'
import HelpCenterPage from './Pages/HelpCenterPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} /> 
        <Route path='/create-event' element={<CreateEventPage/>} />
        <Route path='/events' element={<AllEventsPage />} />
        <Route path='/signing' element={<SigningPage/>} />
        <Route path='/my-events' element={<MyeventsPage />} />
        <Route path='/event/:slug' element={<EventDetailsPage />} />
        <Route path='/my-tickets' element={<MyTicketsPage />} />
        <Route path='/help-center' element={<HelpCenterPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
