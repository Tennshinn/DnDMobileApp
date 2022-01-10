import { View } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function HorizontalDraggingWrapper({ children, dragBorder, onMoved, draggable, dragAllowed }) {

    const [offsetX, setOffsetX] = useState(0);
    const [startX, setStartX] = useState(0);
    const [x, setX] = useState(0);
    const [dragging, setDragging] = useState(false);
    const view = React.createRef();
  
    const dragAmount = () => x - startX;
  
    function dragStart(event) {
      setDragging(true);
      setStartX(event.nativeEvent.pageX);
      setX(event.nativeEvent.pageX);
    }
    function dragMove(event) {
      if (!dragAllowed || dragAllowed(-Math.sign(event.nativeEvent.pageX - startX))) {
        setX(event.nativeEvent.pageX);
      }
    }
    function dragEnd() {
      if (Math.abs(dragAmount()) >= dragBorder && onMoved) {
        onMoved(-Math.sign(dragAmount()));
      }
      setDragging(false);
      setStartX(0);
      setX(0);
    }
    function onLayout() {
      if (!dragging)
        view.current.measure((fx, fy, width, height, pageX, pageY) => {
          if (!dragging)
            setOffsetX(pageX);
        });
    }
  
    return <View
      ref={view}
      style={{
        position: 'absolute',
        opacity: 1 - Math.abs(dragAmount()) / dragBorder,
        height: "100%",
        transform: [
          { translateX: dragAmount() },
          { scale: 1 - Math.abs(dragAmount()) / dragBorder / 20 }
        ]
      }}
      onLayout={onLayout} >
      {children}
      <View style={{ position: "absolute", bottom: -20, width: "100%", height: 220 }}
        onResponderStart={dragStart}
        onResponderMove={dragMove}
        onResponderRelease={dragEnd}
        onStartShouldSetResponderCapture={
          (evt) => false
        }
        onStartShouldSetResponder={() => draggable}
        onResponderTerminationRequest={() => true}
        onResponderTerminate={dragEnd}
      >
        <LinearGradient colors={['#00000000', '#00000055', '#000000ff']}
          style={{ width: "100%", height: "100%" }}
        >
        </LinearGradient>
      </View>
    </View>
  }