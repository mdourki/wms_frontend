import React , {useState , useEffect } from 'react'
import DossiersReferentielNavbar from '../DossiersReferentielNavbar';
import '../../../../App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useParams } from "react-router-dom";

export default function EditDepot() {

  let { libelleDepot , adrssDepot } = useParams();

  var depotID = '';

  const buttonStyle = {  marginTop: "10px" }
  const [depotLibelle,setLibelleDepot] = useState(libelleDepot)
  const [depotAdrss,setAdrssDepot] = useState(adrssDepot)

  const [successAlert, setSuccessAlert] = useState(false);
  const [successAlertContent, setSuccessAlertContent] = useState('');

  const [errorAlert, setErrorAlert] = useState(false);
  const [errorAlertContent, setErrorAlertContent] = useState('');

  axios.get(`http://localhost:8080/depots/getID/${libelleDepot}`)
  .then(function (response) {
    depotID = response.data
  })

  const handleClick=(e)=>{
      e.preventDefault()
      axios.put('http://localhost:8080/depots/update/'+depotID+'/'+depotLibelle+'/'+depotAdrss , {
      })
      .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data == "Dépôt modifié")
          {
              setSuccessAlertContent(res.data);
              setSuccessAlert(true);
              setErrorAlert(false);
          }
          else if(res.data == "Dépôt non modifié")
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
      <h1>Modifier un dépôt</h1>
      {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
      {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }

      <React.Fragment>
          <Grid container className='content'>
              <Grid item xs={6} sm={6}>
                  <TextField
                    required
                    id="depotLibelle"
                    name="depotLibelle"
                    label="Libelle du dépôt"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={depotLibelle}
                    onChange={(e)=>setLibelleDepot(e.target.value)}/>

                  <TextField
                    required
                    id="depotAdrss"
                    name="depotAdrss"
                    label="Adresse du dépôt"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={depotAdrss}
                    onChange={(e)=>setAdrssDepot(e.target.value)}/>
              </Grid>
              <Grid item xs={12} style={buttonStyle}>
                  <Button variant="contained" onClick={handleClick}>Enregistrer</Button>
              </Grid>
        </Grid>
      </React.Fragment>
    </div>
  )
}
