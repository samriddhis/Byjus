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
  let disabled = name.length > 0 && email_id.length > 0 ? false : true;
  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.flex}>
        <TextInput
          onChangeText={text => setName(text)}
          placeholder={"Name"}
          autoFocus={true}
          style={[styles.inputField]}
          value={name}
        />
        <TextInput
          multiline={true}
          onChangeText={text => setEmailId(text)}
          placeholder={"EmailId"}
          style={[styles.inputField]}
          value={email_id}
        />
        <TextInput
          multiline={true}
          onChangeText={text => setContact(text)}
          placeholder={"contact"}
          style={[styles.inputField]}
          value={contact}
        />
        <TextInput
          multiline={true}
          onChangeText={text => setAddress(text)}
          placeholder={"Address"}
          style={[styles.inputField]}
          value={address}
        />
        <TextInput
          multiline={true}
          onChangeText={text => setDob(text)}
          placeholder={"Dob"}
          style={[styles.inputField]}
          value={dob}
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
