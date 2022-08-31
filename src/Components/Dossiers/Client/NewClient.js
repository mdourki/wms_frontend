import React , {useState , useEffect} from 'react'
import DossiersNavbar from '../DossiersNavbar';
import '../../../App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Select , MenuItem , InputLabel , FormControl } from '@mui/material';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function NewClient() {

    const buttonStyle = {  marginTop: "10px" }

    const [categoriesNames,setCategoriesNames] = useState([])

    const [nomClient,setNomClient] = useState('')
    const [adrssClient,setAdrssClient] = useState('')
    const [numTelClient,setNumTelClient] = useState('')
    const [emailClient,setEmailClient] = useState('')
    const [nomCategorie,setNomCategorie] = useState('')

    const [categorieID,setCategorieId] = useState()

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const saveClient = () => {
      axios.post('http://localhost:8080/clients/save/'+nomClient+
      '/'+adrssClient+'/'+numTelClient+'/'+emailClient+'/'+categorieID , {
      })
      .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data == "Client ajouté")
          {
              setSuccessAlertContent(res.data);
              setSuccessAlert(true);
              setErrorAlert(false);
          }
          else if(res.data == "Client existe déjà")
          {
              setErrorAlertContent(res.data);
              setErrorAlert(true);
              setSuccessAlert(false);
          }
      })
    }

    const getCategories = () => {
        axios.get('http://localhost:8080/listCatClt/getAllCategoriesNames')
        .then(response => {
          for (var i = 0 ; i<response.data ; i++) {
            categoriesNames.push(i)
          }
          setCategoriesNames(response.data)
        })
    }

    const setCategorie = () => {
    axios.get('http://localhost:8080/listCatClt/getID/'+nomCategorie , {
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
        <h1>Ajouter un client</h1>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }

        <React.Fragment>
            <Grid container className='content'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="nomClient"
                    name="nomClient"
                    label="Nom"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={nomClient}
                    onChange={(e)=>setNomClient(e.target.value)}
                    />

                    <TextField
                    required
                    id="adrssClient"
                    name="adrssClient"
                    label="Adresse"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={adrssClient}
                    onChange={(e)=>setAdrssClient(e.target.value)}
                    />

                    <TextField
                    required
                    id="numTelClient"
                    name="numTelClient"
                    label="Numéro de téléphone"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={numTelClient}
                    onChange={(e)=>setNumTelClient(e.target.value)}
                    />

                    <TextField
                    required
                    id="emailClient"
                    name="emailClient"
                    label="Email"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={emailClient}
                    onChange={(e)=>setEmailClient(e.target.value)}
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
                    <Button variant="contained" onClick={saveClient}>Enregistrer</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    </div>
  )
}
