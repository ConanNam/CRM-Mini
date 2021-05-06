import {Dimensions, StyleSheet} from 'react-native';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    //sssddddd
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: height * 0.05,
  },
  txt_: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#d10000',
    marginLeft: 30,
  },
  input_txt: {
    height: 40,
    width: 180,
    borderWidth: 1,
    marginRight: 30,
    borderRadius: 10,
    paddingLeft: 15,
  },
  body: {
    marginTop: 5,
    width: width * 0.96,
    alignSelf: 'center',
    // backgroundColor : "#4127b3"
  },
  header_body: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  stt: {
    width: 40,
    height: 40,
    // backgroundColor : "#00128a",
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'black',
  },
  stt_txt1: {
    fontWeight: 'bold',

    alignSelf: 'center',
  },
  stt_txt: {
    // fontWeight : "bold",
    color: 'black',
  },
  name_country: {
    width: 150,
    height: 40,
    // backgroundColor : "#00128a",
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'black',
    alignSelf: 'center',
  },
  flat_list: {
    flex: undefined,
  },
  data_country: {},
  container_header: {
    marginLeft: width * 0.05,
    marginTop: 10,
    marginRight: width * 0.05,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 10,
  },
  tct: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  stt_txt2: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
});

export default styles;
