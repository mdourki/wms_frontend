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

export default class RefListEmplacements extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            emplacements : [] ,
            emplacementID : '' ,
            totalPages : 0 ,
            pages : [] ,
            pageNav : 0 ,
        }
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
        <ReportingReferentielNavbar/>
        <h1>Liste Emplacements</h1>
        <div className='content'>

            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>                            
                            <TableCell ><b>Allée</b></TableCell>
                            <TableCell ><b>Niveau horizontal</b></TableCell>
                            <TableCell ><b>Niveau vertical</b></TableCell>
                            <TableCell ><b>Dépôt</b></TableCell>
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
