import { Route, Routes } from 'react-router-dom'
import Button from './components/Button'
import Layout from './components/Layout'
import Section from './components/Section'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Projects from './pages/Projects'

// The map of the site: each URL path shows one page inside the shared Layout.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="*"
          element={
            <Section title="Page not found">
              <Button to="/">Go home</Button>
            </Section>
          }
        />
      </Route>
    </Routes>
  )
}