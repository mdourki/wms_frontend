import React , {useState , useEffect} from 'react'
import MouvementFournisseurNavbar from './MouvementFournisseurNavbar'
import '../../../App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Select , MenuItem , InputLabel , FormControl } from '@mui/material';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function NewCommande() {

    const buttonStyle = {  marginTop: "10px" }

    const [fournisseursNames,setFournisseursNames] = useState([])
    const [palettesNames,setPalettesNames] = useState([])

    const [nomFournisseur,setNomFournisseur] = useState('')
    const [nomPalette,setNomPalette] = useState('')

    const [fournisseurID,setFournisseurID] = useState('')
    const [paletteID,setPaletteId] = useState('')

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const saveCmd = () => {
        setFournisseur()
        setPalette()
      axios.post('http://localhost:8080/cmdFour/save/'+paletteID+
      '/'+fournisseurID , {
      })
      .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data == "Commande bien enregistrée")
          {
              setSuccessAlertContent(res.data);
              setSuccessAlert(true);
              setErrorAlert(false);
          }
          else if(res.data == "Cette palette est déjà enregistrée dans une commande")
          {
              setErrorAlertContent(res.data);
              setErrorAlert(true);
              setSuccessAlert(false);
          }
      })
    }

    const getPalettes = () => {
        axios.get('http://localhost:8080/listPalettesToCmd')
        .then(response => {
          for (var i = 0 ; i<response.data ; i++) {
            palettesNames.push(i)
          }
          setPalettesNames(response.data)
        })
    }

    const setPalette = () => {
    axios.get('http://localhost:8080/palettes/getIdByNom/'+nomPalette , {
        }).then(res => {
            setPaletteId(res.data);
        })
    }

    const getFournisseurs = () => {
        axios.get('http://localhost:8080/fournisseurs/getAllFournisseursNames')
        .then(response => {
          for (var i = 0 ; i<response.data ; i++) {
            fournisseursNames.push(i)
          }
          setFournisseursNames(response.data)
        })
    }

    const setFournisseur = () => {
    axios.get('http://localhost:8080/fournisseurs/getID/'+nomFournisseur , {
        }).then(res => {
            setFournisseurID(res.data);
        })
    }
  
    useEffect(() => {
        getFournisseurs();
        setFournisseur();
        getPalettes();
        setPalette();
    });

  return (
    <div>
        <MouvementFournisseurNavbar/>
        <h1>Commande fournisseur</h1>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }

        <React.Fragment>
            <Grid container className='content'>
                <Grid item xs={6} sm={6}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="palette-multiple-name-label">Palette</InputLabel>
                        <Select 
                        labelId="palette-select-label"
                        id="palette-select"
                        value={nomPalette}
                        label="Palette"
                        onChange={(e)=>setNomPalette(e.target.value)}
                        >
                        {palettesNames.map(palette => (
                            <MenuItem key={palette[0]} value={palette[1]}>{palette[1]}</MenuItem>
                        ))}   
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="fournisseur-multiple-name-label">Fournisseur</InputLabel>
                        <Select 
                        labelId="fournisseur-select-label"
                        id="fournisseur-select"
                        value={nomFournisseur}
                        label="Fournisseur"
                        onChange={(e)=>setNomFournisseur(e.target.value)}
                        >
                        {fournisseursNames.map(fournisseur => (
                            <MenuItem key={fournisseur} value={fournisseur}>{fournisseur}</MenuItem>
                        ))}   
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} style={buttonStyle}>
                    <Button variant="contained" onClick={saveCmd}>Enregistrer</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    </div>
  )
}
