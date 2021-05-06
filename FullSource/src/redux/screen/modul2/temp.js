import React, {useState, useEffect} from 'react';
import {View, Button, Platform, Text, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SQLite from 'react-native-sqlite-storage';
var db;

const DeleteRowDBAction = () => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM  spending where id=?', [3], (tx, results) => {
      console.log('Results', results.rowsAffected);
      if (results.rowsAffected > 0) {
        Alert.alert(
          'Success',
          'User deleted successfully',
          [
            {
              text: 'Ok',
              onPress: () => console.log('deleted Ok'),
            },
          ],
          {cancelable: false},
        );
        tx.executeSql('SELECT * FROM spending', [], (tx, res) => {
          for (let i = 0; i < res.rows.length; ++i) {
            console.log('item:', res.rows.item(i));
          }
        });
      }
    });
  });
};

export const App = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const foteDate = a => {
    if (a < 10) {
      return '0' + a;
    } else return a;
  };

  const UpdateDBAction = () => {
    console.log('Select DB is Called');

    db.transaction(tx => {
      tx.executeSql(
        'UPDATE spending set name_S=?, cost_S=? where id=?',
        ['Giáo dục', 0, 1],
        (tx, results) => {
          // console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => console.log('OK'),
                },
              ],
              {cancelable: false},
              tx.executeSql('SELECT * FROM spending', [], (tx, res) => {
                for (let i = 0; i < res.rows.length; ++i) {
                  console.log('item:', res.rows.item(i));
                }
              }),
            );
          } else {
            alert('Updation Failed');
          }
        },
      );
    });
  };

  const InsertDBAction = () => {
    console.log('Select DB is Called');

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO spending (id,name_S,note_S,time_S,cost_S,img_S,status)  VALUES (?,?,?,?,?,?,?)',
        [
          null,
          'đầu tư',
          null,
          `${date.getFullYear()}-${foteDate(date.getMonth() + 1)}-${foteDate(
            date.getDate(),
          )}`,
          50000,
          'dautu.png',
          'done',
        ],
        (tx, results) => {
          console.log('Insert Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                },
              ],
              {cancelable: false},
            );
            txn.executeSql('SELECT * FROM spending', [], (tx, res) => {
              console.log(res.rows.length);
              for (let i = 0; i < res.rows.length; ++i) {
                console.log('item:', res.rows.item(i));
              }
            });
          } else {
            alert('Updation Failed');
          }
        },
      );
    });
  };

  useEffect(() => {
    db = SQLite.openDatabase({
      name: 'testDB',
      createFromLocation: '~sqlite.db',
    });
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM spending', [], (tx, res) => {
        console.log(res.rows.length);
        for (let i = 0; i < res.rows.length; ++i) {
          console.log('item:', res.rows.item(i));
        }
      });
    });
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    if (show === true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const showTimepicker = () => {
    showMode('time');
  };

  console.log(date);

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      <View>
        <Button onPress={UpdateDBAction} title="Update" />
      </View>
      <View>
        <Button onPress={DeleteRowDBAction} title="Delete" />
      </View>
      <View>
        <Button onPress={InsertDBAction} title="Insert" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default App;
