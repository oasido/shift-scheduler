import { VscGithub } from 'react-icons/vsc';
import { createStyles, Container, Group, ActionIcon, Text } from '@mantine/core';
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
        <p className="font-mono text-sm text-gray-100 coolfont">Made by oasido</p>

        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <VscGithub className="text-3xl" />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};

export default Footer;
