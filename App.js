import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import 'react-native-get-random-value';
import EditableTimer from '.compomnents/EditableTimer';
import ToggleableTimer from '.compomnents/EditableTimer';
import {newTimer} from '.utils/TimerUtils';
import {v4 as uuidv4} from 'uuid';

export default class App extends React.Component {

  state ={
    timers:[ {title:"Do smthng",
    project:"house chores",
    id:uuidv4(),
    elapsed: 5546099,
    isRunning:true,
  },
    {
    title:"Do Smthng else",
    project:"home work",
    id:uuidv4(),
    elapsed: 1246099,
    isRunning:false,
    },
  ]
  }
  componentDidMount=() =>{
    const TIME_INTERVAL=1000;
    this.intervalid = setInterval(()=> {
      const {timers} = this.state;

      this.setState({
        timers: timers.map(timer=> {
          const {elapsed,isRunning} = timer;

        return {
          ...timer,
          elapsed: isRunning ? elapsed + TIME_INTERVAL :elapsed
        }  
        })
      })
    },TIME_INTERVAL)
  }

  handleFormSubmit = attrs =>{
    const {timers} = this.state;
    this.setState({
      timers:timers.map(timer =>{ if(timer.id==attrs.id){
        const{title,project}=attrs;
        return{
          ...timer,title,project}
        }
        else{
          return timer
        }
      })
     

      });
    };
  

  handleRemovePress= timerId => {
    this.setState({timers:this.state.timers.filter(t => t.id != timerId)})
  }
  handleCreateSubmit = timer => {
    const{timers}= this.state;
    this.setState({
      timers: [newTimer(timer), ...timers]
    });
  };

  toggleTimer = timerId =>{
    this.setState(prevState =>{
      return{

      timers:timers.map(timer => {
        const{id, isRunning} =timer;
        if(id === timer.id){
          return {
            ...timer,
            isRunning: !isRunning,
          };

        }
        return timer;

      })
      }
    });
  }

  render() {
    const {timers} =this.state;

  

  return (
    <View>
      <View style={styles.appContainer}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>TIMERS</Text>

    </View>
    <KeyboardAvoidingView behavior='padding'cstyle={styles.timerListContainer}>
      <ScrollView contentContainerStyle={styles.timerList}>
      <ToggleableTimerform isOpen={false} onFormSubmit={this.handleCreateSubmit}/>
      {
        timer.map(({title,project,id,elapsed,isRunning})=>(
          <EditableTimer 
          key={id}
          id={id}
          title={title}
          project={project}
          elapsed={elapsed}
          isRunning={isRunning}
          onFormSubmit={this.handleSubmit}
          onRemovePress={this.handleRemovePress}
          onStartPress={this.toggleTimer}
          onStopPress={this.toggleTimer} />
        ))
      }
      </ScrollView>
    </KeyboardAvoidingView>
    </View>
    </View>
  )}
}


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth:1,
    borderBottomColor: "#D6D7DA",
  },
  title:{
    alignItems:'center',
    justifyContent: 'center',
    fontWeight:'bold', 
  },
  timerList :{
    paddingBottom:15,
  },
  timerListContainer:{
    flex:1,
  },
});
