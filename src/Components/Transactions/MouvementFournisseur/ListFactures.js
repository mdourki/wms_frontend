import React , {Component }from 'react'
import MouvementFournisseurNavbar from './MouvementFournisseurNavbar'
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import Alert from '@mui/material/Alert';

const buttonStyle = {  marginBottom: "10px" }

const buttonPageStyle = {  marginTop: "10px" , marginRight : "5px" }

export default class ListFactures extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            factures : [] ,
            factureID : '' ,
            totalPages : 0 ,
            pages : [] ,
            dialogOpen : false ,
            pageNav : 0 ,
        }
    }

    getTotalPages = (page,size) => {
        axios.get('http://localhost:8080/ligneFactFour/totalPages/'+page+'/'+size)
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

    getFactures = (page , size) => {
        axios.get('http://localhost:8080/ligneFactFour/'+page+'/'+size)
        .then(response => {
            this.setState({
                factures: response.data
            })
        })
    }

    componentDidMount() {
        this.getFactures(0,5);
        this.getTotalPages(0,5);
    }


    setPage(page) {
        this.setState({ pageNav : page })
        this.getFactures(page,5);
        this.getTotalPages(page,5);
    }

  render() {
    return (
      <div>
        <MouvementFournisseurNavbar/>
        <h1>Liste des factures fournisseur</h1>
        <div className='content'>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell ><b>Factures</b></TableCell>
                            <TableCell ></TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.factures.map(facture => (
                        <TableRow key={facture[0]}>
                            <TableCell>
                                {"Facture Réception "+facture[1]}
                            </TableCell>
                            <TableCell>
                                <Link to={'/transactions/mvFour/facturation/print/'+facture[0]} >
                                    <VisibilityIcon color="primary"/>
                                </Link>
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

        </div>
      </div>
    )
  }
}
