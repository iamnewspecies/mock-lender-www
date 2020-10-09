import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonsContainer, FormContainer } from "./formComponents";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
  },
  contentContainer: {
      maxWidth: "500px",
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  root: {
    "& > *": {
      margin: theme.spacing(2),
      //   width: "25ch",
    },
  },
}));

export default function RegisterView(props) {
  const classes = useStyles();
  const { setFlow } = props;
  const [formErrors, setFormErrors] = useState({
    Company_Name: false,
    Email: false,
    Phone: false,
    Lsp_Endpoint: false,
    Description: false,
  });

  const registrationValidation = () => {
    console.log("On click response!");
    const errors = { ...formErrors };
    if (document.querySelector("#Company_Name").value === null) {
      errors["Company_Name"] = true;
    } else {
      errors["Company_Name"] = false;
    }

    if (document.querySelector("#Email").value === null) {
      errors["Email"] = true;
    } else {
      errors["Email"] = false;
    }

    if (
      document.querySelector("#Phone").value.length !== 10 ||
      document.querySelector("#Phone").value === null
    ) {
      errors["Phone"] = true;
    } else {
      errors["Phone"] = false;
    }

    if (document.querySelector("#Lsp_Endpoint").value === null) {
      errors["Lsp_Endpoint"] = true;
    } else {
      errors["Lsp_Endpoint"] = false;
    }

    if (document.querySelector("#Description").value === null) {
      errors["Description"] = true;
    } else {
      errors["Description"] = false;
    }

    setFormErrors(errors);
    console.log("checked validations");

    if (!Object.values(errors).includes(true)) {
      console.log("True validations");

      let formDetails = {
        name: document.querySelector("#Company_Name").value,
        email: document.querySelector("#Email").value,
        phone: document.querySelector("#Phone").value,
        baseUrl: document.querySelector("#Lsp_Endpoint").value,
        description: document.querySelector("#Description").value,
      };

      fetch("https://integ-expresscheckout-api.juspay.in/credit/lender/v3/registration/registrationRequest", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: "http://localhost:8000/",
          DNT: "1",
        },
        body: JSON.stringify(formDetails),
      })
        .then((res) => res.body)
        .then((res) => res)
        .then((res) => {
          // On Success
          console.log("Successful verification response!");

          // navigate("/verifyRegistration", {
          //   state: { registerResponse: res }
          // )
          setFlow("OTP");
        })
        .catch((err) => {
          console.log("error in verification response!");
          // On Error
        });
    } else {
      console.log("False validations");
    }
  };

  return (
    <FormContainer>
      <h1 class={classes.header}>Register View</h1>
      <br></br>
      <form className={classes.root}>
        <div>
          <TextField
            fullWidth
            label="Company's Name"
            type="text"
            id="Company_Name"
          />
        </div>
        <div>
          <TextField fullWidth label="Phone" type="text" id="Phone" />
        </div>
        <div>
          <TextField
            fullWidth
            label="Email"
            type="email"
            id="Email"
            placeholder="name@example.com"
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Lsp Endpoint"
            type="text"
            id="Lsp_Endpoint"
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Description"
            type="long"
            id="Description"
          />
        </div>
      </form>

      <ButtonsContainer>
        <Button onClick={registrationValidation} color="primary">
          Submit
        </Button>
      </ButtonsContainer>
    </FormContainer>
  );
}
