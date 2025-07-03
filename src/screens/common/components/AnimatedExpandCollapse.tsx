import React, {useEffect, useRef, useState} from "react";
import {Animated, View, ViewStyle} from "react-native";

type Props = {
  isVisible: boolean;
  duration?: number;
  children: React.ReactNode;
  style?: ViewStyle;
};

export const AnimatedExpandCollapse: React.FC<Props> = ({
  isVisible,
  duration = 400,
  children,
  style,
}) => {
  const [contentHeight, setContentHeight] = useState(0);
  const heightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isVisible ? contentHeight : 0,
      duration,
      useNativeDriver: false,
    }).start();
  }, [isVisible, contentHeight]);

  return (
    <>
      {isVisible && contentHeight === 0 && (
        <View
          style={{position: "absolute", opacity: 0, zIndex: -1}}
          onLayout={event => setContentHeight(event.nativeEvent.layout.height)}>
          {children}
        </View>
      )}

      <Animated.View style={[{height: heightAnim, overflow: "hidden"}, style]}>
        {isVisible && contentHeight > 0 && children}
      </Animated.View>
    </>
  );
};
