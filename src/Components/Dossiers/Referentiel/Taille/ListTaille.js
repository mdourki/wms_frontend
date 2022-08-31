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

export default class ListTaille extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tailles : [] ,
            tailleID : '' ,
            totalPages : 0 ,
            pages : [] ,
            dialogOpen : false ,
            tailleCodeDel : '' ,
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
        axios.get('http://localhost:8080/tailles/totalPages/'+page+'/'+size)
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

    getTailles = (page , size) => {
        axios.get('http://localhost:8080/tailles/'+page+'/'+size)
        .then(response => {
            this.setState({
                tailles: response.data
            })
        })
    }

    componentDidMount() {
        this.getTailles(0,5);
        this.getTotalPages(0,5);
    }

    deleteTaille(tailleCode) {
        axios.get(`http://localhost:8080/tailles/getID/`+tailleCode)
        .then(response => {
            this.setState({
                tailleID : response.data ,
                tailleCodeDel : tailleCode
            })                 
        })
        .then(res => {      
            this.handleClickOpen()  
        } )              
    }

    deleteTailleFromDB() {
        axios.delete('http://localhost:8080/tailles/delete/'+this.state.tailleID)
        .then(response => { 
            if(response.data == "Impossible de supprimer cette taille, car elle est associée à un produit")
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
            this.getTailles(this.state.pageNav , 5);
            this.getTotalPages(this.state.pageNav,5);
        })
    }

    setPage(page) {
        this.setState({ pageNav : page })
        this.getTailles(page,5);
        this.getTotalPages(page,5);
    }

  render() {
    return (
      <div>
        <DossiersReferentielNavbar/>
        <h1>Liste Tailles</h1>
        {this.state.errorAlert ? <Alert severity="error" className='alert'>{this.state.errorAlertContent}</Alert> : <></> }
        <div className='content'>
            
            <Link to='/dossiers/referentiel/tailles/New' className='nav-links'>
                <Button color="success" variant="outlined" style={buttonStyle}>Ajouter une taille</Button>
            </Link>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell ><b>Code</b></TableCell>
                            <TableCell ><b>Nom</b></TableCell>
                            <TableCell ></TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.tailles.map(taille => (
                        <TableRow key={taille[0]}>
                            <TableCell>
                                {taille[1]}
                            </TableCell>
                            <TableCell>
                                {taille[2]}
                            </TableCell>
                            <TableCell>
                                <Link to={'/dossiers/referentiel/tailles/edit/'+taille[1]+'/'+taille[2]} >
                                    <EditIcon color="primary"/>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <a href='#'>
                                    <DeleteIcon onClick={()=>this.deleteTaille(taille[1])} 
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
                    Etes-vous sûrs de vouloir supprimer la taille {this.state.tailleCodeDel} ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>this.deleteTailleFromDB()} autoFocus>
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
