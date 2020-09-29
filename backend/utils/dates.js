const monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
]

const getMonthName = (month) => {
    return monthNames[month];
}

module.exports = {
    getMonthName
}