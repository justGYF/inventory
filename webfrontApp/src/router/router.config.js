import Hello from '@/view/hello'
import DrawTable from '@/view/drawTable'
import PrintTable from '@/view/printTable'
// import Login from '@/view/login'

const routerMenuConfig = [
    { 
        path: '/',
        redirect: '/hello'
    },
    // { 
    //     path: '/login',
    //     name: 'login',
    //     component: Login
    // },
    {
        path: '/hello',
        name: 'Hello',
        component: Hello
    },
    {
        path: '/drawTable',
        name: 'drawTable',
        component: DrawTable
    },
    {
        path: '/printTable',
        name: 'printTable',
        component: PrintTable
    }
]
export { routerMenuConfig }