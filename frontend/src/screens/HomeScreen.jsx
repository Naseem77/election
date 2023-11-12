import React, {useEffect, useState} from 'react'
import Hero from '../components/Hero'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useChangeVoteMutation, useSearchVoterMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify'


const HomeScreen = () => {
  const [voterNumber, setVoterNumber] = useState('');
  const [voterData, setVoterData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) =>  state.auth)
  const [searchVoter, { isLoading }] = useSearchVoterMutation();
  const [changeVote] = useChangeVoteMutation();

  useEffect(() => {
    if(userInfo) {
      if(userInfo.rights === "2"){
        navigate('/admin')
      } else {
        navigate('/')
      }
    }else{
      navigate('/login')
    }
},[navigate, userInfo])

  useEffect(() => {

  },[voterData, setVoterData.voted])

  const handleSearch = async(e) => {
    e.preventDefault()
    try {
      if(voterNumber.length === 9){
        const res = await searchVoter({ voterNumber }).unwrap();
        // console.log(res);
        setVoterData(res)
      }
    } catch (err){
        toast(err?.data?.message || err.error);
    }
  }

  const handleChangeVote = async(e) => {
    e.preventDefault()
    try {
      if(voterData.voted === false){
        const res = await changeVote({ voterNumber, userInfo }).unwrap();
        // console.log(res);
        setVoterData({...res})
      }
    } catch (err){
      toast(err?.data?.message || err.error);
    }
  }

  return (
    <Container className='justify-content-md-center mt-5'>
      <div style={{
        fontSize: 20,
        fontFamily: 'sans-serif',
        margin: 10
      }}>Search for voter by (Serial number)</div>
      <Row>
        <Col sm={10}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 rounded-pill"
              aria-label="Search"
              value={voterNumber}
              onChange={(e) => setVoterNumber(e.target.value)}
            />
            <Button onClick={handleSearch} className="rounded-pill" variant="outline-primary">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      
      {voterData ? (
        <Container className='mt-4'>
          <Form className='card p-4'>
            <Form.Label>Name: {voterData.name}</Form.Label>
            <Form.Label>ID: {voterData.voterId}</Form.Label>
            <Form.Label>Box: {voterData.box}</Form.Label>
            {voterData.voted ?
              <Form.Label style={{color: 'green'}}>Voted: True</Form.Label>
              :
              <Form.Label style={{color: 'red'}}>Voted: False</Form.Label>
            }
            <div className="text-center">
              {voterData.voted ? 
                <Button disabled onClick={handleChangeVote} className="rounded-pill" variant="outline-primary">
                  Vote
                </Button>
                : 
                <Button onClick={handleChangeVote} className="rounded-pill" variant="outline-primary">
                  Vote
                </Button>
              }
            </div>
          </Form>
        </Container>
      ): null}
    </Container>
  ); 
}

export default HomeScreen