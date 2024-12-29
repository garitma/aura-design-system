
export const formatDate = (dateString: any) => {
     // Get the current date
     const date = new Date(dateString);

     // Options for formatting the date in Spanish
     const options: Intl.DateTimeFormatOptions = {
       weekday: "long", // 'lunes'
       month: "long", // 'enero'
       day: "numeric", // '3'
     };

     // Format the date in Spanish
     const formattedDate = date.toLocaleDateString("es-ES", options);

     return formattedDate
}