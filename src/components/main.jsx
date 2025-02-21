import { useState, useEffect } from 'react';
import axios from "axios";
// componente
export default function Main() {
    const initialnuovoArticolo = {
        title: "",
        content: "",
        image: "",
        tags: [],
    };

    // stato dei piatti
    const [articoliWeb, setArticoliWeb] = useState([]);

    // stato del imput del piatto
    const [nuovoArticolo, setNuovoArticolo] = useState(initialnuovoArticolo);

    // funzione di gestione chiamata all'API
    function fetchPiatti() {
        axios.get("http://localhost:3000/piatti/")
            .then((res) =>
                setArticoliWeb(res.data)
            )
    }

    // Solo al primo rendering
    useEffect(fetchPiatti, []);

   // funzione di gestione delle info dei campi
   function handlenuovoArticolo(e) {
       // gestione del value a seconda del tipo di input
       const value = e.target.name === "tags" ? e.target.value.split(",") : e.target.value;

       // setta tramite setState l'oggetto con le info prese dai campi del form
       setNuovoArticolo((currentNuovoArticolo) => ({
           ...currentNuovoArticolo,
           [e.target.name]: value,
        }));
   }

       // funzione di gestione dell'invio dell'intero form (tuue le info dei vari campi)
    function handleSubmit(e) {
        // chiamata verso la API in post con invio dati nuovo piatto
        axios.post("http://localhost:3000/piatti/", nuovoArticolo)
            .then(res => {
                // uso la risposta dell'API per creare il nuovo array menu
                setArticoliWeb((currentArticoliWeb) => [...currentArticoliWeb, res.data])
            }
            )
            .catch(err => console.log(err))
        // resetto il form
        setNuovoArticolo(initialnuovoArticolo);
    }
    // funzione gestione cancellazione articolo
    function deleteArticolo(idArticolo) {
        // creiamo il nuovo array da sostituire allo state articolo
        const updateArticle = articoliWeb.filter((articolo) => {
            return articolo.id !== idArticolo;
        })
        // chiamata ad API sulla rotta di delete
        axios.delete(`http://localhost:3000/piatti/${idArticolo}`)
            .then(res =>
                console.log(res),
                // lo sostituiamo anche nel FE
                setArticoliWeb(updateArticle)
            )
            .catch(err => console.log(err))
    }
    return (
        <> 
        <h1>Questo e il form deli articoli</h1>

<form id='formarticolo' action="#" onSubmit={handleSubmit}>
    {/* valore nome piatto */}
    <input
        type="text"
        name="title"
        onChange={handlenuovoArticolo}
        value={nuovoArticolo.title}
        placeholder='Nome piatto'
    />
     {/* valore descrizione */}
     <textarea
        name="content"
        onChange={handlenuovoArticolo}
        value={nuovoArticolo.content}
        placeholder='Descrizione piatto'
    ></textarea>
    {/* valore immagine */}
    <input
        type="text"
        name="image"
        onChange={handlenuovoArticolo}
        value={nuovoArticolo.image}
        placeholder='URL immagina'
    />
   
    {/* valore ingredienti */}
    <input
        type="text"
        name="tags"
        onChange={handlenuovoArticolo}
        value={nuovoArticolo.tags}
        placeholder='Ingredienti piatto'
    />
 
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