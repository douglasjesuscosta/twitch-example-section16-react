import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import StreamDelete from './streams/StreamDelete';
import StreamCreate from './streams/StreamCreate/';
import HeaderApplication from './HeaderApplication';

import './App.css'


const App = () => {
    return (
        <div>
            <Container fluid="true">
                <Row>
                    <Col>
                        <HeaderApplication />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ background: '#fff', padding: 24, minHeight: 100 }}>
                            <BrowserRouter>
                                <Route path="/" exact component={StreamList}></Route>
                                <Route path="/streams/new" exact component={StreamCreate}></Route>
                                <Route path="/streams/edit" exact component={StreamEdit}></Route>
                                <Route path="/streams/delete" exact component={StreamDelete}></Route>
                                <Route path="/streams/show" exact component={StreamShow}></Route>
                            </BrowserRouter>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;