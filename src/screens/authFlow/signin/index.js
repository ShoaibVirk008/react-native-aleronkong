import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Animated, Image, ActivityIndicator } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import * as LoadingIndicators from 'react-native-indicators';
//import { useDispatch, useSelector } from 'react-redux';
import { Logos, Toasts, Icons, TextInputs, Buttons, ScrollViews, CheckBoxes, Wrapper, Text, Spacer } from '../../../components';
import { Api, appIcons, appImages, appStyles, async_consts, colors, HelpingMethods, routes, sizes, social_auth_types, userTypes, Validations, } from '../../../services';
//import { setUserDetail } from '../../../services/store/actions';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager, } from 'react-native-fbsdk-next';
import InstagramLogin from 'react-native-instagram-login';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Index(props) {
  const { navigate, replace } = props.navigation

  const loggedOut = props?.route?.params?.loggedOut

  const insRef = useRef(null)
  //redux
  //const dispatch = useDispatch()
  // const user = useSelector(state => state.user)
  // console.log('user:', user)
  // const userDetail = user?.userDetail

  //local states
  const [logoTopMargin] = useState(new Animated.Value(height(40)))
  const [loading, setLoading] = useState(true)
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isPasswordVisible, setPasswordVisibility] = useState(false)
  const [loadingSocialLogin, setLoadingSocialLogin] = useState(false)
  const [instagramToken, setInstagramToken] = useState('')


  //redux states
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const { currentUser, userToken } = user
  // console.log('currentUser: ', currentUser)


  useEffect(() => {
    checkUser()
    //HelpingMethods.requestNotificationPermission()
  }, [props])


  const checkUser = async () => {

    const loadingTime = loggedOut ? 0 : 500

    const user_credentials = await AsyncStorage.getItem(async_consts.user_credentials)
    console.log('user_credentials: ', user_credentials)
    const user_credentials_social = await AsyncStorage.getItem(async_consts.user_credentials_social)
    console.log('user_credentials_social: ', user_credentials_social)
    if ((user_credentials || user_credentials_social) && currentUser) {
      //const parsed_user_credentials = JSON.parse(user_credentials)
      // console.log('parsed_user_credentials: ', parsed_user_credentials)
      // const { email, password, } = parsed_user_credentials
      // await Api.Login({ email, password }).
      //   then(res => {
      //     if (res) {
      //       replace(routes.app)
      //     }
      //   })
      setTimeout(() => {
        replace(routes.app)
      }, 500);
    } else {
      setTimeout(() => {
        handleLoading(height(10))
        setLoading(false)
      }, loadingTime);
    }

  }

  const handleLoading = (value) => {
    Animated.timing(logoTopMargin, {
      toValue: value,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleOnChangeEmailText = (text) => {
    if (emailError) {
      HelpingMethods.handleAnimation()
      !text ? setEmailError('') : setEmailError('')
    }
    setEmail(text)
  }

  const handleOnChangePasswordText = (text) => {
    if (passwordError) {
      HelpingMethods.handleAnimation()
      !text ? setPasswordError('') : setPasswordError('')
    }
    setPassword(text)
  }

  const validations = () => {
    HelpingMethods.handleAnimation()
    !email ? setEmailError('Enter your email') : !Validations.validateEmail(email) ? setEmailError('Format is invalid') : setEmailError('')
    !password ? setPasswordError('Enter your password') : password.length < 6 ? setPasswordError('Password should be atleast 6 characters') : setPasswordError('')
    if (password.length >= 6 && Validations.validateEmail(email)) {
      return true
    } else {
      return false
    }
  }

  const handleLogin = async () => {
    if (validations()) {
      setLoadingLogin(true)
      await Api.Login({ email, password }).
        then(async res => {
          if (res) {
            //replace(routes.app)
            await HelpingMethods.requestNotificationPermission()
            await HelpingMethods.checkNotificationPermission()
            setTimeout(async () => {
              const fcmToken = await AsyncStorage.getItem(async_consts.fcm_token)
              if (fcmToken) {
                await Api.UpdateUser({ userToken, fcmToken })
              }
               replace(routes.app)
              setLoadingLogin(false)
            }, 500);
          }
        })
      //setLoadingLogin(false)
    } else {

    }
  }

  const handleFacebookLogin = async () => {
    setLoadingSocialLogin(true)
    await LoginManager
      .logInWithPermissions(['public_profile', 'email'])
      .then(async function (result) {
        if (result.isCancelled) {
          //alert('Login cancelled');
          console.log('Login cancelled')
          setLoadingSocialLogin(false)
        } else {
          await AccessToken
            .getCurrentAccessToken()
            .then((data) => {
              let accessToken = data.accessToken
              //alert(accessToken.toString())
              console.log('handleFacebookLogin accessToken: ' + accessToken)

              const responseInfoCallback = async (error, result) => {
                if (error) {
                  console.log('handleFacebookLogin error: ' + error.toString())
                  //alert('Error fetching data: ' + error.toString());
                } else {
                  console.log(result)
                  await handleSocialLogin({
                    authType: social_auth_types.facebook,
                    email: result.email,
                    firstName: result.first_name,
                    lastName: result.last_name,
                    userName: result.name
                  })
                  //alert('Success fetching data: ' + result.toString());
                }
                setLoadingSocialLogin(false)
              }
              const infoRequest = new GraphRequest('/me', {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name'
                  }
                }
              }, responseInfoCallback);

              // Start the graph request.
              new GraphRequestManager()
                .addRequest(infoRequest)
                .start()
            })
        }
      }, function (error) {
        alert('Login fail with error: ' + error);
        setLoadingSocialLogin(false)
      });
  }
  const handleGoogleLogin = async () => {
    setLoadingSocialLogin(true)
    GoogleSignin.configure({

      //release client id
      //androidClientId: '1002218143248-m2ulff68nj5n0tcapmbg88nqilf9gu0d.apps.googleusercontent.com',

      //debug client id
      androidClientId: '1002218143248-erenguqqa16r8a731skag00haismrqie.apps.googleusercontent.com',
      iosClientId: '1002218143248-cb529i36v4oefj8pv3dihkvaukr7ikpf.apps.googleusercontent.com',
    });
    await GoogleSignin.hasPlayServices().then(async (hasPlayService) => {
      if (hasPlayService) {
        await GoogleSignin.signIn().then(async (userInfo) => {
          console.log("GOOGLE USER IS: " + JSON.stringify(userInfo))
          const { user } = userInfo
          await handleSocialLogin({
            authType: social_auth_types.google,
            email: user.email,
            firstName: user.givenName,
            lastName: user.familyName,
            userName: user.name,
          })
        }).catch((e) => {
          console.log("ERROR IS: " + JSON.stringify(e));
        })
      }
    }).catch((e) => {
      console.log("ERROR IS: " + JSON.stringify(e));
    })
    setLoadingSocialLogin(false)
  }

  const handleSocialLoginPress = (buttonIcon, index) => {
    if (index === 0) {
      handleFacebookLogin()
      //LoginManager.logOut()
    } else if (index === 1) {
      handleGoogleLogin()
      //LoginManager.logOut()
    } else if (index === 2) {
      insRef.current.show()
    }
  }
  const handleSocialLogin = async ({ authType, email, firstName, lastName, userName }) => {
    await Api.SocialLogin({ authType, email, firstName, lastName, userName }).
      then(res => {
        if (res) {
          const token = res.data.access_token
          if ((res?.data?.newUser)) {
            navigate(routes.allowNotifications, { data: { authType, email, firstName, lastName, userName, token } })
          } else {
            replace(routes.app)
          }
        }
      })
  }
  return (
    <Wrapper isMain backgroundDark style={[{}]}>
      <ScrollViews.KeyboardAvoiding>
        <Animated.View style={{ height: logoTopMargin }} />
        <Wrapper>
          <Wrapper animation={'fadeInUp'} style={[{}, appStyles.center]}>
            <Logos.Primary />
          </Wrapper>
          {
            !loading ?
              <Wrapper animation={'fadeIn'}>
                <Spacer isBasic />
                <Wrapper marginHorizontalBase>
                  <Text isSmallTitle isWhite style={[appStyles.textCenter]}>Log in to your account</Text>
                </Wrapper>
                <Spacer isDoubleBase />
                <TextInputs.Underlined
                  title={'Email'}
                  value={email}
                  onChangeText={v => handleOnChangeEmailText(v)}
                  error={emailError}
                  keyboardType='email-address'
                  invertColors
                />
                <Spacer isBasic />
                <Spacer isBasic />
                <TextInputs.Underlined
                  title={'Password'}
                  value={password}
                  onChangeText={v => handleOnChangePasswordText(v)}
                  error={passwordError}
                  iconNameRight='eye'
                  iconTypeRight={'feather'}
                  iconColorRight={isPasswordVisible ? colors.appColor1 : colors.appTextColor5}
                  secureTextEntry={!isPasswordVisible}
                  onPressIconRight={() => setPasswordVisibility(!isPasswordVisible)}
                  invertColors
                />
                <Spacer isBasic />
                <Wrapper marginHorizontalBase alignItemsFlexEnd>
                  {/* <Wrapper flex={1}>
                    <CheckBoxes.Primary
                      text={'Remeber Me'}
                      checked={rememberMe}
                      onPress={() => setRememberMe(!rememberMe)}
                    />
                  </Wrapper> */}
                  <Text
                    isSmall
                    isWhite
                    isBoldFont
                    onPress={() => navigate(routes.forgotPassword)}
                  //onPress={() => navigate(routes.resetPassword,{code:'232'})}
                  >Forgot Password?</Text>
                </Wrapper>
                <Spacer isBasic />
                <Spacer isBasic />
                <Buttons.Colored
                  text={'Log In'}
                  onPress={handleLogin}
                  buttonStyle={[appStyles.marginHorizontalMedium]}
                  isLoading={loadingLogin}
                />
                <Spacer isDoubleBase />
                <Text isSmall isWhite alignTextCenter>Or continue with</Text>
                <Spacer isBasic />
                {
                  !loadingSocialLogin ?
                    <Wrapper flexDirectionRow justifyContentSpaceBetween marginHorizontalMedium>
                      {
                        [appIcons.facebook, appIcons.google, appIcons.instagram, appIcons.twitter].
                          map((item, index) => {
                            const shadowColor = index === 0 ? '#2196F399' : index === 1 ? '#CF2D4899' : index === 2 ? '#FED77999' : '#00ACED99'
                            return (
                              <Icons.Button
                                customIcon={item}
                                isRound
                                buttonSize={width(15)}
                                shadowColored
                                buttonStyle={{ shadowColor: 'white' }}
                                onPress={() => handleSocialLoginPress(item, index)}
                              />
                            )
                          })
                      }
                    </Wrapper>
                    :
                    <Wrapper alignItemsCenter>
                      <ActivityIndicator
                        color={colors.appBgColor1}
                        size='large'
                      />
                    </Wrapper>
                }
                <Spacer isDoubleBase />
                <Buttons.Colored
                  text={'Create an Account'}
                  tintColor={colors.appBgColor1}
                  onPress={() => navigate(routes.createAnAccount)}
                  buttonColor={colors.appBgColor6}

                />
                <Spacer isBasic />
              </Wrapper>
              :
              // <Wrapper>
              //   <LoadingIndicators.WaveIndicator />
              // </Wrapper>
              null
          }
        </Wrapper>

      </ScrollViews.KeyboardAvoiding>
      <InstagramLogin
        ref={insRef}
        appId='5577351762360947'
        appSecret='1970233d63ed5792316698cd49a51b63'
        redirectUrl='https://socialsizzle.heroku.com/auth/'
        scopes={['user_profile', 'user_media']}
        onLoginSuccess={(token, result) => {
          console.log('Instagram Token: ', token)
          console.log('Instagram result: ', result)
          setInstagramToken(token)
        }}
        onLoginFailure={(data) => console.log(data)}
      />
    </Wrapper>
  );
}

