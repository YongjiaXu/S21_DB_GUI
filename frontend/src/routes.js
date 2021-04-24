import { LoginPage } from './app/loginPage';
import { CreateAccount } from './app/createAccount';
import { NPODashboard} from './app/NPODashboard';
import { NPOProfile } from './app/NPOProfile';
import {UserDash} from './app/userDash';
import {AdminDash} from './app/adminDash';
import {NewUser} from './app/newUser';
import Homepage from './app/homepage';
import { DeletedAccount } from './app/deletedAccount';

export const ROUTES = [
    
    {path: '/register', component: CreateAccount},
    {path: '/NPODashboard/:id', component: NPODashboard},
    {path: '/NPOProfile/:id', component: NPOProfile},
    {path: '/UserDash/:id', component: UserDash},
    {path: '/AdminDash', component: AdminDash},
    {path: '/Home', component: Homepage},
    {path: '/newUser', component: NewUser},
    {path: '/deleted', component: DeletedAccount},
    {path: '/', component: LoginPage}
    
]