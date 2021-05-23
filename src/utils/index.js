export const baseUrl = 'http://localhost:1337';

export const extractProfileImg = (user) => {
    try {
        const imgUrl = user.profileImg.formats.thumbnail.url;

        return `${baseUrl}${imgUrl}`;
    } catch (err) {
        return 'data:image/jpeg;base64,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';
    }
}
