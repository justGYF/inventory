import Hello from '@/view/hello'
import DrawTable from '@/view/drawTable'
import PrintTable from '@/view/printTable'

const routerMenuConfig = [
    { 
        path: '/',
        redirect: '/hello'
    },
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