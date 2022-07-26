import './style/index.scss'; // Attention ici, il faut bien mettre l'extension `.scss`
import 'bootstrap';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import {routes} from './routes'

const callRoute = () => {
   const { hash } = window.location;
   const pathParts = hash.substring(1).split('/');
 
   const pageName = pathParts[0];
   const pageArgument = pathParts[1] || '';
   const pageFunction = routes[pageName];
 
   if (pageFunction !== undefined) {
     pageFunction(pageArgument);
   }
 };
 
 window.addEventListener('hashchange', () => callRoute());
 window.addEventListener('DOMContentLoaded', () => callRoute());

