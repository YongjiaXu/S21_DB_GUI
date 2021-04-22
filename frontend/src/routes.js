import { LoginPage } from './app/loginPage';
import { CreateAccount } from './app/createAccount';
import { NPODashboard} from './app/NPODashboard';
import { NPOProfile } from './app/NPOProfile';
import {UserDash} from './app/userDash';

export const ROUTES = [
    
    {path: '/CreateAccount', component: CreateAccount},
    {path: '/NPODashboard/:id', component: NPODashboard},
    {path: '/NPOProfile/:id', component: NPOProfile},
    {path: '/UserDash/:id', component: UserDash},
    {path: '/', component: LoginPage}
]