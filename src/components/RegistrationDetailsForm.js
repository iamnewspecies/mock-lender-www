import React, { useState } from "react";
import { isEmpty } from "lodash";

import { Grid, TextField, Button, Box } from "@material-ui/core";

const initForm = {
  name: {
    label: "Company Name",
    name: "name",
    value: "qwertyu",
    error: false,
    validation: /^([a-zA-Z0-9]{5,})$/,
    helperText: "Company Name must be 5 letters or more"
  },
  phone: {
    label: "Phone",
    name: "phone",
    value: "1234567890",
    error: false,
    validation: /^([0-9]{10})$/,
    helperText: "Phone must be 10 letters"
  },
  email: {
    label: "Email",
    name: "email",
    value: "qwertyu",
    error: false,
    validation: /^([a-zA-Z0-9]{5,})$/,
    helperText: "Email not valid"
  },
  baseUrl: {
    label: "LSP Endpoint",
    name: "baseUrl",
    value: "qwertyui",
    error: false,
    validation: /^([a-zA-Z0-9]{5,})$/,
    helperText: "Endpoint not valid"
  },
  description: {
    label: "Description",
    name: "description",
    value: "qwertyuiop",
    error: false,
    validation: /^(.{8,})$/,
    helperText: "Password must be 8 letters or more",
    type: "password"
  }
};

const formOrder = ["name", "phone", "email", "baseUrl", "description"];

const makeValuesFromForm = (form) => {
  const values = {};
  Object.keys(form).forEach(v => values[v] = form[v].value);
  return values;
};

const RegistrationDetailsForm = (props) => {

  const { nextCallback } = props;

  //
  // ───────────────────────────────────────────────────── FORM UTILITIES ─────
  //

  const [form, setForm] = useState(initForm);

  const formChange = ({ target: { name, value } }) => {
    const field = { ...form[name] };
    field.value = value
    const newForm = {
      ...form,
      [name]: field
    };
    setForm(newForm);
  };

  const formBlur = ({ target: { name, value } }) => {
    const field = { ...form[name] };
    field.error = !field.validation.test(value);
    const newForm = {
      ...form,
      [name]: field
    };
    setForm(newForm);
  };

  const validateForm = () => {
    const newForm = { ...form };
    Object.values(newForm).forEach(e => {
      e.error = !e.validation.test(e.value);
    });
    setForm(newForm);
    return Object.values(form).every(v => v.error === false);
  };

  //
  // ──────────────────────────────────────────────────────────────────────────
  //

  const onClickLogin = () => {
    if (validateForm()) {

      const formDetails = makeValuesFromForm(form);

      // console.log("FORM ---->", formDetails);

      fetch("https://integ-expresscheckout-api.juspay.in/credit/lender/v3/registration/registrationRequest", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          DNT: "1",
        },
        body: JSON.stringify(formDetails),
      })
        .then((res) => res.body)
        .then((res) => {
          // On Success
          console.log("Successful verification response!", res);
          nextCallback();
        })
        .catch((err) => {
          console.log("error in verification response!");
          // On Error
        });
    }
  };

  const loginBtnDisabled = !Object.values(form).every(e => !isEmpty(e.value) || e.error === false);

  return <Box p={4}>
    {formOrder.map((e, i) => (
      <span key={i}>
        <TextField
          className="w-100"
          variant="outlined"
          onChange={formChange}
          onBlur={formBlur}
          label={form[e].label}
          name={form[e].name}
          value={form[e].value}
          error={form[e].error}
          helperText={form[e].error ? form[e].helperText : " "}
          type={form[e].type}
        />
        <br />
        <br />
      </span>
    ))}
    <br />
    <br />
    <br />
    <Grid
      container
      direction="row-reverse"
    >
      <Button
        disabled={loginBtnDisabled}
        variant="contained"
        size="large"
        color="primary"
        onClick={onClickLogin}
      >
        Submit
      </Button>
    </Grid>
  </Box>;
};

export default RegistrationDetailsForm;