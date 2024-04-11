export const formatDate = (date: Date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: "long",
        month: 'long',
        day: 'numeric',
    });

    const day = date.getDate();
    let suffix: string;
    switch (day % 10) {
        case 1:
            suffix = day === 11 ? 'th' : 'st';
            break;
        case 2:
            suffix = day === 12 ? 'th' : 'nd';
            break;
        case 3:
            suffix = day === 13 ? 'th' : 'rd';
            break;
        default:
            suffix = 'th';
            break;
    };

    return `${formattedDate}${suffix}`;
};

export const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const getMinutes = (timeStr: string) => {
    return Number(timeStr.split(':')[1].slice(0, 2));
};
