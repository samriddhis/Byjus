import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native";
import HeaderComponent from "./HeaderComponent";
const { height, width } = Dimensions.get("window");
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import ShimmerComponent from "./ShimmerComponent";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      listValue: props.cartValue,
      countVal: 0,
      showSpinner: false
    };
    navVar = this.props.navigation;
  }
  componentDidMount() {
    this.getStoredCartValue("CART_VALUE");
  }
  getStoredCartValue = async key => {
    try {
      const storedItems = await AsyncStorage.getItem(key);
      const storedVal = JSON.parse(storedItems);
      console.log("reading first time from storage", storedVal);
      if (storedVal) {
        //cartVar = storedVal;
        this.props.dispatch({
          type: "ADD_CART_VALUE_FROM_STORAGE",
          payload: storedVal
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  _storeInCart(item) {
    this.props.dispatch({
      type: "ADD_VALUE_IN_STORE",
      payload: {
        item
      }
    });
  }

  shouldComponentUpdate(props, state) {
    if (props.cartValue !== this.props.cartValue) {
      this.storeInAsyncStorage("CART_VALUE", JSON.stringify(props.cartValue));
      this.setState({ listValue: props.cartValue });
    }

    return true;
  }
  storeInAsyncStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  };

  _pressFilter() {
    this.props.navigation.navigate("MyAccScreen");
  }

  _removeFromCart(item) {
    this.props.dispatch({
      type: "DELETE_VALUE_FROM_STORE",
      payload: {
        item
      }
    });
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.listViewStyle}>
        <View style={styles.IconViewStyle}>
          <View style={styles.IconRoundStyle}>
            <Image
              style={{ width: 72, height: 72, borderRadius: 72 }}
              source={{
                uri: item.imageUrl
              }}
            />
          </View>
        </View>
        <View style={styles.DetailsStyle}>
          <Text style={styles.TextStyle}>Name : {item.name}</Text>
          <Text style={styles.TextStyle}>Email : {item.emailId}</Text>
          <Text style={styles.TextStyle}>DOB : {item.dob}</Text>
          <Text style={styles.TextStyle}>Mobile number : {item.contact}</Text>
          <Text style={styles.TextStyle}>Address: {item.address}</Text>
        </View>
        <View style={styles.PlusIconViewStyle}>
          <Icon
            name={"minus-circle"}
            type={"font-awesome"}
            size={25}
            style={styles.IconStyle}
            onPress={() => this._removeFromCart(item)}
          />
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.OuterContainer}>
        <HeaderComponent headerTitle={"Home page"} />
        <FlatList
          style={styles.FlatListStyle}
          contentContainerStyle={styles.FlatListContainerStyle}
          data={this.state.listValue}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        <TouchableOpacity
          onPress={() => this._pressFilter()}
          style={styles.floatViewStyle}
        >
          <Icon
            name={"adduser"}
            type={"antdesign"}
            size={26}
            color="white"
            underlayColor="transparent"
          />
          <Text style={styles.floatButtonStyle}>{"Add User"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  OuterContainer: {
    flex: 1
  },
  FlatListStyle: {},
  TextStyle: {
    fontSize: 20
  },
  separator: {
    width: width,
    height: height / 50,
    backgroundColor: "#C0C0C0"
  },
  indicatorViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  indicatorStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  listViewStyle: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: width / 20
  },
  DetailsStyle: {
    width: width / 1.5,
    flexDirection: "column",
    padding: 10
  },
  TextStyle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  IconViewStyle: {
    marginTop: 20,
    marginLeft: 3
  },
  separator: {
    width: width,
    backgroundColor: "#F0F0F0"
  },
  floatViewStyle: {
    width: 150,
    height: 45,
    borderRadius: 60,
    bottom: 50,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C0392B", //"#0966aa"
    position: "absolute"
  },
  floatButtonStyle: {
    color: "white",
    fontWeight: "bold"
  },
  IconRoundStyle: {
    width: 74,
    height: 74,
    borderRadius: 74,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

function mapStateToProps(state) {
  return {
    cartValue: state.cartStore.cartValue
  };
}

export default connect(mapStateToProps)(HomeComponent);
