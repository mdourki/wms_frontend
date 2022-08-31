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

const tableStyle = { width : "900px" , overflow: "auto" }

export default class ListProduit extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            produits : [] ,
            produitID : '' ,
            totalPages : 0 ,
            pages : [] ,
            pageNav : 0 ,
        }
    }

    getTotalPages = (page,size) => {
        axios.get('http://localhost:8080/produits/totalPages/'+page+'/'+size)
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

    getProduits = (page , size) => {
        axios.get('http://localhost:8080/produits/'+page+'/'+size)
        .then(response => {
            this.setState({
                produits: response.data
            })
        })
    }

    componentDidMount() {
        this.getProduits(0,4);
        this.getTotalPages(0,4);
    }


    setPage(page) {
        this.setState({ pageNav : page })
        this.getProduits(page,4);
        this.getTotalPages(page,4);
    }

  render() {
    return (
      <div>
        <ReportingReferentielNavbar/>
        <h1>Liste produits</h1>
        <div className='content'>

            <Link to='/reporting/referentiel/listPrdts/New' className='nav-links'>
                <Button color="success" variant="outlined" style={buttonStyle}>Ajouter un produit</Button>
            </Link>

            <TableContainer component={Paper} className='table' style={tableStyle}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>                            
                            <TableCell ><b>Code</b></TableCell>
                            <TableCell ><b>Nom</b></TableCell>
                            <TableCell ><b>Code barre</b></TableCell>
                            <TableCell ><b>Désignation</b></TableCell>
                            <TableCell ><b>Libelle ticket</b></TableCell>
                            <TableCell ><b>Couleur</b></TableCell>
                            <TableCell ><b>Taille</b></TableCell>
                            <TableCell ><b>Collection</b></TableCell>
                            <TableCell ><b>Style</b></TableCell>
                            <TableCell ><b>Famille</b></TableCell>
                            <TableCell ><b>TVA</b></TableCell>
                            <TableCell ><b>Prix unitaire</b></TableCell>
                            <TableCell ><b>Prix hors taxes</b></TableCell>
                            <TableCell ><b>Prix toute taxe comprise</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.produits.map(produit => (
                        <TableRow key={produit[0]} >
                            
                            <TableCell>
                                {produit[1]}
                            </TableCell>
                            <TableCell>
                                {produit[2]}
                            </TableCell>
                            <TableCell>
                                {produit[3]}
                            </TableCell>
                            <TableCell>
                                {produit[4]}
                            </TableCell>
                            <TableCell>
                                {produit[5]}
                            </TableCell>
                            <TableCell>
                                {produit[9]}
                            </TableCell>
                            <TableCell>
                                {produit[10]}
                            </TableCell>
                            <TableCell>
                                {produit[11]}
                            </TableCell>
                            <TableCell>
                                {produit[12]}
                            </TableCell>
                            <TableCell>
                                {produit[13]}
                            </TableCell>
                            <TableCell>
                                {produit[14]}
                            </TableCell>
                            <TableCell>
                                {produit[6]}
                            </TableCell>
                            <TableCell>
                                {produit[7]}
                            </TableCell>
                            <TableCell>
                                {produit[8]}
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
