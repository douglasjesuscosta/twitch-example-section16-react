import React from 'react';

//Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//React bootstrap
import { Collapse, Alert } from 'react-bootstrap';


import * as message_actions from '../../../actions/message';


const Message = ({ message, close_message }) => {

    const closeMessage = () => {
        close_message()
    }

    return (
        <div>
            <Collapse in={ message.showMessage}>
                <Alert variant={message.type} onClose={() => closeMessage() } dismissible>
                    <Alert.Heading>{message.title}</Alert.Heading>
                    <p>
                        {message.message}
                    </p>
                </Alert>
            </Collapse>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...message_actions }, dispatch);

const mapStateToProps = ({ message }) => ({
    message: message
})

export default connect(mapStateToProps, mapDispatchToProps)(Message);