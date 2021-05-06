import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: height * 0.05,
    width: width * 0.9,
    height: height * 0.2,
    backgroundColor: '#edf0ee',
    borderRadius: 10,
    alignSelf: 'center',
  },
  title1: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10,
  },
  checkbox1: {
    flexDirection: 'column',
  },
  checkbox: {
    alignSelf: 'center',
  },
  photo_check_date: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  check_date: {
    marginTop: 10,
    flexDirection: 'row',
  },
  title_date: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 14,
  },
  salary: {
    flexDirection: 'column',
    marginTop: 10,
  },
  salary1: {
    marginTop: 5,
    marginLeft: 10,
    flexDirection: 'row',
  },
  header1: {
    flexDirection: 'row',
  },
  salary_Cb: {
    fontStyle: 'italic',
  },
  salary_Cb1: {
    fontStyle: 'italic',
    color: '#ba7832',
  },
  title_date_true: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#2554fa',
  },
  body: {
    marginTop: 20,
    borderTopColor: '#a1a1a1',
    borderTopWidth: 1,
    width: width * 0.9,
    alignSelf: 'center',
    // height: height*0.5,
  },
  income: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
  },
  input_income: {
    height: 40,
    width: 200,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10,
    padding: 10,
  },
  cnd_income: {
    fontSize: 18,
    marginLeft: 5,
  },
  txt_income: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  btn_insurance: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  input_insurance: {
    height: 40,
    width: 80,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 5,
  },
  txt_region: {
    color: '#6fde59',
  },
  txt_so: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  btn_region: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  input_npt: {
    height: 40,
    width: 120,
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 10,
  },
  nguoi: {
    marginLeft: 5,
  },
  btn_: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_ok: {
    height: 60,
    width: 150,
    backgroundColor: '#378c03',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_ok1: {
    height: 60,
    width: 150,
    backgroundColor: '#f59e1b',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  txt_btn: {
    fontWeight: 'bold',
    color: 'white',
  },
  input_insurance_1: {
    height: 40,
    width: 80,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 5,
    backgroundColor: '#bfbfbf',
  },
  txt_insurance: {
    fontSize: 12,
  },
  salary_: {
    flexDirection: 'row'
  },
  salary_1: {
    justifyContent: 'center',
    width: width * 0.95,
    alignSelf: 'center',
    marginTop: 30,
    elevation: 10,
    borderRadius: 5,
    alignItems : "center",
    justifyContent:"center"
  },
  txt_salary_: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#31cf00',
  },
  header_salary: {
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_salary1: {
    marginRight: 20,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt_money: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#c40404',
  },
  title_no: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#02c916',
    marginTop: 20,
  },
  view_flat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  item_txt: {
    width: 0.3 * width,
    fontWeight: 'bold',
    alignItems: 'flex-start',
  },
  view_flat1: {
    flexDirection: 'row',
    marginTop: 10,
  },
  item_txt1: {
    width: 0.2 * width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item_txt2: {
    width: 0.4 * width,
    fontWeight: 'bold',
    alignItems: 'flex-end',
  },
});
export default styles;
