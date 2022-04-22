import { VscGithub } from 'react-icons/vsc';
import { createStyles, Container, Group, ActionIcon } from '@mantine/core';
import logo__small from './../logos/logo__small.svg';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 0,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

const Footer = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.footer + ' bg-gray-900'}>
      <Container className={classes.inner}>
        <div className="flex items-center">
          <img src={logo__small} className="w-10" alt="shift scheduler's logo at the footer" />
          {/* <p className="font-mono text-2xl text-gray-100 coolfont">shift scheduler</p> */}
        </div>
        <div className="font-mono text-sm text-center text-gray-100 coolfont">
          <p>Made by oasido</p>
          <p className="text-xs text-gray-500">1.0.0</p>
        </div>

        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <a
              target={'_blank'}
              rel="noopener noreferrer"
              href="https://github.com/oasido/shift-scheduler"
            >
              <VscGithub className="text-3xl" />
            </a>
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};

export default Footer;
