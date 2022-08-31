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

export default class ListStyles extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            styles : [] ,
            styleID : '' ,
            totalPages : 0 ,
            pages : [] ,
            dialogOpen : false ,
            styleDel : '' ,
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
        axios.get('http://localhost:8080/styles/totalPages/'+page+'/'+size)
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

    getStyles = (page , size) => {
        axios.get('http://localhost:8080/styles/'+page+'/'+size)
        .then(response => {
            this.setState({
                styles: response.data
            })
        })
    }

    componentDidMount() {
        this.getStyles(0,5);
        this.getTotalPages(0,5);
    }

    deleteStyle(styleName) {
        axios.get(`http://localhost:8080/styles/getID/`+styleName)
        .then(response => {
            this.setState({
                styleID : response.data ,
                styleDel : styleName
            })                 
        })
        .then(res => {      
            this.handleClickOpen()  
        } )              
    }

    deleteStyleFromDB() {
        axios.delete('http://localhost:8080/styles/delete/'+this.state.styleID)
        .then(response => { 
            if(response.data == "Impossible de supprimer ce style, car il est associé à un produit")
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
            this.getStyles(this.state.pageNav , 5);
            this.getTotalPages(this.state.pageNav,5);
        })
    }

    setPage(page) {
        this.setState({ pageNav : page })
        this.getStyles(page,5);
        this.getTotalPages(page,5);
    }

  render() {
    return (
      <div>
        <DossiersReferentielNavbar/>
        <h1>Liste Styles</h1>
        {this.state.errorAlert ? <Alert severity="error" className='alert'>{this.state.errorAlertContent}</Alert> : <></> }
        <div className='content'>
            
            <Link to='/dossiers/referentiel/styles/New' className='nav-links'>
                <Button color="success" variant="outlined" style={buttonStyle}>Ajouter un style</Button>
            </Link>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell ><b>Nom</b></TableCell>
                            <TableCell ></TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.styles.map(style => (
                        <TableRow key={style}>
                            <TableCell>
                                {style}
                            </TableCell>
                            <TableCell>
                                <Link to={'/dossiers/referentiel/styles/edit/'+style} >
                                    <EditIcon color="primary"/>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <a href='#'>
                                    <DeleteIcon onClick={()=>this.deleteStyle(style)} 
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
                    Etes-vous sûrs de vouloir supprimer le style {this.state.styleDel} ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>this.deleteStyleFromDB()} autoFocus>
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
