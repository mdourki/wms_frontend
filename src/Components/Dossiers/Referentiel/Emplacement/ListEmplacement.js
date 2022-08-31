import React , {Component }from 'react'
import DossiersReferentielNavbar from '../DossiersReferentielNavbar';
import '../../../../App.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button"
import {Link} from 'react-router-dom'
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { red } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';

const buttonStyle = {  marginBottom: "10px" }

const buttonPageStyle = {  marginTop: "10px" , marginRight : "5px" }

export default class ListEmplacement extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            emplacements : [] ,
            emplacementID : '' ,
            totalPages : 0 ,
            pages : [] ,
            dialogOpen : false ,
            pageNav : 0 ,
            errorAlert : false ,
            errorAlertContent : '',
        }
    }

    handleClickOpen = () => {
        this.setState({dialogOpen : true})
    }

    handleClickClose = () => {
        this.setState({dialogOpen : false})
    }

    handleNo = () => {
        this.setState({errorAlert : false})
        this.handleClickClose()
      }

    getTotalPages = (page,size) => {
        axios.get('http://localhost:8080/emplacements/totalPages/'+page+'/'+size)
        .then(response => {
            this.setState({
                totalPages: response.data
            })
            const rows = [];
            for (var i = 0 ; i<response.data ; i++) {
                rows.push(i)
            }
            this.setState({
                pages: rows
            })
        })
    }

    getEmplacements = (page , size) => {
        axios.get('http://localhost:8080/emplacements/'+page+'/'+size)
        .then(response => {
            this.setState({
                emplacements: response.data
            })
        })
    }

    componentDidMount() {
        this.getEmplacements(0,5);
        this.getTotalPages(0,5);
    }

    deleteEmplacement(ID) {
        this.setState({
            emplacementID : parseInt(ID) ,
        })                 
        this.handleClickOpen()               
    }

    deleteEmplacementFromDB() {
        axios.delete('http://localhost:8080/emplacements/delete/'+this.state.emplacementID)
        .then(response => { 
            if(response.data == "Impossible de supprimer cet emplacement, car il est contient une palette")
            {
                this.setState({
                    errorAlertContent : response.data ,
                    errorAlert : true
                })
            }
            else{
                this.setState({
                    errorAlert : false
                })
            }
            this.handleClickClose();
            this.getEmplacements(this.state.pageNav , 5);
            this.getTotalPages(this.state.pageNav,5);
        })
    }

    setPage(page) {
        this.setState({ pageNav : page })
        this.getEmplacements(page,5);
        this.getTotalPages(page,5);
    }

    getDepotLibelle(depotID) {
        axios.get(`http://localhost:8080/depots/getByID/`+depotID)
        .then(response => {
            return response.data                
        })
    }

  render() {
    return (
      <div>
        <DossiersReferentielNavbar/>
        <h1>Liste Emplacements</h1>
        {this.state.errorAlert ? <Alert severity="error" className='alert'>{this.state.errorAlertContent}</Alert> : <></> }
        <div className='content'>
            
            <Link to='/dossiers/referentiel/emplacements/New' className='nav-links'>
                <Button color="success" variant="outlined" style={buttonStyle}>Ajouter un emplacement</Button>
            </Link>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>                            
                            <TableCell ><b>Allée</b></TableCell>
                            <TableCell ><b>Niveau horizontal</b></TableCell>
                            <TableCell ><b>Niveau vertical</b></TableCell>
                            <TableCell ><b>Dépôt</b></TableCell>
                            <TableCell ></TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.emplacements.map(emplacement => (
                        <TableRow key={emplacement[0]}>
                            
                            <TableCell>
                                {emplacement[1]}
                            </TableCell>
                            <TableCell>
                                {emplacement[2]}
                            </TableCell>
                            <TableCell>
                                {emplacement[3]}
                            </TableCell>
                            <TableCell>
                                {emplacement[4]}
                            </TableCell>
                            <TableCell>
                                <Link to={'/dossiers/referentiel/emplacements/edit/'+
                                parseInt(emplacement[0])+'/'+emplacement[1]+'/'+emplacement[2]+
                                '/'+emplacement[3]+'/'+emplacement[4]} >
                                    <EditIcon color="primary"/>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <a href='#'>
                                    <DeleteIcon onClick={()=>this.deleteEmplacement(emplacement[0])} 
                                    sx={{ color: red[500] }}/>
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Navigate between pages */}
            {this.state.pages.map(page => (
                <Button onClick={()=>this.setPage(page)} 
                key={page} variant="outlined" style={buttonPageStyle}>
                    {page+1}
                </Button>
            ))}

            
            <Dialog
                open={this.state.dialogOpen}
                onClose={()=>this.handleClickClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {""}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Etes-vous sûrs de vouloir supprimer cet emplacement ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>this.deleteEmplacementFromDB()} autoFocus>
                        Oui
                    </Button>
                    <Button onClick={()=>this.handleNo()}>Non</Button>
                </DialogActions>
            </Dialog>
        </div>
      </div>
    )
  }
}
