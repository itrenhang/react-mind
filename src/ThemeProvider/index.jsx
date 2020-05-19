import React, {useContext} from 'react';
import {context} from '../context';
import {themeConfig} from './theme.config'
import cssModule from './index.css';

const ThemeProvider = ({children}) => {
  const {global: {state: {theme}}} = useContext(context);
  const styles = themeConfig[theme] || themeConfig.primary;
  return (
    <div className={cssModule.theme} style={styles}>
      {children}
    </div>
  )
};

export default ThemeProvider;