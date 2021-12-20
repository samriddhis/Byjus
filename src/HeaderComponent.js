import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Icon } from "react-native-elements";

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTitle: this.props.headerTitle,
      withBack: this.props.withBack
    };
  }
  _openMenu() {
    navVar.openDrawer();
  }
  _closeFilter() {
    navVar.goBack();
  }
  render() {
    return (
      <View style={Styles.OuterContainer}>
        {this.state.withBack ? (
          <TouchableOpacity
            onPress={() => this._closeFilter()}
            style={Styles.IconViewStyle}
          >
            <Icon name="arrow-back" type="material" color="#fff" size={35} underlayColor="transparent" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => this._openMenu()}
            style={Styles.IconViewStyle}
          >
            <Icon name="menu" type="ionicons" color="#fff" size={20} underlayColor="transparent" />
          </TouchableOpacity>
        )}

        <View style={Styles.TitleViewStyle}>
          <Text style={Styles.TitleStyle}>{this.state.headerTitle}</Text>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  OuterContainer: {
    height: 50,
    width: width,
    backgroundColor: "#AEB6BF",
    flexDirection: "row",
    padding: 8,
    elevation: 10
  },
  IconViewStyle: {
    flex: 0.1,
    justifyContent:"center",
    alignItems:"center"
  },
  TitleViewStyle: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center"
  },
  TitleStyle: {
    fontSize: 22,
    color: "#fff"
  }
});
