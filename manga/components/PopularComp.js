import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import { fetchDog } from '../redux/mangaSlice';
import { useEffect } from 'react';


const Geners =({item})=>{
    // console.log(item.genres)
    let list = item.genres;
    console.log(list)
    return(
        <View style={styles.row}>
        <Text>Жанр-</Text>
        <FlatList
            style={styles.list}
            data={list}
            renderItem={({item})=>
                <View>
                    <Text>{item.name}</Text>
                </View>}
            >
        </FlatList>
        </View>
    ) 
    
}

const PopularManga = (props) => {
    // const state = useSelector((state) => state);
    // const dispatch = useDispatch();
    
    // useEffect(() => {
    //     // Вызов действия при загрузке компонента
    //     dispatch(fetchDog());
    // }, []);
    // console.log(state);
    console.log(props);
    return (
        <View style={styles.list}>
          <FlatList
          data={props.data}
          renderItem={({item})=>
          <View style={styles.box}>
            <Text>Название - {item.main_name}</Text>
              
            <Geners item={item}></Geners>
          </View>}>

          </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex:1,
        flexDirection:'row'
    },
    box:{
        flex:1,
        margin:10,
        border:'1px black solid',
        padding:20,
        borderRadius:9,
        width:'90%',
        margin:'auto',
        marginBottom:'15px',
        fontSize:'24px'
    },

    text: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    row:{
        display:'flex',
        flexDirection:'row',
        width:'90%',
        justifyContent:'space-around'
    }
});




export default PopularManga;