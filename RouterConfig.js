import { createStackNavigator } from 'react-navigation';

import HomeComponent from './app/components/HomeComponent'
import AddUserComponent from './app/components/AddUserComponent'

const StackNav = createStackNavigator({
    HomeScreen:{
        screen: HomeComponent,
        navigationOptions: ({ navigation }) => ({
            title: `Home`,
        }),
    },
    AddUserScreen:{
        screen: AddUserComponent,
        navigationOptions: ({ navigation }) => ({
            title: `User Details`,
        }),
    }
});

export default StackNav;
