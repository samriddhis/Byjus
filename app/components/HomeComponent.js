import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "react-native-elements";
const { height, width } = Dimensions.get("window");
import { getUsers, deleteUser } from "../actions";
import axios from 'axios';

export default function HomeComponent(props) {
  const dispatch = useDispatch();
  const { navigation } = props;

  const [isFetching, setIsFetching] = useState(false);

  const userReducer = useSelector(state => state.userReducer);
  const { userDetails } = userReducer;

  useEffect(() => getUserDetails(), []);

  const getUserDetails = () => {
    //setIsFetching(true);

     let url = "http://192.168.1.103:8000/get-byju-user-list"
   //  let url2= "https://cf249d94-cc1e-4e61-81aa-986b43b235e0.mock.pstmn.io/byju/get-user"

   //  console.log("calling url"+url2)
    fetch(url)
         .then(response => response.json())
         .then(data => {
             console.log(data.byjus)
             dispatch(getUsers(data.byjus))
            })
         .catch(error => alert(error));

         /*axios.get(url)
             .then(res => res.data)
             .then((data) => {
               console.log(data)
             })
             .catch(error => console.log(error.message))*/
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.listViewStyle}>
        <View style={styles.IconViewStyle}>
          <View style={styles.IconRoundStyle}>
            <Image
              style={{ width: 72, height: 72, borderRadius: 72 }}
              source={{
                uri: "http://getdrawings.com/free-icon/blank-avatar-icon-75.png"
              }}
            />
          </View>
        </View>
        <View style={styles.DetailsStyle}>
          <Text style={styles.TextStyle}>Name : {item.name}</Text>
          <Text style={styles.TextStyle}>Email : {item.email_id}</Text>
          <Text style={styles.TextStyle}>DOB : {item.dob}</Text>
          <Text style={styles.TextStyle}>Mobile number : {item.contact}</Text>
          <Text style={styles.TextStyle}>Address: {item.address}</Text>
        </View>
        <TouchableOpacity style={styles.PlusIconViewStyle}  onPress={() => {
                    onDelete(item._id)
                }}>
          <Icon
            name={"minus-circle"}
            type={"font-awesome"}
            size={25}
            color={"red"}
            style={styles.IconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.PlusIconViewStyle}  onPress={() => {
                    onEdit(item)
                }}>
          <Icon
            name={"edit"}
            type={"font-awesome"}
            size={25}
            style={styles.IconStyle}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const onEdit = item => {
    navigation.navigate("AddUserScreen",  { details: item,title: `Edit Details` });
  };

  const onDelete = id => {
        let url = "http://192.168.1.103:8000/delete-form/"+id
        fetch(url,{
          method:"DELETE"
        })
         .then(data => {
          dispatch(deleteUser(id))
            })
         .catch(error => console.log(error));
  };

  if (isFetching) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator animating={true} />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={userDetails}
          renderItem={renderItem}
          style={styles.FlatListStyle}
          contentContainerStyle={styles.FlatListContainerStyle}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddUserScreen", { title: `User Details` })
          }
          style={styles.floatViewStyle}
        >
          <Icon
            name={"delete-outline"}
            type={"material-community"}
            size={26}
            color="white"
            underlayColor="transparent"
          />
          <Text style={styles.floatButtonStyle}>{"Add User"}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },

  activityIndicatorContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  separator: {
    width: width,
    height: height / 50,
    backgroundColor: "#C0C0C0"
  },
  listViewStyle: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: width / 20
  },
  DetailsStyle: {
    width: width / 1.7,
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
  floatViewStyle: {
    width: 150,
    height: 45,
    borderRadius: 60,
    bottom: 50,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C0392B",
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
