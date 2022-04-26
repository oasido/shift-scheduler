import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Msg from '../../../general/Msg';
import Btn from './Button';
import { Button } from '@mantine/core';
import axios from 'axios';
import { useUsersContext } from '../../useUsersContext';
import { FaUserPlus } from 'react-icons/fa';

export default function CreateUserModal() {
  const [modalData, setModalData] = useState({
    username: '',
    password: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [requestStatus, setReqStatus] = useState(null);

  const openModal = async () => {
    setIsOpen(true);
    genPassword();
  };

  const closeModal = async () => {
    setIsOpen(false);
    setReqStatus(null);
    refreshAllUsers();
    setModalData({
      username: '',
      password: '',
    });
  };

  const { refreshAllUsers } = useUsersContext();

  const createUser = async () => {
    console.log(modalData.username);
    if (modalData.username === '' || modalData.password === '') {
      setReqStatus({
        bold: 'שגיאה',
        msg: `שם משתמש או סיסמא ריקים`,
        OK: false,
      });
    } else if (modalData.username.length > 0 && modalData.password.length > 0) {
      const response = await axios.post('/register', {
        username: modalData.username,
        password: modalData.password,
      });

      if (response.data === 'Registered') {
        setReqStatus({
          bold: 'אוקיי!',
          msg: `משתמש נוצר בהצלחה`,
          OK: true,
        });
        await refreshAllUsers();
      } else if (response.data === 'UserAlreadyExists') {
        setReqStatus({
          bold: 'שגיאה',
          msg: 'שם המשתמש כבר קיים במערכת',
          OK: false,
        });
      } else if (response.data === 'UsernameIsEmpty') {
        setReqStatus({
          bold: 'שגיאה',
          msg: 'שם המשתמש לא יכול להיות ריק',
          OK: false,
        });
      } else {
        setReqStatus({
          bold: 'שגיאה',
          msg: 'נסה שוב מאוחר יותר',
          OK: false,
        });
      }
      refreshAllUsers();
    }
  };

  const genPassword = () => {
    const password = Array(4)
      .fill('0123456789')
      .map((x) => {
        return x[Math.floor(Math.random() * x.length)];
      })
      .join('');
    setModalData({ ...modalData, password: password });
  };

  return (
    <>
      <Button
        dir="ltr"
        variant="green"
        className="bg-green-500 w-min"
        rightIcon={<FaUserPlus size={14} />}
        onClick={openModal}
      >
        צור משתמש
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-40"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                dir="rtl"
                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-right align-middle transition-all transform bg-white rounded-lg shadow-xl"
              >
                <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900">
                  יצירת משתמש
                </Dialog.Title>
                <div dir="rtl" className="mt-2">
                  <div className="my-5 modal__section">
                    <p className="font-medium">שם משתמש</p>
                    <div>
                      <input
                        type="text"
                        required
                        className="border-2"
                        placeholder="רצוי בעברית"
                        value={modalData?.username}
                        onChange={(e) => {
                          const text = e.target.value;
                          if (text.length <= 10) {
                            setModalData({ ...modalData, username: text });
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="my-5 modal__section">
                    <p className="font-medium">סיסמא</p>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="בחר סיסמא"
                        className="border-2"
                        value={modalData?.password}
                        onChange={(e) => {
                          setModalData({
                            ...modalData,
                            password: e.target.value ? e.target.value : '',
                          });
                        }}
                      />
                      <button
                        className="p-1 mx-2 bg-gray-300 rounded-xl hover:bg-gray-400"
                        onClick={(e) => {
                          genPassword(e);
                        }}
                      >
                        סיסמא אקראית
                      </button>
                    </div>
                    <div className="mt-5">
                      <p className="text-sm text-gray-500">
                        * לעדכון סוג משתמש (מנהל או משתמש רגיל), יש לבקש באופן פרטני.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Btn name="סגור" color="blue" onClick={closeModal} />
                  <Btn name="צור משתמש" color="green" onClick={createUser} />
                  {requestStatus && (
                    <Msg
                      bolded={requestStatus.bold}
                      msg={requestStatus.msg}
                      OK={requestStatus.OK}
                    />
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
