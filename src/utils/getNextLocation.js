const getNextLocation = (location, dir) => {
    const alphabet = ["Man", "Esplanade", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
    const clock = [
        "12:00",
        "12:30",
        "1:00",
        "1:30",
        "2:00",
        "2:30",
        "3:00",
        "3:30",
        "4:00",
        "4:30",
        "5:00",
        "5:30",
        "6:00",
        "6:30",
        "7:00",
        "7:30",
        "8:00",
        "8:30",
        "9:00",
        "9:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
    ];
    const split = location.split("_");
    const letter = split[0];
    if (split.length === 2) {
        const time = split[1];
        const letterInd = alphabet.indexOf(letter);
        const clockInd = clock.indexOf(time);

        if (dir === "towards") {
            if (letterInd === 1) {
                return `${alphabet[letterInd - 1]}` // Inner-most circle "Man" is just a point with no associated time
            }
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
    }
    else {
        if (dir === "towards") {
            return `Esplanade_12:00`;
        }
        if (dir === "away") {
            return `Esplanade_6:00`;
        }
        if (dir === "clockwise") {
            return `Esplanade_9:00`;
        }
        if (dir === "counter_clockwise") {
            return `Esplanade_3:00`;
        }
    }

    return location;
};

export default getNextLocation;
