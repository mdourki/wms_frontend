import React , {Component }from 'react'
import DossiersNavbar from '../DossiersNavbar';
import '../../../App.css'
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

const buttonStyle = {  marginBottom: "10px" }

const buttonPageStyle = {  marginTop: "10px" , marginRight : "5px" }

export default class ListFournisseur extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            fournisseurs : [] ,
            fournisseurID : '' ,
            totalPages : 0 ,
            pages : [] ,
            dialogOpen : false ,
            pageNav : 0 ,
        }
    }

    handleClickOpen = () => {
        this.setState({dialogOpen : true})
    }

    handleClickClose = () => {
        this.setState({dialogOpen : false})
    }

    getTotalPages = (page,size) => {
        axios.get('http://localhost:8080/fournisseurs/totalPages/'+page+'/'+size)
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

    getFournisseurs = (page , size) => {
        axios.get('http://localhost:8080/fournisseurs/'+page+'/'+size)
        .then(response => {
            this.setState({
                fournisseurs: response.data
            })
        })
    }

    componentDidMount() {
        this.getFournisseurs(0,5);
        this.getTotalPages(0,5);
    }

    deleteFournisseur(ID) {
        this.setState({
            fournisseurID : parseInt(ID) ,
        })                 
        this.handleClickOpen()               
    }

    deleteFournisseurFromDB() {
        axios.delete('http://localhost:8080/fournisseurs/delete/'+this.state.fournisseurID)
        .then(response => { 
            this.handleClickClose();
            this.getFournisseurs(this.state.pageNav , 5);
            this.getTotalPages(this.state.pageNav,5);
        })
    }

    setPage(page) {
        this.setState({ pageNav : page })
        this.getFournisseurs(page,5);
        this.getTotalPages(page,5);
    }

  render() {
    return (
      <div>
        <DossiersNavbar/>
        <h1>Liste Fournisseurs</h1>
        <div className='content'>
            
            <Link to='/dossiers/fournisseurs/New' className='nav-links'>
                <Button color="success" variant="outlined" style={buttonStyle}>Ajouter un fournisseur</Button>
            </Link>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>                            
                            <TableCell ><b>Nom</b></TableCell>
                            <TableCell ><b>Adresse</b></TableCell>
                            <TableCell ><b>Numéro de téléphone</b></TableCell>
                            <TableCell ><b>Email</b></TableCell>
                            <TableCell ><b>Catégorie</b></TableCell>
                            <TableCell ></TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.fournisseurs.map(fournisseur => (
                        <TableRow key={fournisseur[0]}>
                            
                            <TableCell>
                                {fournisseur[1]}
                            </TableCell>
                            <TableCell>
                                {fournisseur[2]}
                            </TableCell>
                            <TableCell>
                                {fournisseur[3]}
                            </TableCell>
                            <TableCell>
                                {fournisseur[4]}
                            </TableCell>
                            <TableCell>
                                {fournisseur[5]}
                            </TableCell>
                            <TableCell>
                                <Link to={'/dossiers/fournisseurs/edit/'+
                                parseInt(fournisseur[0])+'/'+fournisseur[1]+'/'+fournisseur[2]+
                                '/'+fournisseur[3]+'/'+fournisseur[4]+'/'+fournisseur[5]} >
                                    <EditIcon color="primary"/>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <a href='#'>
                                    <DeleteIcon onClick={()=>this.deleteFournisseur(fournisseur[0])} 
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
                    Etes-vous sûrs de vouloir supprimer ce fournisseur ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>this.deleteFournisseurFromDB()} autoFocus>
                        Oui
                    </Button>
                    <Button onClick={()=>this.handleClickClose()}>Non</Button>
                </DialogActions>
            </Dialog>
        </div>
      </div>
    )
  }
}
