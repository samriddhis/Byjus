import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./Component.style";
import { NavigationActions, DrawerActions } from "react-navigation";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";

class DrawerComponent extends Component {
  constructor(props) {
    super(props);
  }
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  };

  _pressLogout() {
    // this.navigateToScreen("LoginScreen")
    this.props.navigation.navigate("LoginScreen");
  }
  isEmpty(val) {
    if (val == "") {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity style={styles.ProfilePicStyle}>
            <Icon type="font-awesome" name="user-circle-o" size={20} />
            <Text style={styles.ProfileTextStyle}>
              Hello
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.NavHeaderStyle}
            onPress={this.navigateToScreen("HomeScreen")}
          >
            <Icon type="simple-line-icon" name="home" size={20} />
            <Text style={styles.NavHeaderTextStyle}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.NavHeaderStyle}
            onPress={this.navigateToScreen("MyAccScreen")}
          >
            <Icon
              type="antdesign"
              name="adduser"
              size={23}
            />
            <Text style={styles.NavHeaderTextStyle}>Add User</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

DrawerComponent.propTypes = {
  navigation: PropTypes.object
};

function mapStateToProps(state) {
  return {
   //
  };
}

export default connect(mapStateToProps)(DrawerComponent);
