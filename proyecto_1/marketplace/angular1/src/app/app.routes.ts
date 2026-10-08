import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page';
import { UserPage } from './components/user-page/user-page';
import { RegistryPage } from './components/registry-page/registry-page';
import { FilterPage } from './components/filter-page/filter-page';

export const routes: Routes = [/* exporta una constante llamada 'routes' que no se cambia, esa es tipo ts, un tipo de array donde cada objeto describe una ruta*/
    {path: '',/* path es un objeto dque descirbe una ruta y las comiolas son la raiz del sitio */
     redirectTo: 'home',/*es par decir que no es lo mismo que el link anterior, home simplemente cambia la url */ 
    pathMatch:'full'},     /*le dice a angula cómo va a compara la url con path */

    {path: 'home', component: HomePage}, /*component funciona para decir a dónde va a air */

    {path: 'user', component: UserPage}, /* component funciona para decir a dónde va a air*/

    {path: 'registry', component: RegistryPage},/* component funciona para decir a dónde va a air*/

    {path: 'filter', component: FilterPage},/* component funciona para decir a dónde va a air*/

    {path: '**', redirectTo: 'home'} /* manda url a home-page*/

];
