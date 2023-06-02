export function GetTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const timeString = date.toLocaleTimeString("it-IT");

    return timeString;
}

export function GetDifferenceArray(array1, array2) {
    const set1 = new Set(array1);
    const set2 = new Set(array2);
    
    // Get the difference between set1 and set2
    const differenceSet = new Set([...set1].filter(item => !set2.has(item)));
    
    // Convert the set to an array
    const differenceArray = Array.from(differenceSet);
    
    return differenceArray;
}
