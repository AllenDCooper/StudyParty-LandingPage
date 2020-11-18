import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '../components/Typography';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(9),
    backgroundColor: 'white',
    maxWidth: '100%'
  },
  button: {
    border: '4px solid currentColor',
    borderRadius: 0,
    height: 'auto',
    padding: theme.spacing(2, 5),
  },
  link: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  buoy: {
    width: 60,
  },
});

function ProductSmokingHero(props) {
  const { classes } = props;

  const handleClick = () => {
    props.setShow(2);
  }
  return (
    <Container className={classes.root} component="section">
      <Link href={`${process.env.PUBLIC_URL}/#top`}><Button className={classes.button} onClick={handleClick} >
        <Typography variant="h6" component="span">
          Get started
        </Typography>
      </Button>
      </Link>
      <Typography variant="subtitle1" className={classes.link}>
        Find a study partner or group today and start improving your score.
      </Typography>
    </Container>
  );
}

ProductSmokingHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductSmokingHero);
