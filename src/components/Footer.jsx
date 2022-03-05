import React from 'react';
// import { GithubIcon } from '@heroicons/react';

const Footer = () => {
  return (
    <div className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 py-12">
      <div className="flex flex-col items-center justify-center">
        <div>
          <p className="font-inter text-2xl font-medium">shift-scheduler</p>
        </div>

        <div className="flex items-center gap-x-8 mt-6">
          <div className="cursor-pointer">
            <a
              target={'_blank'}
              rel="noopener noreferrer"
              href="https://github.com/oasido/shift-scheduler"
            >
              <img src="https://i.imgur.com/7yn9sxf.png" alt="GitHub project link" />
            </a>
          </div>
        </div>
        <div className="flex items-center mt-6">
          <p className="text-base leading-4 text-gray-800">
            2022 <span className="font-semibold">oasido</span>
          </p>
          <div className="border-l border-gray-800 pl-2 ml-2">
            <p className="text-base leading-4 text-gray-800">All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
