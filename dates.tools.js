function calculateHours(dateString) {
    const createdDate = new Date(dateString)

    const currentDate = new Date()

    const timeDifference = currentDate - createdDate

    const hoursAgo = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
    const minutesAgo = Math.floor((timeDifference / (1000 * 60)) % 60)

    if (hoursAgo === 0) {
        return `Inside for ${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'}`
    } else {
        return `Inside for ${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'}`
    }
}

function calculateYears(dateString) {
    const createdDate = new Date(dateString)

    const currentDate = new Date()

    const timeDifference = currentDate - createdDate

    const yearsAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25))

    if (yearsAgo > 0) {
        return `Created ${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`
    } else {
        const monthsAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30.44))
        return `Created ${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`
    }
}

module.exports = { calculateHours, calculateYears }