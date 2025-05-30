import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/types'; // adjust path if needed
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Count'>;

const ListsScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const goToCount = (id: number) => {
    navigation.navigate('Count', {unionId: id});
  };

  return (
    // your UI
    <Button title="Go to Count" onPress={() => goToCount(42)} />
  );
};

export default ListsScreen;
