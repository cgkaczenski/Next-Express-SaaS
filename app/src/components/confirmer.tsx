"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import React from "react";

type OpenConfirmDialog = ({
  title,
  message,
  onAnswer,
}: {
  title: string;
  message: string;
  onAnswer: (answer: boolean) => void;
}) => void;

export let openConfirmDialogExternal: OpenConfirmDialog;

type State = {
  open: boolean;
  title: string;
  message: string;
  onAnswer: (answer: boolean) => void;
};

export class Confirmer extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      open: false,
      title: "Are you sure?",
      message: "",
      onAnswer: (_answer: boolean) => {},
    };

    openConfirmDialogExternal = this.openConfirmDialog;
  }

  public handleClose = () => {
    this.setState({ open: false });
    this.state.onAnswer(false);
  };

  public handleYes = () => {
    this.setState({ open: false });
    this.state.onAnswer(true);
  };

  public openConfirmDialog = ({
    title,
    message,
    onAnswer,
  }: {
    title: string;
    message: string;
    onAnswer: (answer: boolean) => void;
  }) => {
    this.setState({ open: true, title, message, onAnswer });
  };

  public render() {
    return (
      <>
        <Transition appear show={this.state.open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={this.handleClose}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {this.state.title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {this.state.message}
                      </p>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className=" text-black px-4"
                        onClick={this.handleClose}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={this.handleYes}
                      >
                        Ok
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }
}
