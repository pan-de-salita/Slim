export interface CreateChannelRequestBody {
    name: string,
    user_ids: number[],
};

export interface SendMessageRequestBody {
    receiver_id: number,
    receiver_class: string,
    body: string,
};

export interface AddMemberToChannelRequestBody {
    id: number,
    member_id: number,
};

export interface RetrieveMessagesParams {
    id: number,
    class: 'User' | 'Channel',
};
