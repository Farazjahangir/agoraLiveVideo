import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { RtcEngine, AgoraView } from 'react-native-agora'

export default class join extends Component {

    state= {
        isJoin: false,
        channelName : 'KAm Hogya23',
    }

    async componentDidMount(){
        try{
            const channel = await RtcEngine.joinChannel(this.state.channelName , 11 )
            console.log('JOIN_VIDEO_Channel' , channel);
            RtcEngine.on('joinChannelSuccess' , async (data)=> {
                console.log('JOIN_VIDEO_Data==========>' , data);
                // RtcEngine.startPreview()
                await RtcEngine.muteLocalAudioStream(true)  
                this.setState({ isJoin: true })
 
                RtcEngine.on('userJoined' , (data)=>{
                    console.log('JOIN_VIDEO' , data);
                    
                })
            }) 
        }
        catch(e){
            console.log('Joining Video' , e.message);
            
        }

        RtcEngine.on('userOffline' , () =>{
            console.log('join_component USer Ended Live Video');
            RtcEngine.leaveChannel(this.state.channelName)
            this.setState({ isJoin: false } , ()=> {
                alert('User Ended Live Video')
            })
        })
    }

    render() {
        // const channelId = this.props.channelId
        console.log('PRops' , this.props);
        
        return (
            <View>
                <Text> textInComponent </Text>
              {this.state.isJoin && <AgoraView style={{flex: 1 , backgroundColor:'red' , width: 500}} mode={1}  remoteUid={this.props.channelId} />}
            </View>
        )
    }
}
