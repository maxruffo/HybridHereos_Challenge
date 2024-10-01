// Function to format a date string into "dd.mm.yyyy" format
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-based) and pad with leading zero
    const year = date.getFullYear(); // Get full year
    return `${day}.${month}.${year}`; // Return formatted date string
};

// Function to determine if a product is new (posted within the last 7 days)
export const isNewProduct = (dateString: string): boolean => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime()); // Calculate the difference in milliseconds
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return diffDays <= 7; // Return true if the difference is 7 days or less
};