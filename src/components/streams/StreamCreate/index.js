import React, { useEffect, useState } from 'react';
import { Form, Button, InputGroup } from "react-bootstrap";

//Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as stream_actions from "../../../actions/stream";
import * as country_actions from '../../../actions/countries';


export const StreamCreate = ({
  countries,
  fetchCountries,
  add_stream,
  set_temp_stream }) => {

  const rulesName = [{ required: true, message: 'Informe o nome do Streammer!' }];
  const rulesDescription = [{ required: true, message: 'Informe descrição do streammer' }];
  const rulesCountry = [{ required: true, message: 'Informe país do streammer' }];

  const [validated, setValidated] = useState(false);
  
  const [invalidName, setInvalidName] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSubmit = event => {
    const form = event.currentTarget;
    console.log("form", event);

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    //setValidated(true);
  };

  const handleSelectedCountry = value => {
    console.log(value);
  }

  const handleReset = () => {
  };

  const salvarRascunho = values => {
    set_temp_stream(values)
  }

  const validateChangeValue = (value) => {
    console.log("TESTE", value)
    return true;
  }

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="login-form">
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Stream name"
            required
            invalidName={(event) => { validateChangeValue(event) } }
            onChange={(event) => { validateChangeValue(event.target) }} />
            
          <Form.Control.Feedback type="invalid">Campo obrigatório.</Form.Control.Feedback>
          <Form.Control.Feedback invalidName >Nome inválido.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Descrição</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control as="select" >\
          {
              countries && countries.map((country, index) => (
                <option key={index} value={country.id}>
                  {country.name}
                </option>
              ))
            }
          </Form.Control>
        </Form.Group>
        <Button type="submit" className="primary">Concluir cadastro </Button>
      </Form >

    </div >
  );
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ ...stream_actions, ...country_actions }, dispatch)

const mapStateToProps = ({ stream, locations, data }) => ({
  stream: stream,
  countries: locations.countries,
  languages: data.languages
});

export default connect(mapStateToProps, mapDispatchToProps)(StreamCreate);


