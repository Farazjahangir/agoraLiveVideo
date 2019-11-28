import React, { Component } from 'react'
import { Text, View, TouchableOpacity, NativeModules, PermissionsAndroid, TextInput } from 'react-native'

const { Agora } = NativeModules
import { RtcEngine, AgoraView } from 'react-native-agora'
import JoinC from './join'

export default class home extends Component {
    state= {
        success: '',
        uuid: '',
        channelId : 12,
        channelName : 'KAm Hogya23',
        isCall : false ,
        join: false
    }
    
    componentDidMount(){
        const config = {
            appid: '86a1446a694842d589c2f50a6396cb80' 
        }
        RtcEngine.init(config)
    }
    async startVideo(){
        // alert('hello')
        try{
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ])
            console.log('PermissionsAndroid.RESULTS.GRANTED' , PermissionsAndroid.RESULTS.GRANTED);
            
           const channel = await RtcEngine.joinChannel(this.state.channelName , 12 )
           console.log('Channel' , channel);
           RtcEngine.on('joinChannelSuccess' , async (data)=> {
               console.log('Data==========>' , data);
               await RtcEngine.muteLocalAudioStream(false)  
               this.setState({ uuid: data.uid, isCall: true })

               RtcEngine.on('userJoined' , (data)=>{
                   console.log('USER_JOINED' , data);
                   RtcEngine.setRemoteVideoStreamType
                   
               })
           })

        }
        catch(e){
            console.log('Error' , e.message)
        }
        RtcEngine.on('userJoined' , (data) =>{
            console.log('RTCEngine.On======>' , data);
            
        })
        // const res = await RtcEngine.enableVideo()
        // console.log('Agora' , res);
        
        // RtcEngine.enableLocalVideo(true)

            }
    async leave(){
        const leave = await RtcEngine.leaveChannel(this.state.channelName)
        console.log('Leave =====>' , leave);
        this.setState({ uuid: '' , isCall: false , join: false })
        
    }
    async joinVideo(){
        this.setState({ join: true })
        // try{
        //     const channel = await RtcEngine.joinChannel(this.state.channelName , 11 )
        //     console.log('JOIN_VIDEO_Channel' , channel);
        //     RtcEngine.on('joinChannelSuccess' , (data)=> {
        //         console.log('JOIN_VIDEO_Data==========>' , data);
        //         // RtcEngine.disableAudio()
        //         this.setState({ uuid: data.uid , join: true } , async ()=>{
        //             await RtcEngine.muteLocalAudioStream(false)                    
        //         })
 
        //         RtcEngine.on('userJoined' , (data)=>{
        //             console.log('JOIN_VIDEO' , data);
                    
        //         })
        //     }) 
        // }
        // catch(e){
        //     console.log('Joining Video' , e.message);
            
        // }
    }

    // returnView = () => {
    //    return <AgoraView style={{flex: 1 , backgroundColor:'red' , width: 500}} mode={1}  remoteUid={this.state.channelId}  zOrderMediaOverlay={true} />
    // }
    render() {
        console.log('REnder success ====>' , this.state.success);
        console.log('REnder uuid ====>' , this.state.uuid);

        
        return (
            <View style={{flex:1 , alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={()=> this.startVideo()}>
                    <Text> Start </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.leave()} style={{marginTop: 30}}>
                    <Text> leave </Text>
                </TouchableOpacity>
               { (!!this.state.uuid && !!this.state.isCall) && <AgoraView style={{flex: 1 , backgroundColor:'red' , width: 500}} mode={1} showLocalVideo={true} />}
               <TextInput onChangeText={(text)=> this.setState({ uuid : text })} style={{borderWidth: 1 , width: 150}} />
               <TouchableOpacity onPress={()=> this.joinVideo()}>
                    <Text> Join Video </Text>
                </TouchableOpacity>
                {!!this.state.join && <JoinC channelId={this.state.channelId} />}
            </View>
        )
    }
}
