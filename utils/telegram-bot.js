const token = '5363253480:AAGy4WQ2zBbQlGN-3y67EnkavIXR7bhG7Qs';
const chatId = '257271396';

export const sendNotification = (message) => {
    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`);
}
