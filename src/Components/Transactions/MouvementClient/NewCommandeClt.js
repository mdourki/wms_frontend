import React , {useState , useEffect} from 'react'
import MouvementClientNavbar from './MouvementClientNavbar'
import '../../../App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Select , MenuItem , InputLabel , FormControl } from '@mui/material';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function NewCommandeClt() {

    const buttonStyle = {  marginTop: "10px" }

    const [clientsNames,setClientsNames] = useState([])
    const [palettesNames,setPalettesNames] = useState([])

    const [nomClient,setNomClient] = useState('')
    const [nomPalette,setNomPalette] = useState('')

    const [clientID,setClientID] = useState('')
    const [paletteID,setPaletteId] = useState('')

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const saveCmd = () => {
        setClient()
        setPalette()
      axios.post('http://localhost:8080/cmdClt/save/'+paletteID+
      '/'+clientID , {
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
        axios.get('http://localhost:8080/listPalettesToLiv')
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

    const getClients = () => {
        axios.get('http://localhost:8080/clients/getAllClientsNames')
        .then(response => {
          for (var i = 0 ; i<response.data ; i++) {
            clientsNames.push(i)
          }
          setClientsNames(response.data)
        })
    }

    const setClient = () => {
    axios.get('http://localhost:8080/clients/getID/'+nomClient , {
        }).then(res => {
            setClientID(res.data);
        })
    }
  
    useEffect(() => {
        getPalettes();
        setPalette();
        getClients();
        setClient();
    });

  return (
    <div>
        <MouvementClientNavbar/>
        <h1>Commande client</h1>
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
                        <InputLabel id="client-multiple-name-label">Client</InputLabel>
                        <Select 
                        labelId="client-select-label"
                        id="client-select"
                        value={nomClient}
                        label="Client"
                        onChange={(e)=>setNomClient(e.target.value)}
                        >
                        {clientsNames.map(client => (
                            <MenuItem key={client} value={client}>{client}</MenuItem>
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
