import React , {useState , useEffect} from 'react'
import ReportingReferentielNavbar from '../ReportingReferentielNavbar';
import '../../../../App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Select , Chip , MenuItem , InputLabel , FormControl } from '@mui/material';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function NewPalette() {

    const buttonStyle = {  marginTop: "10px" }

    const [produitsCodes,setProduitsCodes] = useState([])

    const [nomPalette,setNomPalette] = useState('')
    const [numSerie,setNumSerie] = useState('')
    const [quantity,setQuantity] = useState('')
    const [codePrdt,setCodePrdt] = useState('')

    const [produitID,setProduitId] = useState()

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const savePalette = () => {
      axios.post('http://localhost:8080/palettes/save/'+nomPalette+
      '/'+numSerie+'/'+quantity+'/'+codePrdt , {
      })
      .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data == "Palette ajoutée")
          {
              setSuccessAlertContent(res.data);
              setSuccessAlert(true);
              setErrorAlert(false);
          }
          else if(res.data == "Palette existe déjà")
          {
              setErrorAlertContent(res.data);
              setErrorAlert(true);
              setSuccessAlert(false);
          }
      })
    }

    const getProduits = () => {
      axios.get('http://localhost:8080/produits/getCodesPrdts')
      .then(response => {
        for (var i = 0 ; i<response.data ; i++) {
          produitsCodes.push(i)
        }
        setProduitsCodes(response.data)
      })
    }

    const setProduit = () => {
      axios.get('http://localhost:8080/produits/getID/'+codePrdt , {
        }).then(res => {
          setProduitId(res.data);
        })
    }

    useEffect(() => {
        getProduits();
        setProduit();
    });

  return (
    <div>
        <ReportingReferentielNavbar/>
        <h1>Ajouter une palette</h1>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }

        <React.Fragment>
            <Grid container className='content'>
                <Grid item xs={6} sm={6}>
                    <TextField
                    required
                    id="nom"
                    name="nom"
                    label="Nom"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={nomPalette}
                    onChange={(e)=>setNomPalette(e.target.value)}
                    />

                    <TextField
                    required
                    id="numSerie"
                    name="numSerie"
                    label="Numéro de série"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={numSerie}
                    onChange={(e)=>setNumSerie(e.target.value)}
                    />

                    <TextField
                    required
                    id="quantity"
                    name="quantity"
                    label="Quantité"
                    type="number"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={quantity}
                    onChange={(e)=>setQuantity(e.target.value)}
                    />

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="prdt-multiple-name-label">Produit</InputLabel>
                        <Select 
                        labelId="prdt-select-label"
                        id="prdt-select"
                        value={codePrdt}
                        label="Produit"
                        onChange={(e)=>setCodePrdt(e.target.value)}
                        >
                        {produitsCodes.map(code => (
                            <MenuItem key={code} value={code}>{code}</MenuItem>
                        ))}   
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} style={buttonStyle}>
                    <Button variant="contained" onClick={savePalette}>Enregistrer</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    </div>
  )
}
