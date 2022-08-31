import React , {useState} from 'react'
import DossiersReferentielNavbar from '../DossiersReferentielNavbar';
import '../../../../App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function NewDepot() {

    const buttonStyle = {  marginTop: "10px" }
    const [libelleDepot,setLibelleDepot] = useState('')
    const [adrssDepot,setAdrssDepot] = useState('')

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const handleClick=(e)=>{
        e.preventDefault()
        console.log(libelleDepot)
        axios.post('http://localhost:8080/depots/save/'+libelleDepot+'/'+adrssDepot , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data == "Dépôt ajouté")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data == "Dépôt existe déjà")
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
        <h1>Ajouter un dépôt</h1>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }

        <React.Fragment>
            <Grid container className='content'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="libelleDepot"
                    name="libelleDepot"
                    label="Libelle du dépôt"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={libelleDepot}
                    onChange={(e)=>setLibelleDepot(e.target.value)}/>

                    <TextField
                    required
                    id="adrssDepot"
                    name="adrssDepot"
                    label="Adresse du dépôt"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={adrssDepot}
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
