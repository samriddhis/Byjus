
  
import { createDrawerNavigator} from "react-navigation";
import HomeComponent from "./src/HomeComponent";
import AddUserAccount from "./src/AddUserAccount";
import DrawerComponent from "./src/DrawerComponent/DrawerComponent";

const drawerNav = createDrawerNavigator(
  {
    HomeScreen: HomeComponent,
    MyAccScreen:AddUserAccount,
  },
  {
    contentComponent :DrawerComponent,
    drawerWidth: 300
  }
);

export default drawerNav