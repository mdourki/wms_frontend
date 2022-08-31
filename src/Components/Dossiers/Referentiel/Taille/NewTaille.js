import React , {useState} from 'react'
import DossiersReferentielNavbar from '../DossiersReferentielNavbar';
import '../../../../App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function NewTaille() {

    const buttonStyle = {  marginTop: "10px" }
    const [nomTaille,setNomTaille] = useState('')
    const [codeTaille,setCodeTaille] = useState('')

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const handleClick=(e)=>{
        e.preventDefault()
        console.log(nomTaille)
        axios.post('http://localhost:8080/tailles/save/'+nomTaille+'/'+codeTaille , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data == "Taille ajoutée")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data == "Taille existe déjà")
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
        <h1>Ajouter une taille</h1>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }

        <React.Fragment>
            <Grid container className='content'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="codeTaille"
                    name="codeTaille"
                    label="Code de la taille"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={codeTaille}
                    onChange={(e)=>setCodeTaille(e.target.value)}/>

                    <TextField
                    required
                    id="nomTaille"
                    name="nomTaille"
                    label="Nom de la taille"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={nomTaille}
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
