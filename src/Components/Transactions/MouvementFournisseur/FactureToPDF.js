import React , {useState , useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../../../App.css'
import ReactPDF, { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import PrintIcon from '@mui/icons-material/Print';
import Button from "@mui/material/Button"

import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const headStyle = {backgroundColor : "#2084c4",border: "1px", borderStyle: "solid"} 
const cellStyle = {border: "1px", borderStyle: "solid"}
const tableStyle = {marginTop: "50px" , marginRight : "20px" , marginLeft : "100px" , width:"1000px" , align:"center"}

export default function FactureToPDF() {

    let { ligneFactureID } = useParams();

    const [factureInfo,setFactureInfo] = useState([])

    const downloadPDF=()=> {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p','pt');
            pdf.addImage(imgData, 'PNG', 0 , 0);
            pdf.save("reception.pdf");
        })
    }

    const getFactureInfo=()=> {
        axios.get(`http://localhost:8080/factureInfo/${ligneFactureID}`)
        .then(function (response) {
            console.log(response.data)
            setFactureInfo(response.data)            
        })
        console.log("Data : "+factureInfo[0])
    }

    useEffect(() => {
        getFactureInfo();
    });

    // Create styles
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });

  return (
    <div className='factureContent'>
        <Button variant="outlined" onClick={()=>downloadPDF()} startIcon={<PrintIcon color="primary"/>}>
            Imprimer
        </Button>   
        <div id="divToPrint">
            <p className='title'>Bon de réception</p>
            <TableContainer component={Paper} className="tableFacture">
                <Table sx={{ minWidth: 600 }} aria-label="customized table">
                    <TableBody>
                        <TableRow>
                            <TableCell style={headStyle}><b>N° de réception</b></TableCell>
                            <TableCell style={cellStyle}>{factureInfo[0]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={headStyle}><b>Réference de réception</b></TableCell>
                            <TableCell style={cellStyle} >{factureInfo[1]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={headStyle}><b>Fournisseur</b></TableCell>
                            <TableCell style={cellStyle} >{factureInfo[2]}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer component={Paper} className="tableFacture">
                <Table sx={{ minWidth: 600 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={headStyle}><b>Code du produit</b></TableCell>
                            <TableCell style={headStyle}><b>Nom du produit</b></TableCell>
                            <TableCell style={headStyle}><b>Couleur</b></TableCell>
                            <TableCell style={headStyle}><b>Taille</b></TableCell>
                            <TableCell style={headStyle}><b>Quantité</b></TableCell>
                            <TableCell style={headStyle}><b>Prix unitaire</b></TableCell>
                            <TableCell style={headStyle}><b>Total</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                            <TableCell style={cellStyle}>{factureInfo[3]}</TableCell>
                            <TableCell style={cellStyle}>{factureInfo[4]}</TableCell>
                            <TableCell style={cellStyle}>{factureInfo[5]}</TableCell>
                            <TableCell style={cellStyle}>{factureInfo[6]}</TableCell>
                            <TableCell style={cellStyle}>{factureInfo[7]}</TableCell>
                            <TableCell style={cellStyle}>{factureInfo[8]}</TableCell>
                            <TableCell style={cellStyle}>{factureInfo[9]}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div className='footerFacture'>
                <u>Adresse</u> : {factureInfo[10]}<br></br>
                <u>Numéro de téléphone</u> : {factureInfo[11]}<br></br>
                <u>Email</u> : {factureInfo[12]}<br></br>                
            </div>
        </div>
    </div>
  )
}
