import { Controller, FieldValues, useForm } from "react-hook-form";
import Select from 'react-select';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';
import slimBot from '../../assets/slim-bot.png';
import { Channel } from '../../types/Channel';
import { handleGetChannelDetails } from '../../adapters/api/apiCallGet';
import { User } from '../../types/userType';
import { getFromLocalStorage } from "../../utils/localStorageFunctions";
import customDropdownStylesForChatHeader from "../../utils/customDropdownStylesForChatHeader";
import { IoMdAdd } from "react-icons/io";
import { getRequestHeaders } from "../../utils/requestHeadersFunctions";
import { BASE_API_URL } from "../../constants/apiConstants";

interface ChatHeaderProps {
    recipientType: string,
    recipientName: string | Channel,
    availableUsers: User[],
};

interface ChannelMemberDetails {
    channel_id: number,
    created_at: string,
    id: number,
    updated_at: string,
    user_id: number,
};

const ChatHeader = ({ recipientType, recipientName, availableUsers }: ChatHeaderProps) => {
    const [channelMembers, setChannelMembers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [channelFormContent, setChannelFormContent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessfulAdd, setIsSuccessfulAdd] = useState(false);
    const [debouncedValue] = useDebounce(filteredUsers, 300);
    const {
        control,
        handleSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const getChannelDetails = async () => {
        setIsLoading(true);
        if (recipientType === 'Channel' && typeof recipientName !== 'string') {
            try {
                const channelDetails = await handleGetChannelDetails(recipientName.id);
                const memberIds = channelDetails.data.channel_members.map((member: ChannelMemberDetails) => member.user_id);
                const members = availableUsers.reduce((acc: User[], cur: User): User[] => {
                    if (memberIds.includes(cur.id)) {
                        return [...acc, cur];
                    }
                    return acc;
                }, []);
                setChannelMembers(members);
                setIsSuccessfulAdd(false);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const addNewMemberToChannel = (data: FieldValues) => {
        const newMember = data.addChannelMembers.value;

        const addMemberToChannel = async () => {
            if (typeof recipientName === 'string') {
                return
            } else {
                try {
                    const response = await fetch(`${BASE_API_URL}/channel/add_member`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            ...getRequestHeaders(),
                        },
                        body: JSON.stringify({
                            id: recipientName.id,
                            member_id: newMember
                        }),
                    });

                    const data = await response.json();
                    setIsSuccessfulAdd(true);
                    return data;
                } catch (error) {
                    if (error instanceof Error) {
                        console.log(error);
                    }
                }
            }
        };

        addMemberToChannel();
        setChannelFormContent(null);
        reset({
            addChannelMembers: null,
        });
    };

    useEffect(() => {
        getChannelDetails();
    }, [recipientName, recipientType, isSuccessfulAdd])

    return (
        <>
            <div className='pl-[1.25rem] pr-[0.75rem] py-[0.5rem] min-h-[3.063rem] flex justify-between'>
                <div className='flex items-center gap-2'>
                    {
                        recipientName === 'Slimbot'
                            ? <img className='bg-purple-900 rounded-md w-[1.5rem] h-[1.5rem]' src={slimBot} alt='SlimBot profile picture' />
                            : <div className={`flex justify-center items-center ${recipientType === 'User' ? 'bg-green-800' : 'bg-blue-800'} rounded-md w-[1.5rem] h-[1.5rem]`}>
                                <span className='w-auto h-auto text-md leading-tight font-bold text-white text-center'>
                                    {
                                        typeof recipientName === 'string'
                                            ? recipientType === 'User'
                                                ? recipientName[0].toUpperCase()
                                                : null
                                            : recipientName.name[0].toUpperCase()
                                    }
                                </span>
                            </div>
                    }
                    <span className='text-xl font-black text-[#1d1c1d]'>
                        {
                            typeof recipientName === 'string'
                                ? recipientName === 'Slimbot' || recipientType === 'User'
                                    ? recipientName
                                    : null
                                : recipientName.name
                        }
                    </span>
                </div>
            </div >
            {
                recipientType === 'Channel'
                    ?
                    <div className='pl-[1.25rem] pr-[0.75rem] pb-[1rem]'>
                        <div className='pb-[0.5rem] h-auto flex items-center flex-wrap gap-2'>
                            <span className='font-bold'>Members:</span>
                            {
                                isLoading
                                    ? <span className='font-bold'>Loading... </span>
                                    : channelMembers.map((member: User) => {
                                        return <span key={member.uid + new Date()} className='bg-gray-200 px-1 rounded-md'>{member.uid}</span>
                                    })
                            }
                        </div>
                        <form onSubmit={handleSubmit(addNewMemberToChannel)} className='flex items-center gap-2'>
                            <div className='w-full'>
                                <Controller
                                    control={control}
                                    name='addChannelMembers'
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder='Add members'
                                            onInputChange={(value) => {
                                                value ? setFilteredUsers(availableUsers.filter((user) => user.uid.includes(value) && user.uid !== getFromLocalStorage('user'))) : setFilteredUsers([]);
                                            }}
                                            options={debouncedValue.map(({ id, uid }: { uid: string, id: number }) => {
                                                return { label: uid, value: id }
                                            })}
                                            styles={customDropdownStylesForChatHeader}
                                            onChange={(selectedOption) => {
                                                setChannelFormContent(selectedOption);
                                                field.onChange(selectedOption);
                                            }}
                                        />
                                    )}
                                />
                            </ div>
                            <button
                                type='submit'
                                className={`w-[1.875rem] h-[1.875rem] flex justify-center items-center rounded-md ${!channelFormContent ? '' : 'bg-[#007b5b]'} outline-none`}
                                disabled={!channelFormContent ? true : false}
                            >
                                <IoMdAdd color={!channelFormContent ? '#69707C' : 'white'} />
                            </button>
                        </form>

                    </div>
                    : null
            }
            <div className='w-full border-b-[0.063rem] border-solid border-[#e3e3e2] b-t-0 b-l-0 b-r-0'></div>
        </>
    );
};

export default ChatHeader;
