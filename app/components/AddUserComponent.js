import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";
import { Icon } from "react-native-elements";
import BasicInput from "./BasicInput";
import { useDispatch } from "react-redux";

import { addUser, updateUser } from "../actions";

export default function AddUserComponent(props) {
  const dispatch = useDispatch();
  const { navigation } = props;

  let details = navigation.getParam("details", null);

  const [name, setName] = useState(details ? details.name : "");
  const [email_id, setEmailId] = useState(details ? details.email_id : "");
  const [contact, setContact] = useState(details ? details.contact : "");
  const [address, setAddress] = useState(details ? details.address : "");
  const [dob, setDob] = useState(details ? details.dob : "");

  const onSave = () => {
    let edit = details !== null;
    let sendDetails = {};

    if (edit) {
      sendDetails = details;
      sendDetails["name"] = name;
      sendDetails["email_id"] = email_id;
      sendDetails["contact"] = contact;
      sendDetails["address"] = address;
      sendDetails["dob"] = dob;
    } else {
      sendDetails = {
        name: name,
        email_id: email_id,
        contact: contact,
        address: address,
        dob: dob
      };
    }

    if (edit) {
      let url = "http://192.168.1.103:8000/update-form-data" + details._id;
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendDetails)
      })
        .then(data => {
          dispatch(updateUser(sendDetails));
          navigation.goBack();
        })
        .catch(error => console.log(error));
    } else {
      let url = "http://192.168.1.103:8000/create-byju-form";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendDetails)
      })
        .then(data => {
          dispatch(addUser(sendDetails));
          navigation.goBack();
        })
        .catch(error => console.log(error));
    }
  };
  let disabled = name.length > 0 && email_id.length > 0 && dob.length > 0 && contact.length > 0 && address.length > 0 ? false : true;
  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.flex}>
        <BasicInput
          placeholder={"Enter name"}
          iconName="user"
          iconSize={22}
          onChangeText={text => setName(text)}
          value={name}
        />
        <BasicInput
          placeholder={"Enter e-mail"}
          iconName="envelope"
          iconSize={22}
          onChangeText={text => setEmailId(text)}
          value={email_id}
        />
        <BasicInput
          placeholder={"Enter Dob"}
          iconName="calendar"
          iconSize={22}
          onChangeText={text => setDob(text)}
          value={dob}
        />
        <BasicInput
          placeholder={"Enter mobile number"}
          iconName="mobile"
          iconSize={30}
          onChangeText={text => setContact(text)}
          value={contact}
        />
        <BasicInput
          placeholder={"Enter your address"}
          iconName="home"
          iconSize={22}
          onChangeText={text => setAddress(text)}
          value={address}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <TouchableHighlight
            style={[styles.button]}
            disabled={disabled}
            onPress={onSave}
            underlayColor="rgba(0, 0, 0, 0)"
          >
            <Text
              style={[
                styles.buttonText,
                { color: disabled ? "rgba(255,255,255,.5)" : "#FFF" }
              ]}
            >
              Cancel
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button]}
            disabled={disabled}
            onPress={onSave}
            underlayColor="rgba(0, 0, 0, 0)"
          >
            <Text
              style={[
                styles.buttonText,
                { color: disabled ? "rgba(255,255,255,.5)" : "#FFF" }
              ]}
            >
              Save
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },

  buttonContainer: {
    height: 70,
    flexDirection: "row",
    padding: 12,
    backgroundColor: "white"
  },

  button: {
    width: 80,
    height: 44,
    borderRadius: 8,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C0392B"
  },

  buttonText: {
    fontFamily: "HelveticaNeue-Medium",
    fontSize: 16
  },

  inputField: {
    fontSize: 20,
    lineHeight: 22,
    fontFamily: "Helvetica Neue",
    height: 80,
    padding: 16,
    backgroundColor: "white"
  },

  text: {
    fontSize: 30,
    lineHeight: 33,
    fontFamily: "Helvetica Neue",
    color: "#333333",
    padding: 16,
    paddingTop: 16,
    minHeight: 170,
    borderTopWidth: 1,
    borderColor: "rgba(212,211,211, 0.3)"
  }
});
