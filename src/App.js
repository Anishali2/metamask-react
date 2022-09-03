import React ,{ useState } from 'react';
import logo from './logo.svg';
import { ethers } from 'ethers';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import History from './Pages/History';
function App() {


  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('')
const btnhandler = async () => {
  
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner()
  // const 
  const tx = await signer.sendTransaction({
    to: address,
    value: ethers.utils.parseEther(balance)
});
  console.log(tx)
}
const [isLoading, setLoading] = useState(false);
const connectWallet = async () => {
  setLoading(true)
  await provider.send("eth_requestAccounts", []).then
 ( (res) => {
    setLoading(false)
    alert("Connected")
  }).catch( (err) => {
    setLoading(false)
    alert("Please connect to Metamask")
  } )
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  console.log(address)
  setLoading(false)

}


  const handleClick = () => setLoading(true);

  return (
      <>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link ><Link style={{textDecoration:"none"}}  to="/">Home</Link></Nav.Link>
            <Nav.Link ><Link style={{textDecoration:"none"}}  to="/history">History</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
     
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
      </>
  );
}

export default App;



