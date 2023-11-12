import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import {
  useChangeVoteMutation,
  useSearchVoterMutation,
} from "../../../slices/userApiSlice";
import { toast } from "react-toastify";

const HomeScreen = () => {
  const [voterNumber, setVoterNumber] = useState("");
  const [voterData, setVoterData] = useState();
  const [updatedDate, setUpdatedDate] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  const [searchVoter, { isLoading }] = useSearchVoterMutation();
  const [changeVote] = useChangeVoteMutation();

  const formatTime = (date) => {
    let currentHour = date.getHours();
    let currentMinute = date.getMinutes();
    if (currentHour == 0) {
      currentHour = 24;
    }
    return currentHour + ":" + currentMinute;
  };

  const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return day + "/" + month + "/" + year;
  };

  const handleSearch = async (e) => {
    // e.preventDefault()
    try {
      if (voterNumber.length === 9) {
        const res = await searchVoter({ voterNumber }).unwrap();
        // console.log(res);

        let date = new Date(res.updatedAt);
        let timeFormat = formatTime(date);
        let dateFormat = formatDate(date);

        setUpdatedDate(dateFormat + " " + timeFormat);
        setVoterData(res);
      }
    } catch (err) {
      toast(err?.data?.message || err.error);
    }
  };

  const handleChangeVote = async (e) => {
    e.preventDefault();
    try {
      const res = await changeVote({ voterNumber, userInfo }).unwrap();
      // console.log(res.votedBy[0]);
      let date = new Date(res.updatedAt);
      let timeFormat = formatTime(date);
      let dateFormat = formatDate(date);

      setUpdatedDate(dateFormat + " " + timeFormat);
      setVoterData({ ...res });
    } catch (err) {
      toast(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="justify-content-md-center mt-5">
      <div
        style={{
          fontSize: 20,
          fontFamily: "sans-serif",
          margin: 10,
        }}
      >
        Search for voter by (Serial number)
      </div>
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
            <Button
              onClick={handleSearch}
              className="rounded-pill"
              variant="outline-primary"
            >
              Search
            </Button>
          </Form>
        </Col>
      </Row>

      {voterData ? (
        <Container className="mt-4 text-center">
          <Form className="card p-4">
            <Form.Label>Name: {voterData.name}</Form.Label>
            <Form.Label>ID: {voterData.voterId}</Form.Label>
            <Form.Label>Box: {voterData.box}</Form.Label>
            {voterData.voted ? (
              <Form.Label style={{ color: "green" }}>Voted: True</Form.Label>
            ) : (
              <Form.Label style={{ color: "red" }}>Voted: False</Form.Label>
            )}
            {updatedDate && voterData.voted ? (
              <Form.Label>Voted at: {updatedDate}</Form.Label>
            ) : (
              <></>
            )}
            {voterData.voted && voterData.votedBy.length > 0 ? (
              <Card className="text-center">
                <Form.Label style={{ fontWeight: "bold" }}>Voted By</Form.Label>
                <Form.Label>Name: {voterData.votedBy[0].name}</Form.Label>
                <Form.Label>Email: {voterData.votedBy[0].email}</Form.Label>
              </Card>
            ) : (
              <></>
            )}
            <div className="text-center pt-2">
              {voterData.voted ? (
                <Button
                  onClick={handleChangeVote}
                  className="rounded-pill btn btn-danger"
                  // variant="outline-primary"
                >
                  UnVote
                </Button>
              ) : (
                <Button
                  onClick={handleChangeVote}
                  className="rounded-pill btn btn-success"
                  // variant="outline-primary"
                >
                  Vote
                </Button>
              )}
            </div>
          </Form>
        </Container>
      ) : null}
    </Container>
  );
};

export default HomeScreen;
