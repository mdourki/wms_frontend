import React , {Component }from 'react'
import ReportingReferentielNavbar from '../ReportingReferentielNavbar';
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

const buttonStyle = {  marginBottom: "10px" }

const buttonPageStyle = {  marginTop: "10px" , marginRight : "5px" }

export default class ListProduitFournisseur extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            fournisseurs : [] ,
            fournisseurID : '' ,
            totalPages : 0 ,
            pages : [] ,
            pageNav : 0 ,
        }
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
        axios.get('http://localhost:8080/fournisseursPrdts/'+page+'/'+size)
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


    setPage(page) {
        this.setState({ pageNav : page })
        this.getFournisseurs(page,5);
        this.getTotalPages(page,5);
    }

  render() {
    return (
      <div>
        <ReportingReferentielNavbar/>
        <h1>Liste des produits par fournisseurs</h1>
        <div className='content'>
            <Link to='/reporting/referentiel/listPrdts/New' className='nav-links'>
                <Button color="success" variant="outlined" style={buttonStyle}>Ajouter un produit</Button>
            </Link>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>                            
                            <TableCell ><b>Fournisseur</b></TableCell>
                            <TableCell ><b>Produit</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.fournisseurs.map(fournisseur => (
                        <TableRow key={fournisseur[0]} >
                            <TableCell>
                                {fournisseur[0]}
                            </TableCell>
                            <TableCell>
                                {fournisseur[1]}
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
