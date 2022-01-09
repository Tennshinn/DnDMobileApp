import { View, Text, Modal, Pressable, TextInput } from 'react-native';
import styles from "../../styles";
import React, { Component } from 'react';

export default class PanelNameEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            text: ""
        };
    }
    open(text) {
        this.setState({ open: true, text: text });

    }
    close() {
        this.props.onAccept(this.state.text);
        this.setState({ open: false });
    }
    render() {
        return <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.open}
            onRequestClose={() => this.close()}
            style={{
                backgroundColor: "#000000aa"}}
        >
            <View style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                backgroundColor: "#000000aa"
            }}>
                <View style={[styles.itemContainer, {
                    margin: 45, top: 140,
                    padding: 35, height: 200
                }]}>
                    <Text style={[styles.text, { textAlign: "left", fontSize: 25, marginBottom: 15, marginLeft: 2, opacity: 0.8 }]}>Set panel name</Text>
                    <TextInput
                        style={[styles.text, { textAlign: "left", fontSize: 30, marginBottom: 10 }]}
                        placeholder="Panel Name"
                        placeholderTextColor="#CCC"
                        value={this.state.text}
                        onChangeText={text => this.setState({ ...this.state, text: text })}
                    />
                    <Pressable onPress={() => this.close()}>
                        <Text style={[styles.text, { textAlign: "right" }]}>OK</Text>
                    </Pressable>
                </View></View>
        </Modal>
    }
}