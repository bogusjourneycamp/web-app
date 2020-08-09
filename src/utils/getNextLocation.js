const getNextLocation = (location, dir) => {
    const alphabet = ["Man", "Esplanade", "A", "B", "C", "D", "E", "F", "G"];
    const clock = [
        "1:00",
        "1:15",
        "1:30",
        "1:45",
        "2:00",
        "2:15",
        "2:30",
        "2:45",
        "3:00",
        "3:15",
        "3:30",
        "3:45",
        "4:00",
        "4:15",
        "4:30",
        "4:45",
        "5:00",
        "5:15",
        "5:30",
        "5:45",
        "6:00",
        "6:15",
        "6:30",
        "6:45",
        "7:00",
        "7:15",
        "7:30",
        "7:45",
        "8:00",
        "8:15",
        "8:30",
        "8:45",
        "9:00",
        "9:15",
        "9:30",
        "9:45",
        "10:00",
        "10:15",
        "10:30",
        "10:45",
        "11:00",
        "11:15",
        "11:30",
        "11:45",
        "12:00",
        "12:15",
        "12:30",
        "12:45",
    ];
    const split = location.split("_");
    const letter = split[0];
    const time = split[1];
    const letterInd = alphabet.indexOf(letter);
    const clockInd = clock.indexOf(time);

    if (dir === "towards") {
        if (letterInd === 0) {
            return location;
        }
        return `${alphabet[letterInd - 1]}_${time}`;
    }
    if (dir === "away") {
        if (letterInd === alphabet.length - 1) {
            return location;
        }
        return `${alphabet[letterInd + 1]}_${time}`;
    }
    if (dir === "clockwise") {
        if (clockInd === clock.length - 1) {
            return `${letter}_${clock[0]}`;
        }
        return `${letter}_${clock[clockInd + 1]}`;
    }
    if (dir === "counter_clockwise") {
        if (clockInd === 0) {
            return `${letter}_${clock[clock.length - 1]}`;
        }
        return `${letter}_${clock[clockInd - 1]}`;
    }

    return null;
};

export default getNextLocation;
