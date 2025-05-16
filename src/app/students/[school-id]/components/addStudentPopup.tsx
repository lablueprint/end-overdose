'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { createStudentAndAddToSchool } from '@/app/api/schools/actions';
import { NewSchoolAdmin } from '@/types/newSchoolAdmin';
import { create } from 'axios';

interface AddStudentPopupProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    user: NewSchoolAdmin | null;
}

export default function AddStudentPopup({
    isOpen,
    setIsOpen,
    user,
}: AddStudentPopupProps) {
    const [inputValue, setInputValue] = useState('');

    function closeModal() {
        setIsOpen(false);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log('Student IDs:', inputValue);
        setInputValue('');
        if (user?.school_id) {
            createStudentAndAddToSchool(inputValue, user.school_id);
        } else {
            console.error('School ID is undefined');
        }
        closeModal();
    }

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                {/* Overlay */}
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
                        {/* Panel animation */}
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all relative">
                                <Dialog.Title className="text-xl font-bold text-gray-900 mb-4">
                                    ADD NEW STUDENTS
                                </Dialog.Title>

                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                >
                                    X
                                </button>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            STUDENT IDS
                                        </label>
                                        <p className="text-xs text-gray-500 mb-2">
                                            Put your student’s native School ID
                                        </p>
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) =>
                                                setInputValue(e.target.value)
                                            }
                                            placeholder="Enter Student Ids"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="bg-black text-white px-6 py-2 text-sm font-semibold rounded hover:bg-gray-800 transition-colors"
                                        >
                                            ADD
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
