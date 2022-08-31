import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Menu from './Components/Menu/Menu';
import Dossiers from './Components/Dossiers/Dossiers'
import DossiersReferentiel from './Components/Dossiers/Referentiel/DossiersReferentiel';
import DossiersCategories from './Components/Dossiers/Categories/DossiersCategories';
import Transactions from './Components/Transactions/Transactions';
import Inventaires from './Components/Transactions/Inventaires/Inventaires';
import Reporting from './Components/Reporting/Reporting';
import ReportingReferentiel from './Components/Reporting/Referentiel/ReportingReferentiel'
import NewCategorieClient from './Components/Dossiers/Categories/Client/NewCategorieClient';
import ListCategoriesClient from './Components/Dossiers/Categories/Client/ListCategoriesClient';
import EditCategorieClient from './Components/Dossiers/Categories/Client/EditCategorieClient';
import NewCategorieFournisseur from './Components/Dossiers/Categories/Fournisseur/NewCategorieFournisseur';
import ListCategoriesFournisseur from './Components/Dossiers/Categories/Fournisseur/ListCategoriesFournisseur';
import EditCategorieFournisseur from './Components/Dossiers/Categories/Fournisseur/EditCategorieFournisseur';
import NewFamille from './Components/Dossiers/Referentiel/Famille/NewFamille';
import EditFamille from './Components/Dossiers/Referentiel/Famille/EditFamille';
import ListFamilles from './Components/Dossiers/Referentiel/Famille/ListFamilles';
import NewCollection from './Components/Dossiers/Referentiel/Collections/NewCollection';
import EditCollection from './Components/Dossiers/Referentiel/Collections/EditCollection';
import ListCollections from './Components/Dossiers/Referentiel/Collections/ListCollections';
import NewStyle from './Components/Dossiers/Referentiel/Style/NewStyle';
import EditStyle from './Components/Dossiers/Referentiel/Style/EditStyle';
import ListStyles from './Components/Dossiers/Referentiel/Style/ListStyles';
import NewTVA from './Components/Dossiers/Referentiel/TVA/NewTVA';
import EditTVA from './Components/Dossiers/Referentiel/TVA/EditTVA';
import ListTVA from './Components/Dossiers/Referentiel/TVA/ListTVA';
import NewTaille from './Components/Dossiers/Referentiel/Taille/NewTaille';
import EditTaille from './Components/Dossiers/Referentiel/Taille/EditTaille';
import ListTaille from './Components/Dossiers/Referentiel/Taille/ListTaille';
import NewCouleur from './Components/Dossiers/Referentiel/Couleur/NewCouleur';
import EditCouleur from './Components/Dossiers/Referentiel/Couleur/EditCouleur';
import ListCouleur from './Components/Dossiers/Referentiel/Couleur/ListCouleur';
import NewDepot from './Components/Dossiers/Referentiel/Depot/NewDepot';
import EditDepot from './Components/Dossiers/Referentiel/Depot/EditDepot';
import ListDepot from './Components/Dossiers/Referentiel/Depot/ListDepot';
import ListEmplacement from './Components/Dossiers/Referentiel/Emplacement/ListEmplacement';
import NewEmplacement from './Components/Dossiers/Referentiel/Emplacement/NewEmplacement';
import EditEmplacement from './Components/Dossiers/Referentiel/Emplacement/EditEmplacement';
import ListClient from './Components/Dossiers/Client/ListClient';
import NewClient from './Components/Dossiers/Client/NewClient';
import EditClient from './Components/Dossiers/Client/EditClient';
import ListFournisseur from './Components/Dossiers/Fournisseur/ListFournisseur';
import NewFournisseur from './Components/Dossiers/Fournisseur/NewFournisseur';
import EditFournisseur from './Components/Dossiers/Fournisseur/EditFournisseur';
import RefListEmplacements from './Components/Reporting/Referentiel/Emplacement/RefListEmplacements';
import NewProduit from './Components/Reporting/Referentiel/Produit/NewProduit';
import ListProduit from './Components/Reporting/Referentiel/Produit/ListProduit';
import NewPalette from './Components/Reporting/Referentiel/Palette/NewPalette';
import ListPalettes from './Components/Reporting/Referentiel/Palette/ListPalettes';
import ListProduitFamille from './Components/Reporting/Referentiel/Produit/ListProduitFamille';
import NewCommande from './Components/Transactions/MouvementFournisseur/NewCommande';
import NewRecepFour from './Components/Transactions/MouvementFournisseur/NewRecepFour';
import ListFactures from './Components/Transactions/MouvementFournisseur/ListFactures';
import MouvementFournisseur from './Components/Transactions/MouvementFournisseur/MouvementFournisseur';
import FactureToPDF from './Components/Transactions/MouvementFournisseur/FactureToPDF';
import MouvementClient from './Components/Transactions/MouvementClient/MouvementClient';
import NewCommandeClt from './Components/Transactions/MouvementClient/NewCommandeClt';
import ListCommandesClt from './Components/Transactions/MouvementClient/ListCommandesClt';
import ListFacturesClt from './Components/Transactions/MouvementClient/ListFacturesClt';
import FactureCltToPDF from './Components/Transactions/MouvementClient/FactureCltToPDF';
import ListProduitFournisseur from './Components/Reporting/Referentiel/Produit/ListProduitFournisseur';
import ListProduitClients from './Components/Reporting/Referentiel/Produit/ListProduitClients';
import StockGlobal from './Components/Reporting/StockGlobal';
import StockDepot from './Components/Reporting/StockDepot';
import StockFamille from './Components/Reporting/StockFamille';
import StockFournisseur from './Components/Reporting/StockFournisseur';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Menu/>} />
        <Route path='/dossiers' exact element={<Dossiers/>} />
        <Route path='/dossiers/referentiel' exact element={<DossiersReferentiel/>} />
        <Route path='/dossiers/categories' exact element={<DossiersCategories/>} />
        <Route path='/transactions' exact element={<Transactions/>} /> 
        <Route path='/transactions/inventaires' exact element={<Inventaires/>} />
        <Route path='/reporting' exact element={<Reporting/>} />
        <Route path='/reporting/referentiel' exact element={<ReportingReferentiel/>} />
                                    {/* Catégorie Client */}
        <Route path='/dossiers/categories/categoriesClts' exact element={<ListCategoriesClient/>} />
        <Route path='/dossiers/categories/categoriesClts/New' exact element={<NewCategorieClient/>} />
        <Route path='/dossiers/categories/categoriesClts/edit/:categorie' exact element={<EditCategorieClient/>} />
                                  {/* Catégorie Fournisseur */}
        <Route path='/dossiers/categories/categoriesFour' exact element={<ListCategoriesFournisseur/>} />
        <Route path='/dossiers/categories/categoriesFour/New' exact element={<NewCategorieFournisseur/>} />
        <Route path='/dossiers/categories/categoriesFour/edit/:categorie' exact element={<EditCategorieFournisseur/>} />
                                        {/* Familles */}
        <Route path='/dossiers/referentiel/familles' exact element={<ListFamilles/>} />
        <Route path='/dossiers/referentiel/familles/New' exact element={<NewFamille/>} />
        <Route path='/dossiers/referentiel/familles/edit/:famille' exact element={<EditFamille/>} />
                                        {/* Collections */}
        <Route path='/dossiers/referentiel/collections' exact element={<ListCollections/>} />
        <Route path='/dossiers/referentiel/collections/New' exact element={<NewCollection/>} />
        <Route path='/dossiers/referentiel/collections/edit/:collection' exact element={<EditCollection/>} />
                                          {/* Styles */}
        <Route path='/dossiers/referentiel/styles' exact element={<ListStyles/>} />
        <Route path='/dossiers/referentiel/styles/New' exact element={<NewStyle/>} />
        <Route path='/dossiers/referentiel/styles/edit/:style' exact element={<EditStyle/>} />
                                            {/* TVA */}
        <Route path='/dossiers/referentiel/tva' exact element={<ListTVA/>} />
        <Route path='/dossiers/referentiel/tva/New' exact element={<NewTVA/>} />
        <Route path='/dossiers/referentiel/tva/edit/:taux' exact element={<EditTVA/>} />
                                          {/* Tailles */}
        <Route path='/dossiers/referentiel/tailles' exact element={<ListTaille/>} />
        <Route path='/dossiers/referentiel/tailles/New' exact element={<NewTaille/>} />
        <Route path='/dossiers/referentiel/tailles/edit/:codeTaille/:nomTaille' exact element={<EditTaille/>} />
                                          {/* Couleurs */}
        <Route path='/dossiers/referentiel/couleurs' exact element={<ListCouleur/>} />
        <Route path='/dossiers/referentiel/couleurs/New' exact element={<NewCouleur/>} />
        <Route path='/dossiers/referentiel/couleurs/edit/:codeCouleur/:nomCouleur' exact element={<EditCouleur/>} />
                                            {/* Depots */}
        <Route path='/dossiers/referentiel/depots' exact element={<ListDepot/>} />
        <Route path='/dossiers/referentiel/depots/New' exact element={<NewDepot/>} />
        <Route path='/dossiers/referentiel/depots/edit/:libelleDepot/:adrssDepot' exact element={<EditDepot/>} />
                                          {/* Emplacements */}
        <Route path='/dossiers/referentiel/emplacements' exact element={<ListEmplacement/>} />
        <Route path='/dossiers/referentiel/emplacements/New' exact element={<NewEmplacement/>} />
        <Route path='/dossiers/referentiel/emplacements/edit/:emplacementID/:emplacementAllee/:emplacementNivHoriz/:emplacementNivVerti/:emplacementDepotLibelle' 
        exact element={<EditEmplacement/>} />
        <Route path='/reporting/referentiel/listEmplacements' exact element={<RefListEmplacements/>} />
                                          {/* Clients */}
        <Route path='/dossiers/clients' exact element={<ListClient/>} />
        <Route path='/dossiers/clients/New' exact element={<NewClient/>} />
        <Route path='/dossiers/clients/edit/:clientID/:clientNom/:clientAdrss/:clientNumTel/:clientEmail/:clientCatNom' 
        exact element={<EditClient/>} />
                                        {/* Fournisseurs */}
        <Route path='/dossiers/fournisseurs' exact element={<ListFournisseur/>} />
        <Route path='/dossiers/fournisseurs/New' exact element={<NewFournisseur/>} />
        <Route path='/dossiers/fournisseurs/edit/:fournisseurID/:fournisseurNom/:fournisseurAdrss/:fournisseurNumTel/:fournisseurEmail/:fournisseurCatNom' 
        exact element={<EditFournisseur/>} />
                                          {/* Produits */}
        <Route path='/reporting/referentiel/listPrdts' exact element={<ListProduit/>} />
        <Route path='/reporting/referentiel/listPrdtsParFam' exact element={<ListProduitFamille/>} />
        <Route path='/reporting/referentiel/listPrdtsParFour' exact element={<ListProduitFournisseur/>} />
        <Route path='/reporting/referentiel/listPrdtsParClt' exact element={<ListProduitClients/>} />
        <Route path='/reporting/referentiel/listPrdts/New' exact element={<NewProduit/>} />
                                          {/* Palettes */}
        <Route path='/reporting/referentiel/listPalettes' exact element={<ListPalettes/>} />
        <Route path='/reporting/referentiel/listPalettes/New' exact element={<NewPalette/>} />
                                    {/* Mouvement fournisseur */}
        <Route path='/transactions/mvFour' exact element={<MouvementFournisseur/>} />
        <Route path='/transactions/mvFour/commande' exact element={<NewCommande/>} />
        <Route path='/transactions/mvFour/reception' exact element={<NewRecepFour/>} />
        <Route path='/transactions/mvFour/facturation' exact element={<ListFactures/>} />
        <Route path='/transactions/mvFour/facturation/print/:ligneFactureID' exact element={<FactureToPDF/>} />
                                    {/* Mouvement client */}
        <Route path='/transactions/mvClt' exact element={<MouvementClient/>} />
        <Route path='/transactions/mvClt/commande' exact element={<NewCommandeClt/>} />
        <Route path='/transactions/mvClt/livraison' exact element={<ListCommandesClt/>} />
        <Route path='/transactions/mvClt/facturation' exact element={<ListFacturesClt/>} />
        <Route path='/transactions/mvClt/facturation/print/:ligneFactureID' exact element={<FactureCltToPDF/>} />
                                          {/* Reporting */}
        <Route path='/reporting/stockGlob' exact element={<StockGlobal/>} />
        <Route path='/reporting/stockDepots' exact element={<StockDepot/>} />
        <Route path='/reporting/stockFamilles' exact element={<StockFamille/>} />
        <Route path='/reporting/stockFournisseurs' exact element={<StockFournisseur/>} />
      </Routes>
    </Router>
  );
}

export default App;
