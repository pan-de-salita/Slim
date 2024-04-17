export interface ChatMessages {
    date: string,
    messages: { currentSender: string, time: string, text: string, isShowDetails: boolean, lastIsShowDetails: string }[],
};
