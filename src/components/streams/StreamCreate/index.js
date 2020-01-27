//React
import React, { useEffect, useState } from 'react';

//React bootstrap
import { Form, Button, InputGroup } from 'react-bootstrap';

//Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//Actions
import * as stream_actions from "../../../actions/stream";
import * as string_utils from '../../../utils/string-utils';
import * as country_actions from '../../../actions/countries';


/**
 * Componente relacionado a criação de Stream.
 * 
 * @param {*} param0 
 */
export const StreamCreate = ({
  countries,
  fetchCountries,
  add_stream,
  userId }) => {

  const [validated, setValidated] = useState(false);

  /* Hook para controle dos valores do form */
  const [formValues, setFormValues] = useState({
    nameForm: { value: '', valid: false },
    descriptionForm: { value: '', valid: false },
    countryForm: { value: '', valid: false }
  });

  /* Hook para disparar action de buscar lista de países */
  useEffect(() => { fetchCountries(); }, []);

  /**
   * Método acionado para submissão do formulário.
   * 
   * @param {*} event 
   */
  const handleSubmit = event => {
    setValidated(true);
    const form = event.currentTarget;

    if (form.checkValidity()) {
      event.preventDefault();
      
      const idPais = parseInt(formValues.countryForm.value);

      let stream = {
        name: formValues.nameForm.value,
        description: formValues.descriptionForm.value,
        idCountry: idPais,
        idUser: userId
      }
      
      add_stream(stream);
    }
    event.stopPropagation();
  };

  /**
   * Método para realizar a atribuição dos valores inseridos 
   * 
   * @param {*} event 
   */
  const handleChangeValue = event => {
    const name = event.target.name;
    const value = event.target.value;

    console.log(formValues);
    handleValidation(name, value);
    setFormValues({ ...formValues, [name]: { ...formValues[name], value: value } });
  }

  /**
   * Método responsável por direcionar validação de dados
   * 
   */
  const handleValidation = (name, value) => {

    if (name === 'nameForm') {
      validateName(value);
    }
  }

  /**
   * Método para validar o nome
   * 
   * @param {*} value 
   */
  const validateName = (value) => {
  const validName = string_utils.verifySpecialCharacteres(value);
    setFormValues({ ...formValues, nameForm: { ...formValues.ÎnameForm, valid: validName } });
  }

  /**
   * Método para validar formulário
   * 
   */
  const validateForm = () => {
    return formValues.nameForm.valid && formValues.descriptionForm.valid && formValues.countryForm.valid;
  }

  return (
    <div>
      <Form noValidate
        validated={validated}
        onSubmit={handleSubmit} className="login-form">

        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='nameForm'
            placeholder='Stream name'
            required
            isInvalid={formValues.nameForm.invalid}
            value={formValues.nameForm.value}
            onChange={(event) => { handleChangeValue(event) }} />

          <Form.Control.Feedback type='invalid'>Forneça um nome válido.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          controlId="description">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            name='descriptionForm'
            rows="3"
            required
            value={formValues.descriptionForm.value}
            onChange={(event) => { handleChangeValue(event) }} />

          <Form.Control.Feedback type="invalid">Forneça uma descrição válida.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          controlId="country">
          <Form.Label>País</Form.Label>
          <Form.Control 
            name='countryForm'
            as="select"
            value={formValues.countryForm.value}
            required
            onChange={(event) => { handleChangeValue(event) }}>
            {countries && countries.map((country, index) => (
              <option
                key={index}
                value={country.id}> {country.name} </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">Forneça um país.</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="primary">Concluir cadastro </Button>
      </Form >

    </div >
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...stream_actions, ...country_actions }, dispatch)

//Mapeamento do state para props
const mapStateToProps = ({ stream, locations, data, authentication }) => ({
  stream: stream,
  countries: locations.countries,
  languages: data.languages,
  userId: authentication.id
});

export default connect(mapStateToProps, mapDispatchToProps)(StreamCreate);


