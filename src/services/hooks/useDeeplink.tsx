import {useEffect, useCallback} from 'react';
import {Linking,AppState} from 'react-native';
import useAppState from './useAppState';

const useDeepLink = (callback: (url: string) => void) => {
  const {appStateVisible} = useAppState();

  const handleDeepLink = useCallback(
    link => {
      if (link) {
        const url = typeof link === 'string' ? link : link.url;
        console.log({deeplink: url});

        callback(url);
      }
    },
    [callback],
  );

  useEffect(() => {
    if (appStateVisible === 'background') {
      Linking.getInitialURL().then(handleDeepLink);
    }
  }, [appStateVisible, handleDeepLink]);

  useEffect(() => {
    Linking.getInitialURL().then(handleDeepLink);

    Linking.addListener('url', handleDeepLink);

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, [handleDeepLink]);
};

export default useDeepLink;