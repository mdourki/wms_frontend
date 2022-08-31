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

export default class ListClient extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            clients : [] ,
            clientID : '' ,
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
        axios.get('http://localhost:8080/clients/totalPages/'+page+'/'+size)
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

    getClients = (page , size) => {
        axios.get('http://localhost:8080/clients/'+page+'/'+size)
        .then(response => {
            this.setState({
                clients: response.data
            })
        })
    }

    componentDidMount() {
        this.getClients(0,5);
        this.getTotalPages(0,5);
    }

    deleteClient(ID) {
        this.setState({
            clientID : parseInt(ID) ,
        })                 
        this.handleClickOpen()               
    }

    deleteClientFromDB() {
        axios.delete('http://localhost:8080/clients/delete/'+this.state.clientID)
        .then(response => { 
            this.handleClickClose();
            this.getClients(this.state.pageNav , 5);
            this.getTotalPages(this.state.pageNav,5);
        })
    }

    setPage(page) {
        this.setState({ pageNav : page })
        this.getClients(page,5);
        this.getTotalPages(page,5);
    }

  render() {
    return (
      <div>
        <DossiersNavbar/>
        <h1>Liste Clients</h1>
        <div className='content'>
            
            <Link to='/dossiers/clients/New' className='nav-links'>
                <Button color="success" variant="outlined" style={buttonStyle}>Ajouter un client</Button>
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
                    {this.state.clients.map(client => (
                        <TableRow key={client[0]}>
                            
                            <TableCell>
                                {client[1]}
                            </TableCell>
                            <TableCell>
                                {client[2]}
                            </TableCell>
                            <TableCell>
                                {client[3]}
                            </TableCell>
                            <TableCell>
                                {client[4]}
                            </TableCell>
                            <TableCell>
                                {client[5]}
                            </TableCell>
                            <TableCell>
                                <Link to={'/dossiers/clients/edit/'+
                                parseInt(client[0])+'/'+client[1]+'/'+client[2]+
                                '/'+client[3]+'/'+client[4]+'/'+client[5]} >
                                    <EditIcon color="primary"/>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <a href='#'>
                                    <DeleteIcon onClick={()=>this.deleteClient(client[0])} 
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
                    Etes-vous sûrs de vouloir supprimer ce client ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>this.deleteClientFromDB()} autoFocus>
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
