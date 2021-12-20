import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Icon, Button } from "react-native-elements";
import { connect } from "react-redux";
const { width, height } = Dimensions.get("window");
import BasicInput from './BasicInput';

class DetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:
        this.props.profileDetails == null ? "" : this.props.profileDetails.name,
      emailId:
        this.props.profileDetails == null
          ? ""
          : this.props.profileDetails.emailId,
      contact:
        this.props.profileDetails == null
          ? ""
          : this.props.profileDetails.contact,
      address:
        this.props.profileDetails == null
          ? ""
          : this.props.profileDetails.address,
      dob:
        this.props.profileDetails == null ? "" : this.props.profileDetails.dob,
      isLoading: false
    };
  }

  _pressUpdateProfile() {
    this.props.refs.navigation.navigate("HomeScreen");
    var item = {
      name: this.state.name,
      emailId: this.state.emailId,
      contact: this.state.contact,
      address: this.state.address,
      dob: this.state.dob,
      imageUrl:this.props.imageUrl
    };
    this.props.dispatch({
      type: "ADD_VALUE_IN_STORE",
      payload: {
        item
      }
    });
    
  }
  render() {
    return (
      <ScrollView
        style={[styles.scene, { backgroundColor: "white" }]}
      >
        <View style={styles.Container}>
      <BasicInput
        placeholder={'Enter name'}
        iconName="user"
        iconSize={22}
        onChangeText={text => this.setState({ name: text })}
        value={this.state.name}
      />
      <BasicInput
        placeholder={'Enter e-mail'}
        iconName="envelope"
        iconSize={22}
        onChangeText={text => this.setState({ emailId: text })}
        value={this.state.emailId}
      />
      <BasicInput
        placeholder={'Enter Dob'}
        iconName="calendar"
        iconSize={22}
        onChangeText={text => this.setState({ dob: text })}
        value={this.state.dob}
      />
      <BasicInput
        placeholder={'Enter mobile number'}
        iconName="mobile"
        iconSize={30}
        onChangeText={text => this.setState({ contact: text })}
        value={this.state.contact}
      />
       <BasicInput
        placeholder={'Enter mobile number'}
        iconName="home"
        iconSize={22}
        onChangeText={text => this.setState({ address: text })}
        value={this.state.address}
      />
      <View style={styles.SaveButtonStyle}>
            <Button
                title="SAVE"
                onPress={() => this._pressUpdateProfile()}
                buttonStyle={{ backgroundColor: "#C0392B" }}
              ></Button>
      </View>
    </View>
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  OuterViewContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: "silver"
  },
  BasicInfoViewStyle: {
    borderBottomColor: "silver",
    borderBottomWidth: 1
  },
  InfoViewStyle: {
    padding: 2,
    paddingLeft: 5,
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  BasicInfoStyle: {
    color: "#000",
    padding: 5,
    fontSize: 16,
    fontWeight: "bold"
  },
  BasicInfoTxtStyle: {
    color: "#000",
    padding: 3,
    fontSize: 14,
    fontWeight: "bold"
  },
  InfoTxtStyle: {
    color: "gray",
    padding: 1,
    fontSize: 14,
    marginLeft:5
  },
  SaveButtonStyle: {
    marginTop: 80
  },
  indicatorStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  }
});

function mapStateToProps(state) {
  return {
    cartValue: state.cartStore.cartValue
  };
}

export default connect(mapStateToProps)(DetailsComponent);
