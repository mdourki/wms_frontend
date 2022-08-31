import React , {useState , useEffect} from 'react'
import MouvementFournisseurNavbar from './MouvementFournisseurNavbar'
import '../../../App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Select , MenuItem , InputLabel , FormControl } from '@mui/material';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function NewRecepFour() {

    const buttonStyle = {  marginTop: "10px" }

    const [emplacementsNames,setEmplacementsNames] = useState([])
    const [palettesNames,setPalettesNames] = useState([])

    const [nomEmplacement,setNomEmplacement] = useState('')
    const [nomPalette,setNomPalette] = useState('')

    const [emplacementID,setEmplacementID] = useState('')
    const [paletteID,setPaletteId] = useState('')

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const saveReceFact = () => {
        setPalette()
      axios.post('http://localhost:8080/recFour/save/'+paletteID+
      '/'+emplacementID , {
      })
      .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data == "Réception bien enregistrée")
          {
              setSuccessAlertContent(res.data);
              setSuccessAlert(true);
              setErrorAlert(false);
          }
          else
          {
              setErrorAlertContent(res.data);
              setErrorAlert(true);
              setSuccessAlert(false);
          }
      })
    }

    const getPalettes = () => {
        axios.get('http://localhost:8080/listPalettesToRece')
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

    const getEmplacements = () => {
        axios.get('http://localhost:8080/emplacements/getEmplacementsToStock')
        .then(response => {
          for (var i = 0 ; i<response.data ; i++) {
            emplacementsNames.push(i)
          }
          setEmplacementsNames(response.data)
        })
    }

    {/*const setEmplacement = () => {
    axios.get('http://localhost:8080/fournisseurs/getID/'+nomFournisseur , {
        }).then(res => {
            setFournisseurID(res.data);
        })
    }*/}
  
    useEffect(() => {
        getEmplacements();
        {/*setEmplacement();*/}
        getPalettes();
        setPalette();
    });

  return (
    <div>
        <MouvementFournisseurNavbar/>
        <h1>Réception fournisseur</h1>
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
                            <MenuItem key={palette} value={palette}>{palette}</MenuItem>
                        ))}   
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="emplacement-multiple-name-label">Emplacement</InputLabel>
                        <Select 
                        labelId="emplacement-select-label"
                        id="emplacement-select"
                        value={emplacementID}
                        label="Emplacement"
                        onChange={(e)=>setEmplacementID(e.target.value)}
                        >
                        {emplacementsNames.map(emplacement => (
                            <MenuItem key={emplacement[0]} value={emplacement[0]}>{emplacement[1]+
                                emplacement[2]+emplacement[3]+"|"+emplacement[4]}</MenuItem>
                        ))}   
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} style={buttonStyle}>
                    <Button variant="contained" onClick={saveReceFact}>Enregistrer</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    </div>
  )
}
