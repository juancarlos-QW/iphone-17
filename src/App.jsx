import NavBar from "./components/NavBar"
import Hero from "./components/Hero"
import Intro from "./components/Intro"
import Design from "./components/Design"
import Performance from "./components/Performance"
import Camera from "./components/Camera"
import Colors from "./components/Colors"
import Footer from "./components/Footer"
import useScrollReveal from "./hooks/useScrollReveal"

function App() {
  useScrollReveal()

  return (
    <div>
      <NavBar />
      <Hero />
      <Intro />
      <Design />
      <Performance />
      <Camera />
      <Colors />
      <Footer />
    </div>
  )
}

export default App
