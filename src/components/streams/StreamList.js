import React, { useEffect, useState } from 'react';

//React-Bootstrap
import { Table, Spinner, Row, Col, Button, ButtonGroup } from 'react-bootstrap';

//Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//Actions
import * as streams_actions from '../../actions/stream';
import * as message_actions from '../../actions/message';

import ConfirmationDialog from '../layout/confirmation-dialog';

import * as variant_enum from '../../enuns/variants-enum';

const StreamList = ({
    streams,
    loading,
    message,
    fetch_streams,
    show_message,
    delete_stream }) => {

    useEffect(() => { fetch_streams(); }, [])

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStream, setSelectedStream] = useState('');

    /**
     * Método acionado ao se clicar no botão para deletar stream
     * 
     * @param {*} idStream 
     */
    const onClickDeleteStream = (stream) => {
        setSelectedStream(stream.id);
        setShowDeleteModal(true);
    }

    /**
     * Método acionado quando o usuário cancela no modal a ação
     * de deletar a stream.
     */
    const onConfirmDelete = () => {
        delete_stream(selectedStream, onDeleteSuccess, onDeleteError);
    }

    /**
     * Método acionado quando o usuário cancela no modal a ação
     * de deletar a stream.
     */
    const onCalcelDelete = () => {
        setShowDeleteModal(false);
    }

    /**
     * Método acionado no fluxo de erro ao deletar stream.
     * 
     */
    const onDeleteError = () => {
        show_message(
            'Não foi possível realizar a exclusão. Tente novamente.',
            'Problemas ao excluir',
            variant_enum.DANGER
        );
    }

    /**
     * Método acionado no fluxo de erro ao deletar stream.
     * 
     */
    const onDeleteSuccess = () => {
        show_message(
            'Deletado com sucesso',
            'Sucesso',
            variant_enum.SUCCESS
        );
    }

    /**
     * Método que realiza a listagem de streams na tabela, 
     * retornand o jsx referente a tabela contendo todas
     * as streams.
     * 
     */
    const listStreams = () => {
        return (
            streams.map((stream, index) => {
                return (
                    < tr key={index} >
                        <td>{stream.name}</td>
                        <td>{stream.description}</td>
                        <td>{stream.countryName}</td>
                        <td>{stream.languageName}</td>
                        <td class='text-center'>
                            <ButtonGroup>
                                <Button variant="primary">Editar</Button>
                                <Button variant="danger"
                                    onClick={(event) => { onClickDeleteStream(stream) }}>Excluir</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                )
            })
        );
    }

    return (
        <div>
            {loading ? (
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
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>País</th>
                                    <th>Língua</th>
                                    <th>Ações</th>
                                </tr>
                            </thead >
                            <tbody> {listStreams()} </tbody>
                        </Table>
                        <ConfirmationDialog
                            title='Confirmar exclusão de Streammer'
                            message='Deseja realmente excluir a Streammer?'
                            functionYes={onConfirmDelete}
                            functionNo={onCalcelDelete}
                            showDeleteModal={showDeleteModal} />
                    </div>
                )}
        </div>
    );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...streams_actions, ...message_actions }, dispatch)

const mapStateToProps = ({ stream, message }) => ({
    streams: stream.streams,
    loading: stream.loading,
    message: message
})

export default connect(mapStateToProps, mapDispatchToProps)(StreamList)