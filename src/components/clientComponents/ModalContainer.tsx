import { Controller, FieldValues, useForm } from "react-hook-form";
import Select from 'react-select';
import { useDebounce } from 'use-debounce';
import { IoMdClose } from "react-icons/io";
import { useContext, useEffect, useState } from 'react';
import { SearchUsersContext } from '../../contexts/SearchUsersContext';
import { User } from "../../types/userType";
import customDropdownStyles from "../../utils/customDropdownStyles";
import { useCreateChannel } from "../../hooks/apiHooks";
import { CreateChannelRequestBody } from "../../types/apiRequestBodyTypes";
import { toastError, toastSuccess } from "../../utils/toasts";
import { getFromLocalStorage } from "../../utils/localStorageFunctions";

interface ChannelFormContent {
    channelName: string,
    channelMembers: { label: string, value: string }[],
};

const ModalContainer = (
    { isCreateChannel, toggleCloseCreateChannelModal, }: { isCreateChannel: boolean, toggleCloseCreateChannelModal: () => void, }
) => {
    const { users, updateChannels } = useContext(SearchUsersContext);
    const [createChannelRequest, setCreateChannelRequest] = useState<CreateChannelRequestBody | null>(null);
    const { data: createChannelData } = useCreateChannel(createChannelRequest);
    const [isCreateChannelAttempt, setIsCreateChannelAttempt] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [channelFormContent, setChannelFormContent] = useState<ChannelFormContent>({ channelName: '', channelMembers: [] });
    const [debouncedValue] = useDebounce(filteredUsers, 300);
    const {
        control,
        register,
        handleSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const createChannel = (data: FieldValues) => {
        const user_ids = data.channelMembers.map((uData: { label: string, value: number }) => uData.value);
        setCreateChannelRequest({ name: data.channelName, user_ids: user_ids });
        setIsCreateChannelAttempt(true);
        reset({
            channelName: null,
            channelMembers: null,
        });
        setChannelFormContent({ channelName: '', channelMembers: [] });
    };

    useEffect(() => {
        if (isCreateChannelAttempt) {
            if (createChannelData && createChannelData.errors) {
                toastError(`Oops! ${createChannelData.errors[0]}`)
            }

            if (createChannelData && createChannelData.data) {
                toastSuccess(`You created the channel "${createChannelData.data.name}"!`);
            }
        }

        updateChannels();
    }, [createChannelData, isCreateChannelAttempt]);

    return (
        <>
            {isCreateChannel
                ? <div className='absolute w-screen h-screen bg-[#0009] left-0 top-0 flex justify-center items-center'>
                    <div className='w-[32.5rem] h-auto flex flex-col items-center rounded-lg bg-white shadow-2xl'>
                        <div className='flex justify-between items-center w-full h-[4rem] px-[1.5rem] pt-[2rem] pb-[0.688rem] '>
                            <h1 className='text-2xl font-black'>Create a channel</h1>
                            <button
                                onClick={toggleCloseCreateChannelModal}
                                className='w-[2.25rem] h-[2.25rem] flex justify-center items-center rounded-md hover:bg-gray-200'>
                                <IoMdClose size={24} color='#606060' />
                            </button>
                        </div>
                        <div className='px-[1.5rem] py-[0.688rem]'>
                            <p className='text-[#606060]'>Channels are where your team communicates. They're best when organized around a topic — <span className='font-bold'>FrontendDev</span>, for example.</p>
                        </div>
                        <form
                            onSubmit={handleSubmit(createChannel)}
                            className='px-[1.5rem] py-[0.688rem] w-full flex flex-col items-center gap-5'
                        >
                            <input
                                {...register('channelName')}
                                className='w-full h-[2.75rem] border-[0.063rem] border-solid border-[#bababa] p-[0.75rem] placeholder-[#1d1c1d90] text-lg rounded-md'
                                type='text'
                                placeholder='Name your channel'
                                required={true}
                                autoComplete='off'
                                onChange={(e) => setChannelFormContent({ ...channelFormContent, channelName: e.currentTarget.value })}
                            />
                            <div className='w-full'>
                                <Controller
                                    control={control}
                                    name='channelMembers'
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            isMulti
                                            placeholder='Add members'
                                            onInputChange={(value) => {
                                                value ? setFilteredUsers(users.data.filter((user) => user.uid.includes(value) && user.uid !== getFromLocalStorage('user'))) : setFilteredUsers([]);
                                            }}
                                            options={debouncedValue.map(({ id, uid }: { uid: string, id: number }) => {
                                                return { label: uid, value: id }
                                            })}
                                            required={true}
                                            styles={customDropdownStyles}
                                            onChange={(selectedOptions) => {
                                                setChannelFormContent({ ...channelFormContent, channelMembers: selectedOptions.map((option) => option) });
                                                field.onChange(selectedOptions);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            <div className='w-full pt-[0.938rem] pb-[1.25rem] flex justify-end items-center gap-3 font-bold'>
                                <button
                                    onClick={toggleCloseCreateChannelModal}
                                    className='w-[5rem] h-[2.25rem] border-[0.063rem] border-solid border-gray-300 rounded-md hover:bg-gray-200'>Cancel</button>
                                <button
                                    type='submit'
                                    className={`w-[5rem] h-[2.25rem] border-[0.063rem] rounded-md ${channelFormContent.channelName && channelFormContent.channelMembers.length >= 1 ? 'bg-[#007b5b] text-white' : 'text-gray-500 bg-gray-200'}`}
                                    disabled={channelFormContent.channelName && channelFormContent.channelMembers.length >= 1 ? false : true}
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div >
                </div >
                : <div className='hidden'></div>
            }
        </>
    );
};

export default ModalContainer;
