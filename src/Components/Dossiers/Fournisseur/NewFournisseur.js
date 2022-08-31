import React , {useState , useEffect} from 'react'
import DossiersNavbar from '../DossiersNavbar';
import '../../../App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Select , MenuItem , InputLabel , FormControl } from '@mui/material';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function NewFournisseur() {

  const buttonStyle = {  marginTop: "10px" }

  const [categoriesNames,setCategoriesNames] = useState([])

  const [nomFournisseur,setNomFournisseur] = useState('')
  const [adrssFournisseur,setAdrssFournisseur] = useState('')
  const [numTelFournisseur,setNumTelFournisseur] = useState('')
  const [emailFournisseur,setEmailFournisseur] = useState('')
  const [nomCategorie,setNomCategorie] = useState('')

  const [categorieID,setCategorieId] = useState()

  const [successAlert, setSuccessAlert] = useState(false);
  const [successAlertContent, setSuccessAlertContent] = useState('');

  const [errorAlert, setErrorAlert] = useState(false);
  const [errorAlertContent, setErrorAlertContent] = useState('');

  const saveFournisseur = () => {
    axios.post('http://localhost:8080/fournisseurs/save/'+nomFournisseur+
    '/'+adrssFournisseur+'/'+numTelFournisseur+'/'+emailFournisseur+'/'+categorieID , {
    })
    .then(res => {
        console.log(res);
        console.log(res.data);
        if(res.data == "Fournisseur ajouté")
        {
            setSuccessAlertContent(res.data);
            setSuccessAlert(true);
            setErrorAlert(false);
        }
        else if(res.data == "Fournisseur existe déjà")
        {
            setErrorAlertContent(res.data);
            setErrorAlert(true);
            setSuccessAlert(false);
        }
    })
  }

  const getCategories = () => {
      axios.get('http://localhost:8080/listCatFour/getAllCategoriesNames')
      .then(response => {
        for (var i = 0 ; i<response.data ; i++) {
          categoriesNames.push(i)
        }
        setCategoriesNames(response.data)
      })
  }

  const setCategorie = () => {
  axios.get('http://localhost:8080/listCatFour/getID/'+nomCategorie , {
      }).then(res => {
          setCategorieId(res.data);
      })
  }

  useEffect(() => {
      getCategories();
      setCategorie();
  });

  return (
    <div>
      <DossiersNavbar/>
      <h1>Ajouter un fournisseur</h1>
      {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
      {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }

      <React.Fragment>
          <Grid container className='content'>
              <Grid item xs={6} sm={6}>
                  <TextField
                  required
                  id="nomFournisseur"
                  name="nomFournisseur"
                  label="Nom"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={nomFournisseur}
                  onChange={(e)=>setNomFournisseur(e.target.value)}
                  />

                  <TextField
                  required
                  id="adrssFournisseur"
                  name="adrssFournisseur"
                  label="Adresse"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={adrssFournisseur}
                  onChange={(e)=>setAdrssFournisseur(e.target.value)}
                  />

                  <TextField
                  required
                  id="numTelFournisseur"
                  name="numTelFournisseur"
                  label="Numéro de téléphone"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={numTelFournisseur}
                  onChange={(e)=>setNumTelFournisseur(e.target.value)}
                  />

                  <TextField
                  required
                  id="emailFournisseur"
                  name="emailFournisseur"
                  label="Email"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={emailFournisseur}
                  onChange={(e)=>setEmailFournisseur(e.target.value)}
                  />

                  <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="categorie-multiple-name-label">Catégorie</InputLabel>
                      <Select 
                      labelId="categorie-select-label"
                      id="categorie-select"
                      value={nomCategorie}
                      label="Catégorie"
                      onChange={(e)=>setNomCategorie(e.target.value)}
                      >
                      {categoriesNames.map(categorie => (
                          <MenuItem key={categorie} value={categorie}>{categorie}</MenuItem>
                      ))}   
                      </Select>
                  </FormControl>
              </Grid>
              <Grid item xs={12} style={buttonStyle}>
                  <Button variant="contained" onClick={saveFournisseur}>Enregistrer</Button>
              </Grid>
          </Grid>
      </React.Fragment>
    </div>
  )
}
