

export const formatDate = (date) => {
    if (!date) return "N/A";
    const newDate = new Date(date);

    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        hourCycle: 'h12',
        timeZoneName: undefined
    };

    return newDate.toLocaleString('en-GB', options);
}




export const capitalizeFirstLetter = str => 
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";