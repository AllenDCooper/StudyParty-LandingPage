import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';

const styles = (theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
    background: 'none'
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.white,
    opacity: 0.4,
    zIndex: -3,
  },
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div>
      <AppBar position="relative">
        <div className={classes.backdrop} />
        <Toolbar className={classes.toolbar}>
        {/* <div className={classes.right}/> */}
          <Link
            className="permanent-marker pink"
            underline="none"
            color="inherit"
            className={classes.title}
            href={process.env.PUBLIC_URL}
            style={{fontFamily:"Permanent Marker", color: "hotpink", fontSize: "48px", textAlign: 'right'}}
          >
            {'StudyParty!'}
          </Link>
          <div className={classes.right}>
            {/* <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              href="/#"
            >
              {'About'}
            </Link> */}
            {/* <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              href="/premium-themes/onepirate/sign-up/"
            >
              {'Sign Up'}
            </Link> */}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder, classes.backdrop} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
