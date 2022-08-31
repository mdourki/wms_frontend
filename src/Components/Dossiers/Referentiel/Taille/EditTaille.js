import React , {useState , useEffect } from 'react'
import DossiersReferentielNavbar from '../DossiersReferentielNavbar';
import '../../../../App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useParams } from "react-router-dom";

export default function EditTaille() {

  let { codeTaille , nomTaille } = useParams();

  var tailleID = '';

  const buttonStyle = {  marginTop: "10px" }
  const [tailleName,setNomTaille] = useState(nomTaille)
  const [tailleCode,setCodeTaille] = useState(codeTaille)

  const [successAlert, setSuccessAlert] = useState(false);
  const [successAlertContent, setSuccessAlertContent] = useState('');

  const [errorAlert, setErrorAlert] = useState(false);
  const [errorAlertContent, setErrorAlertContent] = useState('');

  axios.get(`http://localhost:8080/tailles/getID/${codeTaille}`)
  .then(function (response) {
    tailleID = response.data
  })

  const handleClick=(e)=>{
      e.preventDefault()
      axios.put('http://localhost:8080/tailles/update/'+tailleID+'/'+tailleCode+'/'+tailleName , {
      })
      .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data == "Taille modifiée")
          {
              setSuccessAlertContent(res.data);
              setSuccessAlert(true);
              setErrorAlert(false);
          }
          else if(res.data == "Taille non modifiée")
          {
              setErrorAlertContent(res.data);
              setErrorAlert(true);
              setSuccessAlert(false);
          }
      })
  }

  return (
    <div>
      <DossiersReferentielNavbar/>
      <h1>Modifier une taille</h1>
      {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
      {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }

      <React.Fragment>
          <Grid container className='content'>
              <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    id="tailleCode"
                    name="tailleCode"
                    label="Code de la taille"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={tailleCode}
                    onChange={(e)=>setCodeTaille(e.target.value)}/>

                  <TextField
                    required
                    id="tailleName"
                    name="tailleName"
                    label="Nom de la taille"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={tailleName}
                    onChange={(e)=>setNomTaille(e.target.value)}/>
              </Grid>
              <Grid item xs={12} style={buttonStyle}>
                  <Button variant="contained" onClick={handleClick}>Enregistrer</Button>
              </Grid>
        </Grid>
      </React.Fragment>
    </div>
  )
}
