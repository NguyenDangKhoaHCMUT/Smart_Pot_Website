const hhmmToSeconds = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60;
}

export default hhmmToSeconds;