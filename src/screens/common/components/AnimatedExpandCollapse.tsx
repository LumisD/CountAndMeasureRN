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
      {/* Hidden measurement view */}
      <View
        style={{
          position: "absolute",
          opacity: 0,
          zIndex: -1,
          left: 0,
          right: 0,
        }}
        onLayout={event => {
          if (contentHeight === 0) {
            setContentHeight(event.nativeEvent.layout.height);
          }
        }}>
        {children}
      </View>

      {/* Animated visible content */}
      <Animated.View
        style={[
          {
            height: heightAnim,
            overflow: "hidden",
          },
          style,
        ]}>
        <View style={{flexGrow: 1}}>{children}</View>
      </Animated.View>
    </>
  );
};
