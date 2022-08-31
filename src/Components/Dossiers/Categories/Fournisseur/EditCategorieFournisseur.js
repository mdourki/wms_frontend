import React , {useState , useEffect } from 'react'
import DossiersCategoriesNavbar from '../DossiersCategoriesNavbar';
import '../../../../App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useParams } from "react-router-dom";

export default function EditCategorieFournisseur() {

    let { categorie } = useParams();

    var categorieID = '';

    const buttonStyle = {  marginTop: "10px" }
    const [fourCategorieName,setFourCategorieName] = useState(categorie)

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');
  
    axios.get(`http://localhost:8080/listCatFour/getID/${categorie}`)
    .then(function (response) {
            categorieID = response.data
    })

    const handleClick=(e)=>{
        e.preventDefault()
        axios.put('http://localhost:8080/listCatFour/update/'+categorieID+'/'+fourCategorieName , {
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data == "Catégorie modifiée")
            {
                setSuccessAlertContent(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
            }
            else if(res.data == "Catégorie non modifiée")
            {
                setErrorAlertContent(res.data);
                setErrorAlert(true);
                setSuccessAlert(false);
            }
        })
    }

  return (
    <div>
        <DossiersCategoriesNavbar/>
        <h1>Modifier Catégorie Client</h1>
        <React.Fragment>
            {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
            {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }   
            <Grid container className='content'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="fourCategorieName"
                    name="fourCategorieName"
                    label="Nom de la catégorie"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={fourCategorieName}
                    onChange={(e)=>setFourCategorieName(e.target.value)}/>
                </Grid>
                <Grid item xs={12} style={buttonStyle}>
                    <Button variant="contained" onClick={handleClick}>Enregistrer</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    </div>
  )
}
