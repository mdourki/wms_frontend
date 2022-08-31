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

export default class ListFamilles extends Component {

  constructor(props) {
    super(props)

    this.state = {
        familles : [] ,
        familleID : '' ,
        totalPages : 0 ,
        pages : [] ,
        dialogOpen : false ,
        familleDel : '' ,
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
      axios.get('http://localhost:8080/familles/totalPages/'+page+'/'+size)
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

  getFamilles = (page , size) => {
      axios.get('http://localhost:8080/familles/'+page+'/'+size)
      .then(response => {
          this.setState({
              familles: response.data
          })
      })
  }

  componentDidMount() {
      this.getFamilles(0,5);
      this.getTotalPages(0,5);
  }

  deleteFamille(familleName) {
      axios.get(`http://localhost:8080/familles/getID/`+familleName)
      .then(response => {
          this.setState({
              familleID : response.data ,
              familleDel : familleName
          })                 
      })
      .then(res => {      
          this.handleClickOpen()  
      } )              
  }

  deleteFamilleFromDB() {
      axios.delete('http://localhost:8080/familles/delete/'+this.state.familleID)
      .then(response => { 
            if(response.data == "Impossible de supprimer cette famille, car elle est associée à un produit")
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
          this.getFamilles(this.state.pageNav , 5);
          this.getTotalPages(this.state.pageNav,5);
      })
  }

  setPage(page) {
      this.setState({ pageNav : page })
      this.getFamilles(page,5);
      this.getTotalPages(page,5);
  }

  render() {
    return (
      <div>
        <DossiersReferentielNavbar/>
        <h1>Liste Familles</h1>
        {this.state.errorAlert ? <Alert severity="error" className='alert'>{this.state.errorAlertContent}</Alert> : <></> }
        <div className='content'>
            
            <Link to='/dossiers/referentiel/familles/New' className='nav-links'>
                <Button color="success" variant="outlined" style={buttonStyle}>Ajouter une famille</Button>
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
                    {this.state.familles.map(famille => (
                        <TableRow key={famille}>
                            <TableCell>
                                {famille}
                            </TableCell>
                            <TableCell>
                                <Link to={'/dossiers/referentiel/familles/edit/'+famille} >
                                    <EditIcon color="primary"/>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <a href='#'>
                                    <DeleteIcon onClick={()=>this.deleteFamille(famille)} 
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
                    Etes-vous sûrs de vouloir supprimer la famille {this.state.familleDel} ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>this.deleteFamilleFromDB()} autoFocus>
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
