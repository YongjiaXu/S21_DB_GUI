import { LoginPage } from './app/loginPage';
import { CreateAccount } from './app/createAccount';
import { NPODashboard} from './app/NPODashboard';
import { NPOProfile } from './app/NPOProfile';
import {UserDash} from './app/userDash';
import {AdminDash} from './app/adminDash';
import {NewUser} from './app/newUser';
import { DeletedAccount } from './app/deletedAccount';

export const ROUTES = [
    
    {path: '/register', component: CreateAccount},
    {path: '/NPODashboard/:id', component: NPODashboard},
    {path: '/NPOProfile/:id', component: NPOProfile},
    {path: '/UserDash/:id', component: UserDash},
    {path: '/AdminDash', component: AdminDash},
    {path: '/newUser', component: NewUser},
    {path: '/deleted', component: DeletedAccount},
    {path: '/', component: LoginPage}
]