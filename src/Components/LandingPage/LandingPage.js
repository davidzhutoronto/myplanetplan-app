/**
 * Date Create: 7-Dec-2022
 * Purpose of this component: Landing page of the app
 */

import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Login from '../Shared/Auth/Login';

import landingPage1 from './landingPage3.jpeg';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div>
      <div className="redirect-container">
        <img src={landingPage1} alt="landing page picture" />

        <div className="redirect-btn-in-picture">
          <Login />
        </div>

        <p className="author">Photo by Pixabay</p>
      </div>

      <Container>
        <Col className="landing-page-title mt-3">
          <h1 className="welcome-title">Welcome to MyPlanetPlan</h1>
        </Col>
        <Col>
          <p>
            MyPlanetPlan is a sustainable bucket list web app that allows you to create and track
            your goals for living a more eco-friendly lifestyle. Whether you want to reduce your
            carbon footprint, support local businesses, or conserve natural resources, MyPlanetPlan
            can help you achieve your goals and make a positive impact on the planet.
          </p>
        </Col>
        <Col className="mt-5">
          <h2>What our users are saying:</h2>
        </Col>
        <Col>
          <p>
            &quot;I love using MyPlanetPlan to stay motivated and accountable in my efforts to live
            sustainably. It&#39;s been a game-changer for me.&quot;
          </p>
        </Col>
        <Col className="mt-5">
          <h2>Key Features:</h2>
        </Col>
        <Col>
          <ul>
            <li>Create and track your sustainable goals</li>
            <li>Discover eco-friendly tips and resources</li>
            <li>Connect with like-minded users</li>
          </ul>
        </Col>
      </Container>
      <Container className="copy-right mt-4">Copyright MyPlanetPlan 2022</Container>
    </div>
  );
};

export default LandingPage;
