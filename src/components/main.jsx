import { useState, useEffect } from 'react';
import axios from "axios";
// componente
export default function Main() {
    const initialFormData = {
        name: "",
        autore: "",
        description: "",
        categoria: "",
        available: false,
    };

    // stato dei articoli
    const [articoliWeb, setArticoliWeb] = useState([]);

    // stato del imput del articolo
    const [nuovoArticolo, setNuovoArticolo] = useState(initialFormData);

    // funzione di gestione chiamata all'API
    function fetchPizzas() {
        axios.get("http://localhost:3000/piatti/")
            .then((res) =>
                setArticoliWeb(res.data)
                // console.log(res.data)
            )
    }

    // richiamo la funzione di richiesta dati al caricamento del componente
    // fetchPizzas();
    // Solo al primo rendering
    useEffect(fetchPizzas, []);

   // funzione di gestione delle info dei campi
   function handlenuovoArticolo(e) {
        // gestione del value a seconda del tipo di input
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        // setta tramite setState l'oggetto con le info prese dai campi del form
        setNuovoArticolo((currentFormData) => ({
            ...currentFormData,
            [e.target.name]: value,
        }));
   }

       // funzione di gestione dell'invio dell'intero form (tuue le info dei vari campi)
    function handleSubmit(e) {
        e.preventDefault();
        setArticoliWeb((currentMenu) => [...currentMenu, {
            id:
                currentMenu.length === 0 ? 1 : currentMenu[currentMenu.length - 1].id + 1,
            ...nuovoArticolo
        }]);
        // resetto il form
        setNuovoArticolo(initialFormData);
    }
    // funzione gestione cancellazione articolo
    function deleteArticolo(idArticolo) {
        // creiamo il nuovo array da sostituire allo state articolo
        const updateArticle = articoliWeb.filter((articolo) => {
            return articolo.id !== idArticolo;
        })
        // lo sostituiamo
        setArticoliWeb(updateArticle);
    }
    return (
        <> 
        <h1>Questo e il form deli articoli</h1>

<form id='formarticolo' action="#" onSubmit={handleSubmit}>
    {/* valore nome articolo */}
    <input
        type="text"
        name="name"
        onChange={handlenuovoArticolo}
        value={nuovoArticolo.name}
        placeholder='Nome autore'
    />
    {/* valore autore */}
    <input
        type="text"
        name="autore"
        onChange={handlenuovoArticolo}
        value={nuovoArticolo.autore}
        placeholder='autore'
    />
    {/* valore descrizione */}
    <textarea
        name="description"
        onChange={handlenuovoArticolo}
        value={nuovoArticolo.description}
        placeholder='Descrizione autore'
    ></textarea>
    {/* valore categoria */}
    <input
        type="text"
        name="categoria"
        onChange={handlenuovoArticolo}
        value={nuovoArticolo.categoria}
        placeholder='Categoria'
    />
    {/* valore disponibilità */}
    <label htmlFor="available">Disponibile</label>
    <input
        type="checkbox"
        name="available"
        checked={nuovoArticolo.available}
        onChange={handlenuovoArticolo}
        id="available"
    />
    {/* bottone di invio info */}
    <button>Aggiungi</button>
</form>

{
    articoliWeb.map((articolo) => (
        <div className='articoloItem' key={articolo.id}>
            <h2>{articolo.title}</h2>
            <p>{articolo.content}</p>
            <img src={articolo.image} alt={articolo.title} />
            <p>{articolo.tags.join(", ")}</p>
            {/* <span className='categoria'>{articolo.categoria} </span>
            <span className='available'>{articolo.available ? "articolo disponibile" : "articolo non disponibile"}</span> */}
            <br />
            <button onClick={() => deleteArticolo(articolo.id)}>
                Cancella
            </button>
        </div>
    ))
}
        </>
    )
}