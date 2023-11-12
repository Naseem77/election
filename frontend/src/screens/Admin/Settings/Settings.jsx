import React from 'react'
import { Container, Row, Tabs, Tab} from 'react-bootstrap'
import './SettingStyle.css'
import Users from './Users'
import RegisterScreen from '../../RegisterScreen.jsx'


const Settings = () => {

  return (
    <Container className='py-4 container'>
      <Row className='justify-content-center'>
        <div>
        <Tabs justify variant='pills' defaultActiveKey='tab-1' className='mb-1 p-1'>
          <Tab eventKey="tab-1" title="Users">
          <Users/>
          </Tab>
          <Tab eventKey="tab-2" title="Create User">
            <RegisterScreen/>
          </Tab>
        </Tabs>
        </div>
      </Row>
    </Container>
  )
}

export default Settings