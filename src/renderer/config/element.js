import Vue from 'vue'
import {
    Row,
    Col,
    Select,
    Option,
    Button,
    MenuItem,
    Submenu,
    MenuItemGroup,
    Menu,
    Form,
    FormItem,
    Input,
    Table,
    TableColumn,
    DatePicker,
    Loading,
    Pagination,
    Tag,
    Popover,
    Dialog,
    Tree,
    Card,
    Tabs,
    TabPane,
    Notification,
    MessageBox,Badge,  Message , Radio , RadioGroup , RadioButton
} from 'element-ui'

let elItemArr = [
    Row,
    Col,
    Select,
    Option,
    Button,
    MenuItem,
    Submenu,
    MenuItemGroup,
    Menu,
    Form,
    FormItem,
    Input,
    Table,
    TableColumn,
    DatePicker,
    Loading,
    Pagination,
    Tag,
    Popover,
    Dialog,
    Tree,
    Card,
    Tabs,
    TabPane,
    Badge,
    Radio,
    RadioGroup,
    RadioButton
]

elItemArr.forEach((v, k) => {
    Vue.use(v)
})
Vue.prototype.$notify = Notification
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;