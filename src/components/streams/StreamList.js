import React, { useEffect } from 'react';


import { Table, Spinner, Row, Col } from 'react-bootstrap';

//Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


//Actions
import * as streams_actions from '../../actions/stream';

const StreamList = ({ 
    streams,
    fetch_streams,
    loading }) => {

    useEffect(() => { fetch_streams(); }, [])

    const listStreams = () => {
        return (
            streams.map((stream, index) => {
                return (
                    < tr key={index} >
                        <td>{stream.name}</td>
                        <td>{stream.description}</td>
                        <td>{stream.countryName}</td>
                        <td>{stream.languageName}</td>
                    </tr>
                )
            })
        );
    }

    return (
        <div>
        { console.log('Change loading', loading) }
        { console.log('Streams', streams) }
            { loading ? (
                <div class="col-xs-1 text-center">
                    <Row>
                        <Col>
                            <Spinner align="center" 
                                     animation="border" variant="primary" />
                        </Col>
                    </Row>
                </div>
            ) : ( 
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Country</th>    
                                <th>Language</th>
                            </tr>
                        </thead >
                        <tbody> { listStreams() } </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...streams_actions }, dispatch)

const mapStateToProps = ({ stream }) => ({
    streams: stream.streams,
    loading: stream.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(StreamList)