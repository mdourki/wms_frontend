import React , {useState , useEffect } from 'react'
import DossiersReferentielNavbar from '../DossiersReferentielNavbar';
import '../../../../App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useParams } from "react-router-dom";

export default function EditFamille() {

  let { famille } = useParams();

  var familleID = '';

  const buttonStyle = {  marginTop: "10px" }
  const [familleName,setFamilleName] = useState(famille)

  const [successAlert, setSuccessAlert] = useState(false);
  const [successAlertContent, setSuccessAlertContent] = useState('');

  const [errorAlert, setErrorAlert] = useState(false);
  const [errorAlertContent, setErrorAlertContent] = useState('');

  axios.get(`http://localhost:8080/familles/getID/${famille}`)
  .then(function (response) {
      familleID = response.data
  })

  const handleClick=(e)=>{
    e.preventDefault()
    axios.put('http://localhost:8080/familles/update/'+familleID+'/'+familleName , {
    })
    .then(res => {
        console.log(res);
        console.log(res.data);
        if(res.data == "Famille modifiée")
        {
            setSuccessAlertContent(res.data);
            setSuccessAlert(true);
            setErrorAlert(false);
        }
        else if(res.data == "Famille non modifiée")
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
      <h1>Modifier une famille</h1>
      <React.Fragment>
          {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
          {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }   
          <Grid container className='content'>
              <Grid item xs={6} sm={6}>
                  <TextField
                  required
                  id="familleName"
                  name="familleName"
                  label="Nom de la famille"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={familleName}
                  onChange={(e)=>setFamilleName(e.target.value)}/>
              </Grid>
              <Grid item xs={12} style={buttonStyle}>
                  <Button variant="contained" onClick={handleClick}>Enregistrer</Button>
              </Grid>
          </Grid>
      </React.Fragment>
    </div>
  )
}
