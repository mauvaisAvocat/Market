import React from 'react';
import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native';

const AppModal = (props) => {
    return (
        <View
            style={{
                display: props.show ? 'flex' : 'none',
                position: 'absolute',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                zIndex: 1001,
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    backgroundColor: props.layerBgColor,
                    opacity: props.layerBgOpacity,
                }}
            />

            <View
                style={{
                    backgroundColor: props.modalBgColor,
                    position: 'relative',
                    zIndex: 2,
                    padding: 50,
                    overflow: 'hidden',
                    borderRadius: 12,
                    opacity: props.modalOpacity,
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}
            >
                {props.modalContent}
            </View>
        </View>
    );
};

export default AppModal;