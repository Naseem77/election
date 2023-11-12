import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useGetVoteCountByBoxMutation } from '../../../slices/userApiSlice'
import { GiVote } from 'react-icons/gi'
import { CiNoWaitingSign } from 'react-icons/ci'
import { toast } from 'react-toastify'
import PieCharts from '../../../components/PieCharts';

function FindByBox() {
  const [value, setValue] = useState('')
  const [voteCount, setVoteCount] = useState()
  const [getVoteCountByBox, { isLoading }] = useGetVoteCountByBoxMutation();

  

  const handleFind = async () => {
    try {
      const res = await getVoteCountByBox({boxNumber: value}).unwrap();
      setVoteCount(res)
      console.log(res);
    } catch (err){
      toast(err?.data?.message || err.error);
    }
  }

  useEffect(() => {
    // console.log(voteCount?.notVoted);
  },[setVoteCount])

  return (
    <>
    <Container className=' mt-5'>
    <div style={{
      fontSize: 20,
      fontFamily: 'sans-serif',
      margin: 10
    }}>Search By Box Number</div>
    <Row>
      <Col sm={10}>
        <Form className="d-flex">
          <Form.Control
            type="number"
            placeholder="Select Box Number"
            className="me-2 rounded-pill"
            aria-label="Search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={handleFind} className="rounded-pill" variant="outline-primary">
            Find
          </Button>
        </Form>
      </Col>
    </Row>
    {voteCount ? 
      (
        <main className='main-container'>
        <div className='main-title'>
            <h3 id='home-title'>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card firstcard'>
                <div className='card-inner'>
                    <h3 className='text1'>VOTED</h3>
                    <GiVote className='card_icon'/>
                  </div>
                <h1 className='text2'>{voteCount?.voted}</h1>
            </div>
            <div className='card secondcard'>
                <div className='card-inner'>
                    <h3 className='text1'>NOT VOTED</h3>
                    <CiNoWaitingSign className='card_icon'/>
                </div>
                <h1 className='text2'>{voteCount?.notvoted}</h1>
            </div>
          </div>
  
        </main>
      )  : null
    }
  </Container>
  {voteCount ?
    <div className='PieCharts'>
      <PieCharts data={voteCount}/> 
    </div>
  : null}
  </>
  );
}

export default FindByBox;