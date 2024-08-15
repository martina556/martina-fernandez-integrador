/* import "./style.css"; */
import './sass/main.scss';
import './sass/pages/_nosotros.scss';
import './sass/pages/_contacto.scss';
import './sass/layout/_header.scss';
import './sass/layout/_footer.scss';
import Handlebars from 'handlebars';

const start = async () => {
  try {
    const respuesta = await fetch('templates/card.hbs');
    if (!respuesta.ok) {
      throw new Error('No se pudo cargar el template');
    }

    const plantilla = await respuesta.text();

    //console.log(plantilla);

    const template = Handlebars.compile(plantilla);

    const respuestaBack = await fetch(
      'https://66a84e8053c13f22a3d24aac.mockapi.io/productos/productos/',
    );
    //console.log(respuestaBack);
    if (!respuestaBack.ok) {
      throw new Error('No se pudo cargar los productos', respuestaBack.status);
    }

    const dataProductos = await respuestaBack.json();
    //console.log(dataProductos);
    const data = {
      productos: dataProductos,
    };
    console.log(data);
    const html = template(data);
    //console.log(html);
    const contenedorCards = document.querySelector('.cards-container');
    //console.log(contenedor);
    contenedorCards.innerHTML = html;
  } catch (error) {
    console.error('Error al cargar el template', error);
  }
};
window.addEventListener('DOMContentLoaded', start);
