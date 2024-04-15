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
}

const ChatHeader = ({ recipientType, recipientName, availableUsers }: ChatHeaderProps) => {
    const [channelMembers, setChannelMembers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [channelFormContent, setChannelFormContent] = useState<ChannelFormContent>({ channelName: '', channelMembers: [] });
    const [isNewMemberAdded, setIsNewMemberAdded] = useState(false);
    const [debouncedValue] = useDebounce(filteredUsers, 300);
    const {
        control,
        register,
        handleSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const getChannelDetails = async () => {
        if (recipientType === 'Channel') {
            const channelDetails = await handleGetChannelDetails(recipientName.id)
            const memberIds = channelDetails.data.channel_members.map((member) => member.user_id);
            const test = availableUsers.reduce((acc, cur) => {
                if (memberIds.includes(cur.id)) {
                    return [...acc, cur];
                }

                return acc;
            }, []);
            console.log(test)
            setChannelMembers(test);
        }
    }

    const addNewMemberToChannel = (data: FieldValues) => {
        const newMember = data.addChannelMembers.value;

        const addMemberToChannel = async () => {
            try {
                const response = await fetch(`${BASE_API_URL}/channel/add_member`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...getRequestHeaders(),
                    },
                    body: JSON.stringify({ id: recipientName.id, member_id: newMember }),
                });

                const data = await response.json();
                setChannelMembers(data.data.channel_members);
            } catch (error) {
                if (error instanceof Error) {
                }
            }
        };

        addMemberToChannel();
        reset({
            addChannelMembers: null,
        });
    };


    useEffect(() => {
        getChannelDetails();
    }, [recipientName, recipientType, channelMembers])

    return (
        <>
            <div className='pl-[20px] pr-[12px] py-[0.5rem] min-h-[49px] flex justify-between'>
                <div className='flex items-center gap-2'>
                    {
                        recipientName === 'Slimbot'
                            ? <img className='bg-purple-900 rounded-md w-[24px] h-[24px]' src={slimBot} alt='SlimBot profile picture' />
                            : <div className={`flex justify-center items-center ${recipientType === 'User' ? 'bg-green-800' : 'bg-blue-800'} rounded-md w-[24px] h-[24px]`}>
                                <span className='w-auto h-auto text-md leading-tight font-bold text-white text-center'>{recipientType === 'User' ? recipientName[0].toUpperCase() : recipientName.name[0].toUpperCase()}</span>
                            </div>
                    }
                    <span className='text-xl font-black text-[#1d1c1d]'>{recipientName === 'Slimbot' || recipientType === 'User' ? recipientName : recipientName.name}</span>
                </div>
            </div >
            {
                recipientType === 'Channel'
                    ?
                    <div className='pl-[20px] pr-[12px] pb-[1rem]'>
                        <div className='pb-[0.5rem] h-auto flex items-center flex-wrap gap-2'>
                            <span>Members:</span>
                            {channelMembers.map((member) => {
                                return <span className='bg-gray-200 px-1 rounded-md'>{member.uid}</span>
                            })}
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
                                                console.log(availableUsers)
                                                value ? setFilteredUsers(availableUsers.filter((user) => user.uid.includes(value) && user.uid !== getFromLocalStorage('user'))) : setFilteredUsers([]);
                                            }}
                                            options={debouncedValue.map(({ id, uid }: { uid: string, id: number }) => {
                                                return { label: uid, value: id }
                                            })}
                                            styles={customDropdownStylesForChatHeader}
                                            onChange={(selectedOption) => {
                                                setChannelFormContent({ newMember: selectedOption });
                                                field.onChange(selectedOption);
                                            }}
                                        />
                                    )}
                                />
                            </ div>
                            <button type='submit' className='w-[20px] h-full'>
                                <IoMdAdd />
                            </button>
                        </form>

                    </div>
                    : undefined
            }
            <div className='w-full border-b-[1px] border-solid border-[#e3e3e2] b-t-0 b-l-0 b-r-0'></div>
        </>
    );
};

export default ChatHeader;
