import React , {useState , useEffect} from 'react'
import ReportingReferentielNavbar from '../ReportingReferentielNavbar';
import '../../../../App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Select , Chip , MenuItem , InputLabel , FormControl } from '@mui/material';
import Button from "@mui/material/Button"
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function NewProduit() {

    const buttonStyle = {  marginTop: "10px" }
    const inputStyle = {marginRight: "10px"}
    const formStyle = { width : "900px" }

    const [famillesNames,setFamillesNames] = useState([])
    const [collectionsNames,setCollectionsNames] = useState([])
    const [stylesNames,setStylesNames] = useState([])
    const [couleursNames,setCouleursNames] = useState([])
    const [taillesNames,setTaillesNames] = useState([])
    const [tvasTaux,setTvasTaux] = useState([])

    const [nomProduit,setNomProduit] = useState('')
    const [designationProduit,setDesignationProduit] = useState('')
    const [codeBarreProduit,setCodeBarreProduit] = useState('')
    const [prixUnitProduit,setPrixUnitProduit] = useState('')
    const [prixTTCProduit,setPrixTTCProduit] = useState('')

    const [nomsCouleurs,setNomsCouleurs] = useState([])
    const [nomsTailles,setNomsTailles] = useState([])
    const [nomFamille,setNomFamille] = useState('')
    const [nomCollection,setNomCollection] = useState('')
    const [nomStyle,setNomStyle] = useState('')
    const [tauxTVA,setTauxTVA] = useState('')

    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, setErrorAlertContent] = useState('');

    const saveProduit = () => {
      axios.post('http://localhost:8080/produits/save/'+nomProduit+
      '/'+nomsCouleurs+'/'+nomsTailles+'/'+nomFamille+'/'+nomCollection+'/'+nomStyle+
      '/'+tauxTVA+'/'+codeBarreProduit+'/'+designationProduit+'/'+prixUnitProduit+'/'+prixTTCProduit,{
      })
      .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data == "Produit ajouté")
          {
              setSuccessAlertContent(res.data);
              setSuccessAlert(true);
              setErrorAlert(false);
          }
          else if(res.data == "Produit existe déjà")
          {
              setErrorAlertContent(res.data);
              setErrorAlert(true);
              setSuccessAlert(false);
          }
      })
    }

    const getFamilles = () => {
        axios.get('http://localhost:8080/familles/getAllFamillesNames')
        .then(response => {
          setFamillesNames(response.data)
        })
    }

    const getStyles = () => {
        axios.get('http://localhost:8080/styles/getAllStylesNames')
        .then(response => {
          setStylesNames(response.data)
        })
    }

    const getCollections = () => {
        axios.get('http://localhost:8080/collections/getAllCollectionsNames')
        .then(response => {
          setCollectionsNames(response.data)
        })
    }

    const getCouleurs = () => {
        axios.get('http://localhost:8080/couleurs/getAllCouleursNames')
        .then(response => {
          setCouleursNames(response.data)
        })
    }

    const getTailles = () => {
        axios.get('http://localhost:8080/tailles/getAllTaillesNames')
        .then(response => {
          setTaillesNames(response.data)
        })
    }

    const getTvas = () => {
        axios.get('http://localhost:8080/tvaList/getAllTvaTaux')
        .then(response => {
          setTvasTaux(response.data)
        })
    }

    const handleChangeClr = (event) => {
        const {
          target: { value },
        } = event;
        setNomsCouleurs(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
        
    };

    const handleChangeTaille = (event) => {
        const {
          target: { value },
        } = event;
        setNomsTailles(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
        
    };
  
    useEffect(() => {
        getFamilles();
        getStyles();
        getCollections();
        getCouleurs();
        getTailles();
        getTvas();
    });

  return (
    <div>
        <ReportingReferentielNavbar/>
        <h1>Ajouter un produit</h1>
        {successAlert ? <Alert severity="success" className='alert'>{successAlertContent}</Alert> : <></> }
        {errorAlert ? <Alert severity="error" className='alert'>{errorAlertContent}</Alert> : <></> }

        <React.Fragment>
            
                <Grid container className='content' style={formStyle}>
                    <Grid style={inputStyle} item xs={5}>
                        <TextField
                        required
                        id="nomProduit"
                        name="nomProduit"
                        label="Nom"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={nomProduit}
                        onChange={(e)=>setNomProduit(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                        required
                        id="designationProduit"
                        name="designationProduit"
                        label="Désignation"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={designationProduit}
                        onChange={(e)=>setDesignationProduit(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container className='content' style={formStyle}>
                    <Grid item xs={5}>
                        <TextField
                        required
                        id="codeBarreProduit"
                        name="codeBarreProduit"
                        label="Code barre"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={codeBarreProduit}
                        onChange={(e)=>setCodeBarreProduit(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container className='content' style={formStyle}>
                    <Grid style={inputStyle} item xs={5}>
                        <TextField
                        required
                        id="prixUnitProduit"
                        name="prixUnitProduit"
                        label="Prix unitaire"
                        type="number"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={prixUnitProduit}
                        onChange={(e)=>setPrixUnitProduit(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                        required
                        id="prixTTCProduit"
                        name="prixTTCProduit"
                        label="Prix TTC"
                        type="number"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={prixTTCProduit}
                        onChange={(e)=>setPrixTTCProduit(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container className='content' style={formStyle}>
                    <Grid item xs={5}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="categorie-multiple-name-label">Famille</InputLabel>
                            <Select 
                            labelId="categorie-select-label"
                            id="categorie-select"
                            value={nomFamille}
                            label="Famille"
                            onChange={(e)=>setNomFamille(e.target.value)}
                            >
                            {famillesNames.map(famille => (
                                <MenuItem key={famille} value={famille}>{famille}</MenuItem>
                            ))}   
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="categorie-multiple-name-label">Collection</InputLabel>
                            <Select 
                            labelId="categorie-select-label"
                            id="categorie-select"
                            value={nomCollection}
                            label="Collection"
                            onChange={(e)=>setNomCollection(e.target.value)}
                            >
                            {collectionsNames.map(collection => (
                                <MenuItem key={collection} value={collection}>{collection}</MenuItem>
                            ))}   
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container className='content' style={formStyle}>
                    <Grid item xs={5}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="categorie-multiple-name-label">Style</InputLabel>
                            <Select 
                            labelId="categorie-select-label"
                            id="categorie-select"
                            value={nomStyle}
                            label="Famille"
                            onChange={(e)=>setNomStyle(e.target.value)}
                            >
                            {stylesNames.map(style => (
                                <MenuItem key={style} value={style}>{style}</MenuItem>
                            ))}   
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="categorie-multiple-name-label">TVA</InputLabel>
                            <Select 
                            labelId="categorie-select-label"
                            id="categorie-select"
                            value={tauxTVA}
                            label="TVA"
                            onChange={(e)=>setTauxTVA(e.target.value)}
                            >
                            {tvasTaux.map(taux => (
                                <MenuItem key={taux} value={taux}>{taux}</MenuItem>
                            ))}   
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container className='content' style={formStyle}>
                    <Grid item xs={5}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="categorie-multiple-name-label">Couleurs</InputLabel>
                            <Select 
                            labelId="categorie-select-label"
                            id="categorie-select"
                            multiple
                            value={nomsCouleurs}
                            label="Couleurs"
                            onChange={handleChangeClr}
                            >
                            {couleursNames.map(couleur => (
                                <MenuItem key={couleur} value={couleur}>{couleur}</MenuItem>
                            ))}   
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="categorie-multiple-name-label">Tailles</InputLabel>
                            <Select 
                            labelId="categorie-select-label"
                            id="categorie-select"
                            multiple
                            value={nomsTailles}
                            label="Tailles"
                            onChange={handleChangeTaille}
                            >
                            {taillesNames.map(taille => (
                                <MenuItem key={taille} value={taille}>{taille}</MenuItem>
                            ))}   
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} style={buttonStyle}>
                        <Button variant="contained" onClick={saveProduit}>Enregistrer</Button>
                    </Grid>

                </Grid>
            
            
        </React.Fragment>
    </div>
  )
}
