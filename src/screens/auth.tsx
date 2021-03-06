import React, { useState } from 'react';
import { ProfileForm } from '../components/profile-form';
import { Text, SocialIcon, Button } from 'react-native-elements';
import { styles } from '../assets/style';
import { View } from 'react-native';
import { useNavigation } from '../hooks/use-navigation';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import { ScrollableFullScreenContainer } from '../components/scrollable-full-screen-container';
import { snackbarAsyncWrapper } from '../helpers/snackbar';

const AuthScreen = () => {
  const routeName = 'Auth'

  const navigation = useNavigation();

  const [isSignUp, setSignUp] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    snackbarAsyncWrapper(async () => {
      await dispatch(authActions[isSignUp ? 'signUp' : 'login'](values))
      navigation.navigate('Home');
    });
  }

  return (
    <ScrollableFullScreenContainer>
      <View
        style={styles.banner}
      >
        <Text
          h4
        >
          {
            isSignUp ? 'Crie sua Conta' : 'Que bom te ver aqui!'
          }
        </Text>
      </View>
      <ProfileForm
        actionName={isSignUp ? 'Cadastrar' : 'Login'}
        showExtraFields={isSignUp}
        onSubmit={onSubmit}
      >
        <SocialIcon
          style={styles.marginVerticalMd}
          type="facebook"
          title="Continuar com Facebook"
          button
        />
        <Button
          type="clear"
          title={isSignUp ? 'Já tenho uma conta' : 'Não tenho uma conta'}
          onPress={() => setSignUp(!isSignUp)}
        />
      </ProfileForm>
    </ScrollableFullScreenContainer>
  )
}

AuthScreen.navigationOptions = () => ({
  headerShown: false
})

export { AuthScreen };
