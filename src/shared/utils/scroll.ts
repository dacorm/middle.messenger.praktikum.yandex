export const scrollDown = () => {
    setTimeout(() => {
        const collection = document.getElementsByClassName('msg');
        if (collection.length) {
            collection[0].scrollTo({
                top: collection[0].scrollHeight,
                behavior: 'smooth',
            });
        }
    }, 200);
};