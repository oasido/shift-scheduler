import { Fragment } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useUserContext } from '../useUserContext';
import { RewindIcon } from '@heroicons/react/outline';
import logoLg from './../../logos/logo__full-white.svg';
import logoSm from './../../logos/logo__small.svg';

let navigation = [
  { name: 'לוח בקרה', href: '/admin', current: false },
  { name: 'בקשות', href: '/admin/requests', current: false },
  { name: 'צור סידור', href: '/admin/schedule', current: false },
  { name: 'סידורים', href: '/admin/schedule-history', current: false },
  { name: 'משתמשים', href: '/admin/users', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const { user } = useUserContext();

  const { pathname } = useLocation();

  navigation.forEach((object) => {
    if (object.href === pathname) {
      object.current = true;
    } else {
      object.current = false;
    }
  });

  let navigate = useNavigate();
  const handleLogout = async () => {
    await axios.post('/logout');
    navigate('/login');
  };

  return (
    <Disclosure as="nav" className="bg-gray-900">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <img className="block w-auto h-10 lg:hidden" src={logoSm} alt="shift-scheduler" />
                  <img className="hidden w-auto h-10 lg:block" src={logoLg} alt="shift-scheduler" />
                </div>
                <div className="hidden sm:block sm:m-3">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-2 py-1 rounded-md text-lg font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {user.admin && (
                  <Link to="/">
                    <button
                      type="button"
                      className="flex items-center flex-auto px-1 py-1 font-medium text-gray-100 bg-gray-800 rounded hover:bg-red-700"
                    >
                      צד משתמש
                      <RewindIcon className="w-6 ml-1" />
                    </button>
                  </Link>
                )}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white hover:bg-gray-700">
                      <span className="sr-only">Open user menu</span>
                      <p className="px-3 py-1 text-lg text-white">{user.username}</p>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      dir="rtl"
                      className="absolute z-10 w-40 py-1 mt-2 font-medium origin-top-right bg-white rounded-md shadow-lg right-4 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="#"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-base text-gray-700'
                            )}
                          >
                            פרופיל
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="#"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-base text-gray-700'
                            )}
                          >
                            הגדרות
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="#"
                            onClick={() => handleLogout()}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-base text-gray-700'
                            )}
                          >
                            התנתק
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link to={item.href} key={item.name}>
                  <Disclosure.Button
                    key={item.name}
                    as="span"
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-lg font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
