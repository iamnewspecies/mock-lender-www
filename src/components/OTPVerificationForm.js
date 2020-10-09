import React, { useState } from "react";
import { isEmpty } from "lodash";

import { makeStyles } from '@material-ui/core/styles';

import { Grid, TextField, Button, Box } from "@material-ui/core";

const initForm = {
  otp: {
    label: "OTP",
    name: "otp",
    value: "",
    error: false,
    validation: /^([0-9]{6})$/,
    helperText: "OTP not valid"
  },
};

const formOrder = ["otp"];

const makeValuesFromForm = (form) => {
  const values = {};
  Object.keys(form).forEach(v => values[v] = form[v].value);
  return values;
};

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%"
  }
}));

const OTPVerificationForm = (props) => {
  const classes = useStyles();
  const { nextCallback, store, setStore } = props;

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
    return Object.values(newForm).every(v => v.error === false);
  };

  //
  // ──────────────────────────────────────────────────────────────────────────
  //

  const onClickLogin = () => {
    if (validateForm()) {
      const formDetails = makeValuesFromForm(form);
      formDetails.sessionToken = store.sessionToken;
      fetch("https://integ-expresscheckout-api.juspay.in/credit/lender/v3/registration/verifyRegistrationRequest", {
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
          setStore(res.body);
          nextCallback();
        })
        .catch((err) => {
          console.log("error in verification response!");
          setStore({
            apiKey: "qwertyuiop"
          });
          nextCallback();
          // On Error
        });
    }
  };

  const loginBtnDisabled = !Object.values(form).every(e => !isEmpty(e.value) || e.error === false);

  return <Box p={4}>
    <br />
    <br />
    {formOrder.map((e, i) => (
      <span key={i}>
        <TextField
          className={classes.textField}
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

export default OTPVerificationForm;