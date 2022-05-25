import React from "react";
import { Badge, Carousel, Col, Row } from "react-bootstrap";
import ShoeCards from "../Components/ShoeCards";

export default function Home() {
  return (
    <>
      <section className="section home_section container">
        <Carousel fade className="mt-3 mb-3">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <h1>
          Recents products <Badge className="fs-6 bg-warning">New</Badge>
        </h1>
        <Row className="mb-5" xs={12}>
          <Col xs="6" sm="6" lg="3" className="mb-3">
            <ShoeCards />
          </Col>
          <Col xs="6" sm="6" lg="3" className="mb-3">
            <ShoeCards />
          </Col>
          <Col xs="6" sm="6" lg="3" className="mb-3">
            <ShoeCards />
          </Col>
          <Col xs="6" sm="6" lg="3" className="mb-3">
            <ShoeCards />
          </Col>
        </Row>
      </section>
    </>
  );
}
