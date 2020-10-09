import React from "react";
import { Button, TextField } from "@material-ui/core";
import { ButtonsContainer, FormContainer } from "./formComponents";

// import Section from '../components/Section'

export default function OtpView(props) {
  const { setFlow } = props;
  return (
    <FormContainer>
      <h5>Please enter OTP sent to your email </h5>
      <br></br>
      <TextField fullWidth label="OTP" type="text" id="OTP" />

      <ButtonsContainer>
        <Button onClick={() => setFlow("POST_REGISTER")} color="primary">
          Submit
        </Button>
      </ButtonsContainer>
    </FormContainer>
  );
}
