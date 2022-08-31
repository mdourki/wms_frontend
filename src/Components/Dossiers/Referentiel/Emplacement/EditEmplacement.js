import React , {useState , useEffect } from 'react'
import DossiersReferentielNavbar from '../DossiersReferentielNavbar';
import '../../../../App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Select , MenuItem , InputLabel , FormControl } from '@mui/material';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useParams } from "react-router-dom";

export default function EditEmplacement() {

  let { emplacementID , emplacementAllee , emplacementNivHoriz 
    , emplacementNivVerti , emplacementDepotLibelle} = useParams();

  var idEmplacement = parseInt(emplacementID);

  const buttonStyle = {  marginTop: "10px" }
  
  const [depotsLibelles,setDepotsLibelle] = useState([])

  const [depotID,setDepotId] = useState()

  const [alleeEmplacement,setAlleeEmplacement] = useState(emplacementAllee)
  const [nivHorizEmplacement,setNivHorizEmplacement] = useState(emplacementNivHoriz)
  const [nivVertiEmplacement,setNivVertiEmplacement] = useState(emplacementNivVerti)
  const [libelleDepot,setLibelleDepot] = useState(emplacementDepotLibelle)

  const [successAlert, setSuccessAlert] = useState(false);
  const [successAlertContent, setSuccessAlertContent] = useState('');

  const [errorAlert, setErrorAlert] = useState(false);
  const [errorAlertContent, setErrorAlertContent] = useState('');


  const saveEmplacement = () => {
    setDepot()
    axios.put('http://localhost:8080/emplacements/update/'+idEmplacement+'/'+alleeEmplacement+
    '/'+nivHorizEmplacement+'/'+nivVertiEmplacement+'/'+depotID , {
    })
    .then(res => {
        console.log(res);
        console.log(res.data);
        if(res.data == "Emplacement modifié")
        {
            setSuccessAlertContent(res.data);
            setSuccessAlert(true);
            setErrorAlert(false);
        }
        else if(res.data == "Emplacement non modifié")
        {
            setErrorAlertContent(res.data);
            setErrorAlert(true);
            setSuccessAlert(false);
        }
    })
  }

  const getDepots = () => {
    axios.get('http://localhost:8080/depots/getAllDepotsLibelle')
    .then(response => {
      for (var i = 0 ; i<response.data ; i++) {
        depotsLibelles.push(i)
      }
      setDepotsLibelle(response.data)
    })
  }

  const setDepot = () => {
    axios.get('http://localhost:8080/depots/getID/'+libelleDepot , {
      }).then(res => {
        setDepotId(res.data);
      })
  }

  useEffect(() => {
    getDepots();
    setDepot();
  });

  return (
    <div>
      <DossiersReferentielNavbar/>
      <h1>Modifier un emplacement</h1>
      {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
      {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }

      <React.Fragment>
          <Grid container className='content'>
              <Grid item xs={6} sm={6}>
                  <TextField
                  required
                  id="allee"
                  name="allee"
                  label="Allée"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={alleeEmplacement}
                  onChange={(e)=>setAlleeEmplacement(e.target.value)}
                  />

                  <TextField
                  required
                  id="nivHoriz"
                  name="nivHoriz"
                  label="Niveau horizontal"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={nivHorizEmplacement}
                  onChange={(e)=>setNivHorizEmplacement(e.target.value)}
                  />

                  <TextField
                  required
                  id="nivVerti"
                  name="nivVerti"
                  label="Niveau vertical"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={nivVertiEmplacement}
                  onChange={(e)=>setNivVertiEmplacement(e.target.value)}
                  />

                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="depot-multiple-name-label">Dépôt</InputLabel>
                    <Select 
                      labelId="depot-select-label"
                      id="depot-select"
                      value={libelleDepot}
                      label="Dépôt"
                      onChange={(e)=>setLibelleDepot(e.target.value)}
                    >
                      {depotsLibelles.map(depot => (
                        <MenuItem key={depot} value={depot}>{depot}</MenuItem>
                      ))}   
                    </Select>
                  </FormControl>
              </Grid>
              <Grid item xs={12} style={buttonStyle}>
                  <Button variant="contained" onClick={saveEmplacement}>Enregistrer</Button>
              </Grid>
          </Grid>
      </React.Fragment>
    </div>
  )
}
